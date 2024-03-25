import { z } from 'zod'
import { GameAttributes } from '../../models/Game'

export const serieAttributes = z.object({
  serieId: z.number().optional(),
  serieGroupCode: z.string(),
  serieCategory: z.string(),
  serieName: z.string(),
  serieStructure: z.array(z.number()).nullable().optional(),
  seasonId: z.number(),
  bonusPoints: z.string().nullable().optional(),
  comment: z.string().nullable().optional(),
  women: z.boolean().optional(),
})

type SerieAttributes = z.infer<typeof serieAttributes>

type TeamArray = {
  teamId: number
  casualName: string
}

type DateGames = {
  date: string
  games: GameAttributes[]
}

type SortedGroupsAndDate = {
  group: string
  dates: DateGames[]
}

type SortedDates = {
  [key: string]: GameAttributes[]
}

type SortedGameGroups = {
  [key: string]: GameAttributes[]
}

export const gameSortFunction = (
  gamesArray: GameAttributes[],
  played = false
) => {
  const sortGroups = gamesArray.reduce((groups, game) => {
    if (!groups[game.group]) {
      groups[game.group] = []
    }
    groups[game.group].push(game)
    return groups
  }, {} as SortedGameGroups)

  const sortedGames = Object.keys(sortGroups).map((group) => {
    return {
      group,
      games: sortGroups[group],
    }
  })

  const sortGroupsAndDates = sortedGames.map((groupObject) => {
    const sortDates = groupObject.games.reduce((dates, game) => {
      if (!dates[game.date]) {
        dates[game.date] = []
      }
      dates[game.date].push(game)
      return dates
    }, {} as SortedDates)

    const sortedGameDates = Object.keys(sortDates).map((date) => {
      return {
        date,
        games: sortDates[date],
      }
    })
    return {
      group: groupObject['group'],
      dates: played ? sortedGameDates.reverse() : sortedGameDates,
    }
  })

  return sortGroupsAndDates
}

const mixedAnimationData = (
  gameArray: SortedGroupsAndDate[],
  teamArray: TeamArray[],
  seriesArray: SerieAttributes[]
) => {
  const southTeams: number[] = []
  const northTeams: number[] = []

  const southObject = gameArray.find((group) => group.group === 'AllsvSyd')
  if (!southObject) {
    throw new Error('Wrong game array mixedAnimationData')
  } else {
    southObject.dates.forEach((date) =>
      date.games.forEach((game) => {
        if (!game.homeTeamId || !game.awayTeamId) return

        southTeams.push(game.homeTeamId)
        southTeams.push(game.awayTeamId)
      })
    )
  }

  const northObject = gameArray.find((group) => group.group === 'AllsvNorr')
  if (!northObject) {
    throw new Error('Wrong game array mixedAnimationData')
  } else {
    northObject.dates.forEach((date) =>
      date.games.forEach((game) => {
        if (!game.homeTeamId || !game.awayTeamId) return

        northTeams.push(game.homeTeamId)
        northTeams.push(game.awayTeamId)
      })
    )
  }

  const mixObject = gameArray.find((group) => group.group === 'mix')
  if (!mixObject) {
    throw new Error('Wrong game array mixedAnimationData')
  } else {
    mixObject.dates.forEach((date) => {
      const southObject = gameArray.find((group) => group.group === 'AllsvSyd')
      const northObject = gameArray.find((group) => group.group === 'AllsvNorr')

      if (southObject && northObject) {
        southObject.dates.push(date)
        northObject.dates.push(date)
      } else {
        throw new Error('Wrong game array mixedAnimationData')
      }
    })
  }

  const initTeamArray = (teamArray: TeamArray[], teams: number[]) => {
    return teamArray
      .filter((team) => teams.includes(team.teamId))
      .map((team) => {
        return {
          teamId: team.teamId,
          casualName: team.casualName,
          table: {
            position: 0,
            games: 0,
            wins: 0,
            draws: 0,
            lost: 0,
            scoredGoals: 0,
            concededGoals: 0,
            points: 0,
          },
        }
      })
  }

  const sortByDate = (data: DateGames[]) =>
    data.sort(({ date: a }, { date: b }) => (a < b ? -1 : a > b ? 1 : 0))

  const gameDateAnimationArray = gameArray
    .filter((group) => group.group !== 'mix')
    .map((group) => {
      const teamsTables = initTeamArray(
        teamArray,
        group.group === 'AllsvSyd' ? southTeams : northTeams
      )

      const serieObject = seriesArray.find(
        (serie) => serie.serieGroupCode == group.group
      )

      let serieName
      if (serieObject && serieObject.serieName) {
        serieName = serieObject.serieName
      } else {
        throw new Error('Missing serieName')
      }

      return {
        group: group.group,
        serieName: serieName,
        tables: sortByDate(group.dates).map((date) => {
          date.games.forEach((game) => {
            if (
              'homeGoal' in game &&
              'awayGoal' in game &&
              game.homeGoal !== null &&
              game.homeGoal !== undefined &&
              game.awayGoal !== null &&
              game.awayGoal !== undefined
            ) {
              const homeTeamIndex = teamsTables.findIndex(
                (team) => team.teamId === game.homeTeamId
              )
              const awayTeamIndex = teamsTables.findIndex(
                (team) => team.teamId === game.awayTeamId
              )
              if (homeTeamIndex !== -1) {
                teamsTables[homeTeamIndex].table.games += 1
                teamsTables[homeTeamIndex].table.scoredGoals += game.homeGoal
                teamsTables[homeTeamIndex].table.concededGoals += game.awayGoal
              }
              if (awayTeamIndex !== -1) {
                teamsTables[awayTeamIndex].table.games += 1
                teamsTables[awayTeamIndex].table.scoredGoals += game.awayGoal
                teamsTables[awayTeamIndex].table.concededGoals += game.homeGoal
              }

              if (game.homeGoal > game.awayGoal) {
                if (homeTeamIndex !== -1) {
                  teamsTables[homeTeamIndex].table.wins += 1
                  teamsTables[homeTeamIndex].table.points += 2
                }
                if (awayTeamIndex !== -1) {
                  teamsTables[awayTeamIndex].table.lost += 1
                }
              } else if (game.homeGoal < game.awayGoal) {
                if (homeTeamIndex !== -1) {
                  teamsTables[homeTeamIndex].table.lost += 1
                }
                if (awayTeamIndex !== -1) {
                  teamsTables[awayTeamIndex].table.points += 2
                  teamsTables[awayTeamIndex].table.wins += 1
                }
              } else if (game.homeGoal === game.awayGoal) {
                if (homeTeamIndex !== -1) {
                  teamsTables[homeTeamIndex].table.draws += 1
                  teamsTables[homeTeamIndex].table.points += 1
                }
                if (awayTeamIndex !== -1) {
                  teamsTables[awayTeamIndex].table.draws += 1
                  teamsTables[awayTeamIndex].table.points += 1
                }
              }
            }
          })
          teamsTables
            .sort((teamA, teamB) => {
              if (teamA.table.points === teamB.table.points) {
                return (
                  teamB.table.scoredGoals -
                  teamB.table.concededGoals -
                  (teamA.table.scoredGoals - teamA.table.concededGoals)
                )
              }
              return teamB.table.points - teamA.table.points
            })
            .forEach(
              (_team, index, array) => (array[index].table.position = index + 1)
            )
          const table = JSON.parse(
            JSON.stringify(teamsTables)
          ) as typeof teamsTables
          return {
            date: date.date,
            table: table.sort((teamA, teamB) => {
              if (teamA.table.points === teamB.table.points) {
                return (
                  teamB.table.scoredGoals -
                  teamB.table.concededGoals -
                  (teamA.table.scoredGoals - teamA.table.concededGoals)
                )
              }
              return teamB.table.points - teamA.table.points
            }),
          }
        }),
      }
    })

  return gameDateAnimationArray
}

export const animationData = (
  gameArray: SortedGroupsAndDate[],
  teamArray: TeamArray[],
  seriesArray: SerieAttributes[],
  seasonId: number
) => {
  if (gameArray.some((group) => group.group === 'mix'))
    return mixedAnimationData(gameArray, teamArray, seriesArray)

  const teamSeriesArray = gameArray.map((group) => {
    const teamArray: number[] = []
    group.dates.forEach((date) =>
      date.games.forEach((game) => {
        if (!game.homeTeamId || !game.awayTeamId) return
        teamArray.push(game.homeTeamId)
        teamArray.push(game.awayTeamId)
      })
    )
    return { group: group.group, teams: teamArray }
  })

  const bonusPointsArray = seriesArray.map((serie) => {
    return {
      group: serie.serieGroupCode,
      bonusPoints:
        typeof serie.bonusPoints === 'string'
          ? (JSON.parse(serie.bonusPoints) as typeof serie.bonusPoints)
          : null,
    }
  })
  const calculateBonusPoints = (group: string, teamId: number) => {
    const bonus = bonusPointsArray.find((points) => points.group === group)
    if (!bonus) return 0
    if (bonus.bonusPoints === null) return 0
    const points = bonus.bonusPoints[Number(teamId)]

    if (points === null) {
      return 0
    } else {
      return Number(points)
    }
  }
  const initTeamArray = (teamArray: TeamArray[], group: string) => {
    if (seasonId > 2023) {
      return teamArray.map((team) => {
        return {
          teamId: team.teamId,
          casualName: team.casualName,
          table: {
            position: 0,
            games: 0,
            wins: 0,
            draws: 0,
            lost: 0,
            scoredGoals: 0,
            concededGoals: 0,
            points: 0 + calculateBonusPoints(group, team.teamId),
          },
        }
      })
    }
    return teamArray
      .filter((team) => {
        const teamSeriesObject = teamSeriesArray.find(
          (serie) => serie.group === group
        )
        if (teamSeriesObject && teamSeriesObject.teams.includes(team.teamId))
          return true
        return false
      })
      .map((team) => {
        return {
          teamId: team.teamId,
          casualName: team.casualName,
          table: {
            position: 0,
            games: 0,
            wins: 0,
            draws: 0,
            lost: 0,
            scoredGoals: 0,
            concededGoals: 0,
            points: 0 + calculateBonusPoints(group, team.teamId),
          },
        }
      })
  }

  const gameDateAnimationArray = gameArray.map((group) => {
    const teamsTables = initTeamArray(teamArray, group.group)
    // console.log(teamsTables)
    let serieName
    const serieObject = seriesArray.find(
      (serie) => serie.serieGroupCode == group.group
    )

    if (serieObject && serieObject.serieName) {
      serieName = serieObject.serieName
    } else {
      throw new Error('Missing serieName')
    }

    return {
      group: group.group,
      serieName: serieName,
      tables: group.dates.map((date) => {
        date.games.forEach((game) => {
          if (
            (game.homeGoal || game.homeGoal === 0) &&
            (game.awayGoal || game.awayGoal === 0)
          ) {
            const homeTeamIndex = teamsTables.findIndex(
              (team) => team.teamId === game.homeTeamId
            )
            const awayTeamIndex = teamsTables.findIndex(
              (team) => team.teamId === game.awayTeamId
            )
            teamsTables[homeTeamIndex].table.games += 1
            teamsTables[homeTeamIndex].table.scoredGoals += game.homeGoal
            teamsTables[homeTeamIndex].table.concededGoals += game.awayGoal
            teamsTables[awayTeamIndex].table.games += 1
            teamsTables[awayTeamIndex].table.scoredGoals += game.awayGoal
            teamsTables[awayTeamIndex].table.concededGoals += game.homeGoal
            if (game.homeGoal > game.awayGoal) {
              teamsTables[homeTeamIndex].table.wins += 1
              teamsTables[homeTeamIndex].table.points += 2
              teamsTables[awayTeamIndex].table.lost += 1
            } else if (game.homeGoal < game.awayGoal) {
              teamsTables[homeTeamIndex].table.lost += 1
              teamsTables[awayTeamIndex].table.points += 2
              teamsTables[awayTeamIndex].table.wins += 1
            } else if (game.homeGoal === game.awayGoal) {
              teamsTables[homeTeamIndex].table.draws += 1
              teamsTables[awayTeamIndex].table.draws += 1
              teamsTables[homeTeamIndex].table.points += 1
              teamsTables[awayTeamIndex].table.points += 1
            }
          }
        })
        teamsTables
          .sort((teamA, teamB) => {
            if (teamA.table.points === teamB.table.points) {
              return (
                teamB.table.scoredGoals -
                teamB.table.concededGoals -
                (teamA.table.scoredGoals - teamA.table.concededGoals)
              )
            }
            return teamB.table.points - teamA.table.points
          })
          .forEach(
            (_team, index, array) => (array[index].table.position = index + 1)
          )
        const table = JSON.parse(
          JSON.stringify(teamsTables)
        ) as typeof teamsTables
        return {
          date: date.date,
          table: table.sort((teamA, teamB) => {
            if (teamA.table.points === teamB.table.points) {
              return (
                teamB.table.scoredGoals -
                teamB.table.concededGoals -
                (teamA.table.scoredGoals - teamA.table.concededGoals)
              )
            }
            return teamB.table.points - teamA.table.points
          }),
        }
      }),
    }
  })

  return gameDateAnimationArray
}
