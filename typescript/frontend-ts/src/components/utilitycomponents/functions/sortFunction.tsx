import { sortOrder } from './constants'
import { GameObjectType } from '../../types/games/games'
import {
  TableObjectType,
  CompareCategoryTeamTable,
  CompareAllTeamTables,
  NewCompareObject,
} from '../../types/tables/tables'
// import { SerieAttributes } from '../../types/series/series'
// import { TeamAndSeasonAttributes } from '../../types/teams/teams'
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

// type DateGames = {
//   date: string
//   games: GameObjectType[]
// }

// type SortedGroupsAndDate = {
//   group: string
//   dates: DateGames[]
// }

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

export type SortedTablesType = ReturnType<typeof tableSortFunction>

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

type ChartData = {
  data: number
  category: string
}

export const sortChartData = (array: ChartData[]) => {
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

type TotalBarChartData = {
  avgAll: number | undefined
  totAll: number | undefined
  avgAway: number | undefined
  totAway: number | undefined
  avgHome: number | undefined
  totHome: number | undefined
  category: string
}

export const sortTotalBarChartData = (
  array: TotalBarChartData[] | undefined,
) => {
  if (!array) return
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
