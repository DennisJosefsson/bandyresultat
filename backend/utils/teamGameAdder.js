// const { sequelize } = require('./db')

const { TeamGame, Game } = require('../models')

const season = 171

const addTeamGame = async () => {
  // await sequelize.authenticate()
  const allGames = await Game.findAll({
    where: { seasonId: season },
  })

  const homeGames = allGames.map((game) => homeTeam(game))
  const awayGames = allGames.map((game) => awayTeam(game))

  try {
    await TeamGame.bulkCreate(homeGames)
    await TeamGame.bulkCreate(awayGames)
  } catch (error) {
    console.log('There was an error: ', error)
  }
}

const homeTeam = (gameData) => {
  let points, win, lost, draw
  const {
    gameId,
    homeTeamId,
    awayTeamId,
    homeGoal,
    awayGoal,
    date,
    category,
    group,
    playoff,
    women,
    seasonId,
    played,
  } = gameData

  const goalDifference = homeGoal - awayGoal
  const qualificationGame = category === 'qualification' ? true : false
  if (!played) {
    return {
      gameId,
      seasonId,
      team: homeTeamId,
      opponent: awayTeamId,
      goalsScored: 0,
      goalsConceded: 0,
      goalDifference: 0,
      points: 0,
      qualificationGame,
      category,
      group,
      playoff,
      women,
      date,
      played,
      homeGame: true,
    }
  }
  if (homeGoal > awayGoal) {
    points = 2
    win = true
    lost = false
    draw = false
  } else if (homeGoal < awayGoal) {
    points = 0
    win = false
    lost = true
    draw = false
  } else {
    points = 1
    draw = true
    win = false
    lost = false
  }

  return {
    gameId,
    seasonId,
    team: homeTeamId,
    opponent: awayTeamId,
    goalsScored: parseInt(homeGoal),
    goalsConceded: parseInt(awayGoal),
    goalDifference,
    points,
    win,
    draw,
    lost,
    qualificationGame,
    category,
    group,
    playoff,
    women,
    date,
    played,
    homeGame: true,
  }
}
const awayTeam = (gameData) => {
  let points, win, lost, draw
  const {
    gameId,
    homeTeamId,
    awayTeamId,
    homeGoal,
    awayGoal,
    date,
    category,
    group,
    playoff,
    women,
    seasonId,
    played,
  } = gameData
  const goalDifference = awayGoal - homeGoal
  const qualificationGame = category === 'qualification' ? true : false
  if (!played) {
    return {
      gameId,
      seasonId,
      team: homeTeamId,
      opponent: awayTeamId,
      goalsScored: 0,
      goalsConceded: 0,
      goalDifference: 0,
      points: 0,
      qualificationGame,
      category,
      group,
      playoff,
      women,
      date,
      played,
      homeGame: false,
    }
  }
  if (awayGoal > homeGoal) {
    points = 2
    win = true
    lost = false
    draw = false
  } else if (awayGoal < homeGoal) {
    points = 0
    win = false
    lost = true
    draw = false
  } else {
    points = 1
    draw = true
    win = false
    lost = false
  }

  return {
    gameId,
    seasonId,
    team: awayTeamId,
    opponent: homeTeamId,
    goalsScored: parseInt(awayGoal),
    goalsConceded: parseInt(homeGoal),
    goalDifference,
    points,
    win,
    draw,
    lost,
    qualificationGame,
    category,
    group,
    playoff,
    women,
    date,
    played,
    homeGame: false,
  }
}

addTeamGame()
