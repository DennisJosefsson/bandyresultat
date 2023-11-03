import { sortOrder } from './constants'

export const gameSortFunction = (gamesArray, played = false) => {
  const sortGroups = gamesArray.reduce((groups, game) => {
    if (!groups[game.group]) {
      groups[game.group] = []
    }
    groups[game.group].push(game)
    return groups
  }, {})

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
    }, {})

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

export const tableSortFunction = (gamesArray) => {
  const groupArray = gamesArray.reduce((groups, table) => {
    if (!groups[table.group]) {
      groups[table.group] = []
    }
    groups[table.group].push(table)
    return groups
  }, {})

  const sortedTables = Object.keys(groupArray).map((group) => {
    return {
      group,
      tables: groupArray[group],
    }
  })

  return sortedTables.sort((a, b) => {
    if (sortOrder.indexOf(a.group) > sortOrder.indexOf(b.group)) {
      return 1
    }

    if (sortOrder.indexOf(a.group) < sortOrder.indexOf(b.group)) {
      return -1
    }
  })
}

export const compareSortFunction = (compareArray) => {
  const sortCategories = compareArray.reduce((categories, team) => {
    if (!categories[team.category]) {
      categories[team.category] = []
    }
    categories[team.category].push(team)
    return categories
  }, {})

  const sortedCategories = Object.keys(sortCategories).map((category) => {
    return {
      category,
      teams: sortCategories[category],
    }
  })

  return sortedCategories.sort((a, b) => {
    if (sortOrder.indexOf(a.category) > sortOrder.indexOf(b.category)) {
      return 1
    }

    if (sortOrder.indexOf(a.category) < sortOrder.indexOf(b.category)) {
      return -1
    }
  })
}

export const roundForRoundSortFunction = (gamesArray) => {
  const sortTeams = gamesArray.reduce((teams, game) => {
    if (!teams[game.casual_name]) {
      teams[game.casual_name] = []
    }
    teams[game.casual_name].push(game)
    return teams
  }, {})

  const sortedTeams = Object.keys(sortTeams).map((team) => {
    return {
      team,
      games: sortTeams[team],
    }
  })

  return sortedTeams
}

export const compareAllTeamData = (allDataArray) => {
  let newArray = []

  allDataArray.forEach((team) => {
    if (!newArray.find((teamItem) => team.team === teamItem.team)) {
      newArray.push({
        team: team.team,
        lag: team.lag,
        total_games: 0,
        total_wins: 0,
        total_draws: 0,
        total_lost: 0,
        total_goal_difference: 0,
        total_goals_scored: 0,
        total_goals_conceded: 0,
        total_points: 0,
      })
    }
    const teamIndex = newArray.findIndex(
      (teamItem) => team.team === teamItem.team,
    )
    newArray[teamIndex].total_games += Number(team.total_games)
    newArray[teamIndex].total_wins += Number(team.total_wins)
    newArray[teamIndex].total_draws += Number(team.total_draws)
    newArray[teamIndex].total_lost += Number(team.total_lost)
    newArray[teamIndex].total_goals_scored += Number(team.total_goals_scored)
    newArray[teamIndex].total_goals_conceded += Number(
      team.total_goals_conceded,
    )
    newArray[teamIndex].total_goal_difference += Number(
      team.total_goal_difference,
    )
    newArray[teamIndex].total_points += Number(team.total_points)
  })

  return newArray.sort((a, b) => {
    if (a.total_points < b.total_points) {
      return 1
    }
    return -1
  })
}

export const filterOpposition = (array) => {
  let tempArray = []

  const callback = (item) => {
    if (tempArray.includes(item.lag.casualName + item.opp.casualName)) {
      return false
    } else {
      tempArray.push(item.opp.casualName + item.lag.casualName)
      return true
    }
  }

  return array.filter(callback)
}

const mixedAnimationData = (gameArray, teamArray, seriesArray) => {
  let southTeams = []
  let northTeams = []

  gameArray
    .find((group) => group.group === 'AllsvSyd')
    .dates.forEach((date) =>
      date.games.forEach((game) => {
        southTeams.push(game.homeTeamId)
        southTeams.push(game.awayTeamId)
      }),
    )

  gameArray
    .find((group) => group.group === 'AllsvNorr')
    .dates.forEach((date) =>
      date.games.forEach((game) => {
        northTeams.push(game.homeTeamId)
        northTeams.push(game.awayTeamId)
      }),
    )

  gameArray
    .find((group) => group.group === 'mix')
    .dates.forEach((date) => {
      gameArray.find((group) => group.group === 'AllsvSyd').dates.push(date)
      gameArray.find((group) => group.group === 'AllsvNorr').dates.push(date)
    })

  const initTeamArray = (teamArray, teams) => {
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

  const sortByDate = (data) =>
    data.sort(({ date: a }, { date: b }) => (a < b ? -1 : a > b ? 1 : 0))

  const gameDateAnimationArray = gameArray
    .filter((group) => group.group !== 'mix')
    .map((group) => {
      let teamsTables = initTeamArray(
        teamArray,
        group.group === 'AllsvSyd' ? southTeams : northTeams,
      )

      return {
        group: group.group,
        serieName: seriesArray.find(
          (serie) => serie.serieGroupCode == group.group,
        ).serieName,
        tables: sortByDate(group.dates).map((date) => {
          date.games.forEach((game) => {
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
              (team, index, array) => (array[index].position = index + 1),
            )
          const table = JSON.parse(JSON.stringify(teamsTables))
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

export const animationData = (gameArray, teamArray, seriesArray, seasonId) => {
  if (gameArray.some((group) => group.group === 'mix'))
    return mixedAnimationData(gameArray, teamArray, seriesArray)

  const teamSeriesArray = gameArray.map((group) => {
    let teamArray = []
    group.dates.forEach((date) =>
      date.games.forEach((game) => {
        teamArray.push(game.homeTeamId)
        teamArray.push(game.awayTeamId)
      }),
    )
    return { group: group.group, teams: teamArray }
  })

  const bonusPointsArray = seriesArray.map((serie) => {
    return {
      group: serie.serieGroupCode,
      bonusPoints: JSON.parse(serie.bonusPoints),
    }
  })
  const calculateBonusPoints = (group, teamId) => {
    const bonus = bonusPointsArray.find((points) => points.group === group)
    if (bonus.bonusPoints === null) {
      return 0
    }
    const points = bonus.bonusPoints[Number(teamId)]

    if (points === null) {
      return 0
    } else {
      return Number(points)
    }
  }
  const initTeamArray = (teamArray, group) => {
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
              points: 0 + Number(calculateBonusPoints(group, team.teamId)),
            },
          }
        })
    }
    return teamArray
      .filter((team) => team.teamseason.qualification != true)
      .filter((team) =>
        teamSeriesArray
          .find((serie) => serie.group === group)
          .teams.includes(team.teamId),
      )
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
            points: 0 + Number(calculateBonusPoints(group, team.teamId)),
          },
        }
      })
  }

  const gameDateAnimationArray = gameArray.map((group) => {
    let teamsTables = initTeamArray(teamArray, group.group)

    return {
      group: group.group,
      serieName: seriesArray.find(
        (serie) => serie.serieGroupCode == group.group,
      ).serieName,
      tables: group.dates.map((date) => {
        date.games.forEach((game) => {
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
          .forEach((team, index, array) => (array[index].position = index + 1))
        const table = JSON.parse(JSON.stringify(teamsTables))
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

export const sortStatsCat = (array) => {
  return array.sort((a, b) => {
    if (sortOrder.indexOf(a.category) > sortOrder.indexOf(b.category)) {
      return 1
    }

    if (sortOrder.indexOf(a.category) < sortOrder.indexOf(b.category)) {
      return -1
    }
  })
}
