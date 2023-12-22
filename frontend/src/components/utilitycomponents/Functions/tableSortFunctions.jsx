export const calculateBonusPoints = (
  bonusPoints,
  selectedTable,
  group,
  teamId,
) => {
  if (selectedTable !== 'all') return 0
  const bonus = bonusPoints.find((points) => points.group === group)
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

export const sortTitles = {
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

export const sortFunctions = {
  tablePointsDesc: (bonusPoints, group, selectedTable) => (teamA, teamB) => {
    if (
      Number(teamA.totalPoints) +
        Number(
          calculateBonusPoints(bonusPoints, selectedTable, group, teamA.team),
        ) ===
      Number(teamB.totalPoints) +
        Number(
          calculateBonusPoints(bonusPoints, selectedTable, group, teamB.team),
        )
    ) {
      return teamB.totalGoalDifference - teamA.totalGoalDifference
    }
    return (
      Number(teamB.totalPoints) +
      Number(
        calculateBonusPoints(bonusPoints, selectedTable, group, teamB.team),
      ) -
      (Number(teamA.totalPoints) +
        Number(
          calculateBonusPoints(bonusPoints, selectedTable, group, teamA.team),
        ))
    )
  },
  tablePointsAsc: (bonusPoints, group, selectedTable) => (teamA, teamB) => {
    if (
      Number(teamA.totalPoints) +
        Number(
          calculateBonusPoints(bonusPoints, selectedTable, group, teamA.team),
        ) ===
      Number(teamB.totalPoints) +
        Number(
          calculateBonusPoints(bonusPoints, selectedTable, group, teamB.team),
        )
    ) {
      return teamA.totalGoalDifference - teamB.totalGoalDifference
    }
    return (
      Number(teamA.totalPoints) +
      Number(
        calculateBonusPoints(bonusPoints, selectedTable, group, teamA.team),
      ) -
      (Number(teamB.totalPoints) +
        Number(
          calculateBonusPoints(bonusPoints, selectedTable, group, teamB.team),
        ))
    )
  },
  staticPointsDesc: () => (teamA, teamB) => {
    if (teamA.points === teamB.points) {
      return teamB.goalDifference - teamA.goalDifference
    }
    return teamB.points - teamA.points
  },
  staticPointsAsc: () => (teamA, teamB) => {
    if (teamA.points === teamB.points) {
      return teamA.goalDifference - teamB.goalDifference
    }
    return teamA.points - teamB.points
  },
  maratonPointsDesc: () => (teamA, teamB) => {
    if (teamA.totalPoints === teamB.totalPoints) {
      return teamB.totalGoalDifference - teamA.totalGoalDifference
    }
    return teamB.totalPoints - teamA.totalPoints
  },
  maratonPointsAsc: () => (teamA, teamB) => {
    if (teamA.totalPoints === teamB.totalPoints) {
      return teamA.totalGoalDifference - teamB.totalGoalDifference
    }
    return teamA.totalPoints - teamB.totalPoints
  },
  scoredDesc: () => (teamA, teamB) => {
    return teamB.totalGoalsScored - teamA.totalGoalsScored
  },
  scoredAsc: () => (teamA, teamB) => {
    return teamA.totalGoalsScored - teamB.totalGoalsScored
  },

  concededDesc: () => (teamA, teamB) => {
    return teamB.totalGoalsConceded - teamA.totalGoalsConceded
  },
  concededAsc: () => (teamA, teamB) => {
    return teamA.totalGoalsConceded - teamB.totalGoalsConceded
  },
  goalDiffDesc: () => (teamA, teamB) => {
    return teamB.totalGoalDifference - teamA.totalGoalDifference
  },
  goalDiffAsc: () => (teamA, teamB) => {
    return teamA.totalGoalDifference - teamB.totalGoalDifference
  },
  winDesc: () => (teamA, teamB) => {
    return teamB.totalWins - teamA.totalWins
  },
  winAsc: () => (teamA, teamB) => {
    return teamA.totalWins - teamB.totalWins
  },
  drawDesc: () => (teamA, teamB) => {
    return teamB.totalDraws - teamA.totalDraws
  },
  drawAsc: () => (teamA, teamB) => {
    return teamA.totalDraws - teamB.totalDraws
  },
  lostDesc: () => (teamA, teamB) => {
    return teamB.totalLost - teamA.totalLost
  },
  lostAsc: () => (teamA, teamB) => {
    return teamA.totalLost - teamB.totalLost
  },
  gamesDesc: () => (teamA, teamB) => {
    return teamB.totalGames - teamA.totalGames
  },
  gamesAsc: () => (teamA, teamB) => {
    return teamA.totalGames - teamB.totalGames
  },
  staticScoredDesc: () => (teamA, teamB) => {
    return teamB.scoredGoals - teamA.scoredGoals
  },
  staticScoredAsc: () => (teamA, teamB) => {
    return teamA.scoredGoals - teamB.scoredGoals
  },

  staticConcededDesc: () => (teamA, teamB) => {
    return teamB.concededGoals - teamA.concededGoals
  },
  staticConcededAsc: () => (teamA, teamB) => {
    return teamA.concededGoals - teamB.concededGoals
  },
  staticGoalDiffDesc: () => (teamA, teamB) => {
    return teamB.goalDifference - teamA.goalDifference
  },
  staticGoalDiffAsc: () => (teamA, teamB) => {
    return teamA.goalDifference - teamB.goalDifference
  },
  staticWinDesc: () => (teamA, teamB) => {
    return teamB.won - teamA.won
  },
  staticWinAsc: () => (teamA, teamB) => {
    return teamA.won - teamB.won
  },
  staticDrawDesc: () => (teamA, teamB) => {
    return teamB.draw - teamA.draw
  },
  staticDrawAsc: () => (teamA, teamB) => {
    return teamA.draw - teamB.draw
  },
  staticLostDesc: () => (teamA, teamB) => {
    return teamB.lost - teamA.lost
  },
  staticLostAsc: () => (teamA, teamB) => {
    return teamA.lost - teamB.lost
  },
  staticGamesDesc: () => (teamA, teamB) => {
    return teamB.games - teamA.games
  },
  staticGamesAsc: () => (teamA, teamB) => {
    return teamA.games - teamB.games
  },
}
