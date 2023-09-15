import { sortOrder } from './constants'

export const gameSortFunction = (gamesArray) => {
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
      dates: sortedGameDates,
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

