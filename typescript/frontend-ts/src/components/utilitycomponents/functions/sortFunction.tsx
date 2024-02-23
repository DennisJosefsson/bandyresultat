import { sortOrder } from './constants'
import { GameObjectType } from '../../types/games/games'
import {
  TableObjectType,
  CompareCategoryTeamTable,
  CompareAllTeamTables,
  NewCompareObject,
} from '../../types/tables/tables'
import { SerieAttributes } from '../../types/series/series'
import { TeamAndSeasonAttributes } from '../../types/teams/teams'
import { SortedStatsCat } from '../../types/stats/stats'

type SortedGameGroups = {
  [key: string]: GameObjectType[]
}

type SortedDates = {
  [key: string]: GameObjectType[]
}

type SortedTableGroups = {
  [key: string]: TableObjectType[]
}

type SortedCompareCategoryTables = {
  [key: string]: CompareCategoryTeamTable[]
}

type DateGames = {
  date: string
  games: GameObjectType[]
}

type SortedGroupsAndDate = {
  group: string
  dates: DateGames[]
}

export const gameSortFunction = (
  gamesArray: GameObjectType[],
  played = false,
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

export type SortedGamesType = ReturnType<typeof gameSortFunction>

export const tableSortFunction = (tableArray: TableObjectType[]) => {
  const groupArray = tableArray.reduce((groups, table) => {
    if (!groups[table.group]) {
      groups[table.group] = []
    }
    groups[table.group].push(table)
    return groups
  }, {} as SortedTableGroups)

  const sortedTables = Object.keys(groupArray).map((group) => {
    return {
      group,
      tables: groupArray[group],
    }
  })

  return sortedTables.sort((a, b) => {
    if (sortOrder.indexOf(a.group) > sortOrder.indexOf(b.group)) {
      return 1
    } else if (sortOrder.indexOf(a.group) < sortOrder.indexOf(b.group)) {
      return -1
    } else {
      return 0
    }
  })
}

export const compareSortFunction = (
  compareArray: CompareCategoryTeamTable[],
) => {
  const sortCategories = compareArray.reduce((categories, team) => {
    if (!categories[team.category]) {
      categories[team.category] = []
    }
    categories[team.category].push(team)
    return categories
  }, {} as SortedCompareCategoryTables)

  const sortedCategories = Object.keys(sortCategories).map((category) => {
    return {
      category,
      teams: sortCategories[category],
    }
  })

  return sortedCategories.sort((a, b) => {
    if (sortOrder.indexOf(a.category) > sortOrder.indexOf(b.category)) {
      return 1
    } else if (sortOrder.indexOf(a.category) < sortOrder.indexOf(b.category)) {
      return -1
    } else {
      return 0
    }
  })
}

export const compareAllTeamData = (allDataArray: CompareAllTeamTables[]) => {
  let newArray: NewCompareObject[] = []

  allDataArray.forEach((team) => {
    if (!newArray.find((teamItem) => team.team === teamItem.team)) {
      newArray.push({
        team: team.team,
        lag: {
          casualName: team.lag.casualName,
          name: team.lag.name,
          teamId: team.lag.teamId,
          shortName: team.lag.shortName,
        },
        totalGames: 0,
        totalWins: 0,
        totalDraws: 0,
        totalLost: 0,
        totalGoalDifference: 0,
        totalGoalsScored: 0,
        totalGoalsConceded: 0,
        totalPoints: 0,
      })
    }
    const teamIndex = newArray.findIndex(
      (teamItem) => team.team === teamItem.team,
    )
    newArray[teamIndex].totalGames += team.totalGames
    newArray[teamIndex].totalWins += team.totalWins
    newArray[teamIndex].totalDraws += team.totalDraws
    newArray[teamIndex].totalLost += team.totalLost
    newArray[teamIndex].totalGoalsScored += team.totalGoalsScored
    newArray[teamIndex].totalGoalsConceded += team.totalGoalsConceded
    newArray[teamIndex].totalGoalDifference += team.totalGoalDifference
    newArray[teamIndex].totalPoints += team.totalPoints
  })

  return newArray.sort((a, b) => {
    if (a.totalPoints < b.totalPoints) {
      return 1
    } else if (a.totalPoints < b.totalPoints) {
      return -1
    } else {
      return 0
    }
  })
}

export const filterOpposition = (array: CompareAllTeamTables[]) => {
  let tempArray: string[] = []

  const callback = (item: CompareAllTeamTables) => {
    if (tempArray.includes(item.lag.casualName + item.opp.casualName)) {
      return false
    } else {
      tempArray.push(item.opp.casualName + item.lag.casualName)
      return true
    }
  }

  return array.filter(callback)
}

const mixedAnimationData = (
  gameArray: SortedGroupsAndDate[],
  teamArray: TeamAndSeasonAttributes[],
  seriesArray: SerieAttributes[],
) => {
  let southTeams: number[] = []
  let northTeams: number[] = []

  const southObject = gameArray.find((group) => group.group === 'AllsvSyd')
  if (!southObject) {
    throw new Error('Wrong game array mixedAnimationData')
  } else {
    southObject.dates.forEach((date) =>
      date.games.forEach((game) => {
        if (!game.homeTeamId || !game.awayTeamId) return

        southTeams.push(game.homeTeamId)
        southTeams.push(game.awayTeamId)
      }),
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
      }),
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

  const initTeamArray = (
    teamArray: TeamAndSeasonAttributes[],
    teams: number[],
  ) => {
    return teamArray
      .filter((team) => team.teamseason.qualification != true)
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
      let teamsTables = initTeamArray(
        teamArray,
        group.group === 'AllsvSyd' ? southTeams : northTeams,
      )
      const serieObject = seriesArray.find(
        (serie) => serie.serieGroupCode == group.group,
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
              game.homeGoal !== undefined &&
              game.awayGoal !== undefined
            ) {
              const homeTeamIndex = teamsTables.findIndex(
                (team) => team.teamId === game.homeTeamId,
              )
              const awayTeamIndex = teamsTables.findIndex(
                (team) => team.teamId === game.awayTeamId,
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
              (_team, index, array) =>
                (array[index].table.position = index + 1),
            )
          const table = JSON.parse(
            JSON.stringify(teamsTables),
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
  teamArray: TeamAndSeasonAttributes[],
  seriesArray: SerieAttributes[],
  seasonId: number,
) => {
  if (gameArray.some((group) => group.group === 'mix'))
    return mixedAnimationData(gameArray, teamArray, seriesArray)

  const teamSeriesArray = gameArray.map((group) => {
    let teamArray: number[] = []
    group.dates.forEach((date) =>
      date.games.forEach((game) => {
        if (!game.homeTeamId || !game.awayTeamId) return
        teamArray.push(game.homeTeamId)
        teamArray.push(game.awayTeamId)
      }),
    )
    return { group: group.group, teams: teamArray }
  })

  const bonusPointsArray = seriesArray.map((serie) => {
    return {
      group: serie.serieGroupCode,
      bonusPoints:
        typeof serie.bonusPoints === 'string'
          ? JSON.parse(serie.bonusPoints)
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
  const initTeamArray = (
    teamArray: TeamAndSeasonAttributes[],
    group: string,
  ) => {
    if (seasonId > 2023) {
      return teamArray
        .filter((team) => team.teamseason.qualification != true)
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
    return teamArray
      .filter((team) => team.teamseason.qualification != true)
      .filter((team) => {
        const teamSeriesObject = teamSeriesArray.find(
          (serie) => serie.group === group,
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
    let teamsTables = initTeamArray(teamArray, group.group)
    let serieName
    const serieObject = seriesArray.find(
      (serie) => serie.serieGroupCode == group.group,
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
          if (game.homeGoal && game.awayGoal) {
            const homeTeamIndex = teamsTables.findIndex(
              (team) => team.teamId === game.homeTeamId,
            )
            const awayTeamIndex = teamsTables.findIndex(
              (team) => team.teamId === game.awayTeamId,
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
            (_team, index, array) => (array[index].table.position = index + 1),
          )
        const table = JSON.parse(
          JSON.stringify(teamsTables),
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

export const sortStatsCat = (array: SortedStatsCat[]) => {
  return array.sort((a, b) => {
    if (sortOrder.indexOf(a.category) > sortOrder.indexOf(b.category)) {
      return 1
    } else if (sortOrder.indexOf(a.category) < sortOrder.indexOf(b.category)) {
      return -1
    } else {
      return 0
    }
  })
}
