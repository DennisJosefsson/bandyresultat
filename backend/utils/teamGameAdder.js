// const { sequelize } = require('./db')

const { TeamGame, Game } = require('../models')

const season = 136

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

const homeTeam = (game) => {
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
  } = game
  const goalDifference = homeGoal - awayGoal
  const qualificationGame = category === 'qualification' ? true : false
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
    seasonId: season,
    team: homeTeamId,
    opponent: awayTeamId,
    goalsScored: homeGoal,
    goalsConceded: awayGoal,
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
    homeGame: true,
  }
}
const awayTeam = (game) => {
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
  } = game
  const goalDifference = awayGoal - homeGoal
  const qualificationGame = category === 'qualification' ? true : false
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
    seasonId: season,
    team: awayTeamId,
    opponent: homeTeamId,
    goalsScored: awayGoal,
    goalsConceded: homeGoal,
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
    homeGame: false,
  }
}

addTeamGame()
