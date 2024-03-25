// type BonusPointsType = {
//   group: string
//   bonusPoints: { [key: string]: number } | null
// }

type Team = {
  totalPoints: number
  team: number
  totalGoalDifference: number
  group: string
  women: boolean
  lag: {
    shortName: string
    name: string
  }
  totalGames: number
  totalWins: number
  totalDraws: number
  totalLost: number
  totalGoalsScored: number
  totalGoalsConceded: number
}

type StaticTeam = {
  points: number
  goalDifference: number
  group: string
  games: number
  won: number
  draw: number
  lost: number
  scoredGoals: number
  concededGoals: number
}

type MaratonTeam = Omit<Team, 'group'>

// export const calculateBonusPoints = (
//   bonusPoints: BonusPointsType[],
//   selectedTable: string,
//   group: string,
//   teamId: number,
// ) => {
//   if (selectedTable !== 'all') return 0
//   const bonus = bonusPoints.find((points) => points.group === group)
//   if (!bonus) return 0
//   if (bonus.bonusPoints === null) {
//     return 0
//   }
//   const points = bonus.bonusPoints[String(teamId)]

//   if (points === null) {
//     return 0
//   } else {
//     return points
//   }
// }

type Titles = {
  [key: string]: string
}

export const sortTitles: Titles = {
  tablePointsDesc: 'poäng fallande',
  tablePointsAsc: 'poäng stigande',
  scoredDesc: 'gjorda mål fallande',
  scoredAsc: 'gjorda mål stigande',
  concededDesc: 'insläppta mål fallande',
  concededAsc: 'insläppta mål stigande',
  goalDiffDesc: 'målskillnad fallande',
  goalDiffAsc: 'målskillnad stigande',
  gamesDesc: 'antal matcher fallande',
  gamesAsc: 'antal matcher stigande',
  winDesc: 'antal vinster fallande',
  winAsc: 'antal vinster stigande',
  drawDesc: 'antal oavgjorda fallande',
  drawAsc: 'antal oavgjorda stigande',
  lostDesc: 'antal förluster fallande',
  lostAsc: 'antal förluster stigande',
  staticPointsDesc: 'poäng fallande',
  staticPointsAsc: 'poäng stigande',
  staticScoredDesc: 'gjorda mål fallande',
  staticScoredAsc: 'gjorda mål stigande',
  staticConcededDesc: 'insläppta mål fallande',
  staticConcededAsc: 'insläppta mål stigande',
  staticGoalDiffDesc: 'målskillnad fallande',
  staticGoalDiffAsc: 'målskillnad stigande',
  staticGamesDesc: 'antal matcher fallande',
  staticGamesAsc: 'antal matcher stigande',
  staticWinDesc: 'antal vinster fallande',
  staticWinAsc: 'antal vinster stigande',
  staticDrawDesc: 'antal oavgjorda fallande',
  staticDrawAsc: 'antal oavgjorda stigande',
  staticLostDesc: 'antal förluster fallande',
  staticLostAsc: 'antal förluster stigande',
  maratonPointsDesc: 'poäng fallande',
  maratonPointsAsc: 'poäng stigande',
}

type Functions = {
  [key: string]: (
    group?: string,
    selectedTable?: string,
  ) => (TeamA: Team, TeamB: Team) => number
}

export const sortFunctions: Functions = {
  tablePointsDesc:
    (group: string | undefined, selectedTable: string | undefined) =>
    (teamA: Team, teamB: Team) => {
      if (!group || !selectedTable) throw new Error('Missing parameters')
      if (teamA.totalPoints === teamB.totalPoints) {
        return teamB.totalGoalDifference - teamA.totalGoalDifference
      }
      return teamB.totalPoints - teamA.totalPoints
    },
  tablePointsAsc:
    (group: string | undefined, selectedTable: string | undefined) =>
    (teamA: Team, teamB: Team) => {
      if (!group || !selectedTable) throw new Error('Missing parameters')
      if (teamA.totalPoints === teamB.totalPoints) {
        return teamA.totalGoalDifference - teamB.totalGoalDifference
      }
      return teamA.totalPoints - teamB.totalPoints
    },

  scoredDesc: () => (teamA: Team, teamB: Team) => {
    return teamB.totalGoalsScored - teamA.totalGoalsScored
  },
  scoredAsc: () => (teamA: Team, teamB: Team) => {
    return teamA.totalGoalsScored - teamB.totalGoalsScored
  },

  concededDesc: () => (teamA: Team, teamB: Team) => {
    return teamB.totalGoalsConceded - teamA.totalGoalsConceded
  },
  concededAsc: () => (teamA: Team, teamB: Team) => {
    return teamA.totalGoalsConceded - teamB.totalGoalsConceded
  },
  goalDiffDesc: () => (teamA: Team, teamB: Team) => {
    return teamB.totalGoalDifference - teamA.totalGoalDifference
  },
  goalDiffAsc: () => (teamA: Team, teamB: Team) => {
    return teamA.totalGoalDifference - teamB.totalGoalDifference
  },
  winDesc: () => (teamA: Team, teamB: Team) => {
    return teamB.totalWins - teamA.totalWins
  },
  winAsc: () => (teamA: Team, teamB: Team) => {
    return teamA.totalWins - teamB.totalWins
  },
  drawDesc: () => (teamA: Team, teamB: Team) => {
    return teamB.totalDraws - teamA.totalDraws
  },
  drawAsc: () => (teamA: Team, teamB: Team) => {
    return teamA.totalDraws - teamB.totalDraws
  },
  lostDesc: () => (teamA: Team, teamB: Team) => {
    return teamB.totalLost - teamA.totalLost
  },
  lostAsc: () => (teamA: Team, teamB: Team) => {
    return teamA.totalLost - teamB.totalLost
  },
  gamesDesc: () => (teamA: Team, teamB: Team) => {
    return teamB.totalGames - teamA.totalGames
  },
  gamesAsc: () => (teamA: Team, teamB: Team) => {
    return teamA.totalGames - teamB.totalGames
  },
}

type StaticFunctions = {
  [key: string]: (TeamA: StaticTeam, TeamB: StaticTeam) => number
}

export const staticFunctions: StaticFunctions = {
  staticPointsDesc: (teamA: StaticTeam, teamB: StaticTeam) => {
    if (teamA.points === teamB.points) {
      return teamB.goalDifference - teamA.goalDifference
    }
    return teamB.points - teamA.points
  },
  staticPointsAsc: (teamA: StaticTeam, teamB: StaticTeam) => {
    if (teamA.points === teamB.points) {
      return teamA.goalDifference - teamB.goalDifference
    }
    return teamA.points - teamB.points
  },
  staticScoredDesc: (teamA: StaticTeam, teamB: StaticTeam) => {
    return teamB.scoredGoals - teamA.scoredGoals
  },
  staticScoredAsc: (teamA: StaticTeam, teamB: StaticTeam) => {
    return teamA.scoredGoals - teamB.scoredGoals
  },

  staticConcededDesc: (teamA: StaticTeam, teamB: StaticTeam) => {
    return teamB.concededGoals - teamA.concededGoals
  },
  staticConcededAsc: (teamA: StaticTeam, teamB: StaticTeam) => {
    return teamA.concededGoals - teamB.concededGoals
  },
  staticGoalDiffDesc: (teamA: StaticTeam, teamB: StaticTeam) => {
    return teamB.goalDifference - teamA.goalDifference
  },
  staticGoalDiffAsc: (teamA: StaticTeam, teamB: StaticTeam) => {
    return teamA.goalDifference - teamB.goalDifference
  },
  staticWinDesc: (teamA: StaticTeam, teamB: StaticTeam) => {
    return teamB.won - teamA.won
  },
  staticWinAsc: (teamA: StaticTeam, teamB: StaticTeam) => {
    return teamA.won - teamB.won
  },
  staticDrawDesc: (teamA: StaticTeam, teamB: StaticTeam) => {
    return teamB.draw - teamA.draw
  },
  staticDrawAsc: (teamA: StaticTeam, teamB: StaticTeam) => {
    return teamA.draw - teamB.draw
  },
  staticLostDesc: (teamA: StaticTeam, teamB: StaticTeam) => {
    return teamB.lost - teamA.lost
  },
  staticLostAsc: (teamA: StaticTeam, teamB: StaticTeam) => {
    return teamA.lost - teamB.lost
  },
  staticGamesDesc: (teamA: StaticTeam, teamB: StaticTeam) => {
    return teamB.games - teamA.games
  },
  staticGamesAsc: (teamA: StaticTeam, teamB: StaticTeam) => {
    return teamA.games - teamB.games
  },
}

type MaratonFunctions = {
  [key: string]: (TeamA: MaratonTeam, TeamB: MaratonTeam) => number
}

export const maratonSortFunctions: MaratonFunctions = {
  maratonPointsDesc: (teamA: MaratonTeam, teamB: MaratonTeam) => {
    if (teamA.totalPoints === teamB.totalPoints) {
      return teamB.totalGoalDifference - teamA.totalGoalDifference
    }
    return teamB.totalPoints - teamA.totalPoints
  },
  maratonPointsAsc: (teamA: MaratonTeam, teamB: MaratonTeam) => {
    if (teamA.totalPoints === teamB.totalPoints) {
      return teamA.totalGoalDifference - teamB.totalGoalDifference
    }
    return teamA.totalPoints - teamB.totalPoints
  },
  scoredDesc: (teamA: MaratonTeam, teamB: MaratonTeam) => {
    return teamB.totalGoalsScored - teamA.totalGoalsScored
  },
  scoredAsc: (teamA: MaratonTeam, teamB: MaratonTeam) => {
    return teamA.totalGoalsScored - teamB.totalGoalsScored
  },

  concededDesc: (teamA: MaratonTeam, teamB: MaratonTeam) => {
    return teamB.totalGoalsConceded - teamA.totalGoalsConceded
  },
  concededAsc: (teamA: MaratonTeam, teamB: MaratonTeam) => {
    return teamA.totalGoalsConceded - teamB.totalGoalsConceded
  },
  goalDiffDesc: (teamA: MaratonTeam, teamB: MaratonTeam) => {
    return teamB.totalGoalDifference - teamA.totalGoalDifference
  },
  goalDiffAsc: (teamA: MaratonTeam, teamB: MaratonTeam) => {
    return teamA.totalGoalDifference - teamB.totalGoalDifference
  },
  winDesc: (teamA: MaratonTeam, teamB: MaratonTeam) => {
    return teamB.totalWins - teamA.totalWins
  },
  winAsc: (teamA: MaratonTeam, teamB: MaratonTeam) => {
    return teamA.totalWins - teamB.totalWins
  },
  drawDesc: (teamA: MaratonTeam, teamB: MaratonTeam) => {
    return teamB.totalDraws - teamA.totalDraws
  },
  drawAsc: (teamA: MaratonTeam, teamB: MaratonTeam) => {
    return teamA.totalDraws - teamB.totalDraws
  },
  lostDesc: (teamA: MaratonTeam, teamB: MaratonTeam) => {
    return teamB.totalLost - teamA.totalLost
  },
  lostAsc: (teamA: MaratonTeam, teamB: MaratonTeam) => {
    return teamA.totalLost - teamB.totalLost
  },
  gamesDesc: (teamA: MaratonTeam, teamB: MaratonTeam) => {
    return teamB.totalGames - teamA.totalGames
  },
  gamesAsc: (teamA: MaratonTeam, teamB: MaratonTeam) => {
    return teamA.totalGames - teamB.totalGames
  },
}
