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
    if (sortOrder.indexOf(a.group) > sortOrder.indexOf(b.group)) {
      return 1
    }

    if (sortOrder.indexOf(a.group) < sortOrder.indexOf(b.group)) {
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
