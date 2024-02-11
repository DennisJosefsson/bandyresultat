const router = require('express').Router()
const { sequelize } = require('../utils/db')
const { Op, QueryTypes } = require('sequelize')
const { Table, Season, Team, TeamGame, Game, Link } = require('../models')
const { authControl } = require('../utils/middleware')

router.get('/maraton', async (req, res, next) => {
  res.locals.origin = 'GET Maraton router'
  const maratonTabell = await TeamGame.findAll({
    where: { category: 'regular', played: true },
    attributes: [
      'team',
      [sequelize.literal('count(*)'), 'totalGames'],
      [sequelize.literal('sum (points)'), 'totalPoints'],
      [sequelize.literal('sum(goals_scored)'), 'totalGoalsScored'],
      [sequelize.literal('sum(goals_conceded)'), 'totalGoalsConceded'],
      [sequelize.literal('sum(goal_difference)'), 'totalGoalDifference'],
      [sequelize.literal(`(count(*) filter (where win))`), 'totalWins'],
      [sequelize.literal(`(count(*) filter (where draw))`), 'totalDraws'],
      [sequelize.literal(`(count(*) filter (where lost))`), 'totalLost'],
    ],
    include: [
      {
        model: Team,
        attributes: ['name', 'teamId', 'casualName', 'shortName', 'women'],
        as: 'lag',
      },
    ],
    group: [
      'team',
      'lag.name',
      'lag.team_id',
      'lag.casual_name',
      'lag.short_name',
      'lag.women',
    ],
    order: [
      ['totalPoints', 'DESC'],
      ['totalGoalDifference', 'DESC'],
      ['totalGoalsScored', 'DESC'],
    ],
  })

  const maratonHemmaTabell = await TeamGame.findAll({
    where: { category: 'regular', played: true, homeGame: true },
    attributes: [
      'team',
      [sequelize.literal('count(*)'), 'totalGames'],
      [sequelize.literal('sum (points)'), 'totalPoints'],
      [sequelize.literal('sum(goals_scored)'), 'totalGoalsScored'],
      [sequelize.literal('sum(goals_conceded)'), 'totalGoalsConceded'],
      [sequelize.literal('sum(goal_difference)'), 'totalGoalDifference'],
      [sequelize.literal(`(count(*) filter (where win))`), 'totalWins'],
      [sequelize.literal(`(count(*) filter (where draw))`), 'totalDraws'],
      [sequelize.literal(`(count(*) filter (where lost))`), 'totalLost'],
    ],
    include: [
      {
        model: Team,
        attributes: ['name', 'teamId', 'casualName', 'shortName', 'women'],
        as: 'lag',
      },
    ],
    group: [
      'team',
      'lag.name',
      'lag.team_id',
      'lag.casual_name',
      'lag.short_name',
      'lag.women',
    ],
    order: [
      ['totalPoints', 'DESC'],
      ['totalGoalDifference', 'DESC'],
      ['totalGoalsScored', 'DESC'],
    ],
  })

  const maratonBortaTabell = await TeamGame.findAll({
    where: { category: 'regular', played: true, homeGame: false },
    attributes: [
      'team',
      [sequelize.literal('count(*)'), 'totalGames'],
      [sequelize.literal('sum (points)'), 'totalPoints'],
      [sequelize.literal('sum(goals_scored)'), 'totalGoalsScored'],
      [sequelize.literal('sum(goals_conceded)'), 'totalGoalsConceded'],
      [sequelize.literal('sum(goal_difference)'), 'totalGoalDifference'],
      [sequelize.literal(`(count(*) filter (where win))`), 'totalWins'],
      [sequelize.literal(`(count(*) filter (where draw))`), 'totalDraws'],
      [sequelize.literal(`(count(*) filter (where lost))`), 'totalLost'],
    ],
    include: [
      {
        model: Team,
        attributes: ['name', 'teamId', 'casualName', 'shortName', 'women'],
        as: 'lag',
      },
    ],
    group: [
      'team',
      'lag.name',
      'lag.team_id',
      'lag.casual_name',
      'lag.short_name',
      'lag.women',
    ],
    order: [
      ['totalPoints', 'DESC'],
      ['totalGoalDifference', 'DESC'],
      ['totalGoalsScored', 'DESC'],
    ],
  })
  res.json({ maratonTabell, maratonHemmaTabell, maratonBortaTabell })
})

router.post('/compare', async (req, res, next) => {
  res.locals.origin = 'POST Compare router'
  const { teamArray, categoryArray, startSeason, endSeason } = req.body
  const searchString = JSON.stringify(req.body)

  const seasonNames = await Season.findAll({
    where: { seasonId: { [Op.in]: [startSeason, endSeason] } },
  })

  const tabeller = await TeamGame.findAll({
    where: {
      team: {
        [Op.in]: teamArray,
      },
      opponent: {
        [Op.in]: teamArray,
      },
      category: {
        [Op.any]: categoryArray,
      },
      [Op.and]: [
        { seasonId: { [Op.gte]: startSeason } },
        { seasonId: { [Op.lte]: endSeason } },
      ],
      played: true,
    },
    attributes: [
      'team',
      'opponent',
      'category',
      [sequelize.literal('count(*)'), 'totalGames'],
      [sequelize.literal('sum (points)'), 'totalPoints'],
      [sequelize.literal('sum(goals_scored)'), 'totalGoalsScored'],
      [sequelize.literal('sum(goals_conceded)'), 'totalGoalsConceded'],
      [sequelize.literal('sum(goal_difference)'), 'totalGoalDifference'],
      [sequelize.literal(`(count(*) filter (where win))`), 'totalWins'],
      [sequelize.literal(`(count(*) filter (where draw))`), 'totalDraws'],
      [sequelize.literal(`(count(*) filter (where lost))`), 'totalLost'],
    ],
    include: [
      {
        model: Team,
        attributes: ['name', 'teamId', 'casualName', 'shortName'],
        as: 'lag',
      },
      {
        model: Team,
        attributes: ['name', 'teamId', 'casualName', 'shortName'],
        as: 'opp',
      },
    ],
    group: [
      'team',
      'opponent',
      'category',
      'lag.name',
      'lag.team_id',
      'lag.casual_name',
      'lag.short_name',
      'opp.name',
      'opp.team_id',
      'opp.casual_name',
      'opp.short_name',
    ],
    order: [
      ['team', 'DESC'],
      ['totalPoints', 'DESC'],
      ['totalGoalDifference', 'DESC'],
      ['totalGoalsScored', 'DESC'],
    ],
  })
  const compareAllGames = await TeamGame.findAll({
    where: {
      team: {
        [Op.in]: teamArray,
      },
      opponent: {
        [Op.in]: teamArray,
      },
      category: {
        [Op.any]: categoryArray,
      },
      [Op.and]: [
        { seasonId: { [Op.gte]: startSeason } },
        { seasonId: { [Op.lte]: endSeason } },
      ],
      played: true,
    },
    attributes: [
      'team',
      'opponent',
      [sequelize.literal('count(*)'), 'totalGames'],
      [sequelize.literal('sum (points)'), 'totalPoints'],
      [sequelize.literal('sum(goals_scored)'), 'totalGoalsScored'],
      [sequelize.literal('sum(goals_conceded)'), 'totalGoalsConceded'],
      [sequelize.literal('sum(goal_difference)'), 'totalGoalDifference'],
      [sequelize.literal(`(count(*) filter (where win))`), 'totalWins'],
      [sequelize.literal(`(count(*) filter (where draw))`), 'totalDraws'],
      [sequelize.literal(`(count(*) filter (where lost))`), 'totalLost'],
    ],
    include: [
      {
        model: Team,
        attributes: ['name', 'teamId', 'casualName', 'shortName'],
        as: 'lag',
      },
      {
        model: Team,
        attributes: ['name', 'teamId', 'casualName', 'shortName'],
        as: 'opp',
      },
    ],
    group: [
      'team',
      'opponent',
      'lag.name',
      'lag.team_id',
      'lag.casual_name',
      'lag.short_name',
      'opp.name',
      'opp.team_id',
      'opp.casual_name',
      'opp.short_name',
    ],
    order: [
      ['team', 'DESC'],
      ['totalPoints', 'DESC'],
      ['totalGoalDifference', 'DESC'],
      ['totalGoalsScored', 'DESC'],
    ],
  })

  const golds = await sequelize.query(
    `
  select count(distinct season_id) as guld, team, casual_name
from teamgames
join teams on teamgames.team = teams.team_id
where team = any($team_array) and category = 'final' and win = true
group by casual_name,team;
  `,
    { bind: { team_array: teamArray }, type: QueryTypes.SELECT }
  )

  const playoffs = await sequelize.query(
    `
  select count(distinct season_id) as playoffs, team, casual_name
from teamgames
join teams on teamgames.team = teams.team_id
where team = any($team_array) and playoff = true and season_id >= 25
group by casual_name, team;
  `,
    { bind: { team_array: teamArray }, type: QueryTypes.SELECT }
  )

  const seasons = await sequelize.query(
    `
  select count(distinct season_id) as seasons, team, casual_name
from teamgames
join teams on teamgames.team = teams.team_id
where team = any($team_array) and season_id >= 25
group by casual_name, team;
  `,
    { bind: { team_array: teamArray }, type: QueryTypes.SELECT }
  )

  const allPlayoffs = await sequelize.query(
    `
  select count(distinct season_id) as playoffs, team, casual_name
from teamgames
join teams on teamgames.team = teams.team_id
where team = any($team_array) and playoff = true
group by casual_name, team;
  `,
    { bind: { team_array: teamArray }, type: QueryTypes.SELECT }
  )

  const allSeasons = await sequelize.query(
    `
  select count(distinct season_id) as seasons, team, casual_name
from teamgames
join teams on teamgames.team = teams.team_id
where team = any($team_array)
group by casual_name, team;
  `,
    { bind: { team_array: teamArray }, type: QueryTypes.SELECT }
  )

  const firstAndLatestGames = await sequelize.query(
    `
 with first_games as (select game_id, home_team_id, away_team_id, "date", result,
rank() over (partition by home_team_id, away_team_id order by "date" asc) ranked_first_games,
rank() over (partition by home_team_id, away_team_id order by "date" desc) ranked_last_games
from games
where home_team_id = any($team_array) and away_team_id = any($team_array) and played = true) 

select game_id, "date", result, home.casual_name as home_name, away.casual_name as away_name, ranked_first_games, ranked_last_games from first_games 
join teams as home on first_games.home_team_id = home.team_id
join teams as away on first_games.away_team_id = away.team_id
where ranked_first_games = 1 or ranked_last_games < 6
order by "date" asc;
 `,
    { bind: { team_array: teamArray }, type: QueryTypes.SELECT }
  )

  const latestHomeWin = await sequelize.query(
    `
 with latest_win_games as (select game_id,
rank() over (partition by team, opponent order by "date" desc) ranked_latest_games
from teamgames
where team = any($team_array) and opponent = any($team_array) and home_game = true and win = true and category != 'final'),

selected_id as (select game_id from latest_win_games where ranked_latest_games = 1)

select games.game_id, "date", result, home.casual_name as home_name, away.casual_name as away_name from games
join selected_id on games.game_id = selected_id.game_id
join teams as home on games.home_team_id = home.team_id
join teams as away on games.away_team_id = away.team_id
where games.game_id = selected_id.game_id
order by "date" desc;
 `,
    { bind: { team_array: teamArray }, type: QueryTypes.SELECT }
  )

  const latestAwayWin = await sequelize.query(
    `
 with latest_win_games as (select game_id,
rank() over (partition by team, opponent order by "date" desc) ranked_latest_games
from teamgames
where team = any($team_array) and opponent = any($team_array) and home_game = false and win = true and category != 'final'),

selected_id as (select game_id from latest_win_games where ranked_latest_games = 1)

select games.game_id, "date", result, home.casual_name as home_name, away.casual_name as away_name from games
join selected_id on games.game_id = selected_id.game_id
join teams as home on games.home_team_id = home.team_id
join teams as away on games.away_team_id = away.team_id
where games.game_id = selected_id.game_id
order by "date" desc;
 `,
    { bind: { team_array: teamArray }, type: QueryTypes.SELECT }
  )

  const link = await Link.findOrCreate({
    where: { searchString: searchString, origin: 'compare' },
  })

  res.json({
    tabeller,
    compareAllGames,
    golds,
    playoffs,
    seasons,
    allPlayoffs,
    allSeasons,
    firstAndLatestGames,
    link,
    seasonNames,
    latestHomeWin,
    latestAwayWin,
  })
})

router.get('/:seasonId', async (req, res, next) => {
  res.locals.origin = 'GET Single Season Tables router'
  const seasonName =
    req.params.seasonId < 1964
      ? req.params.seasonId
      : `${Number(req.params.seasonId) - 1}/${req.params.seasonId}`

  const seasonExist = await Season.count({ where: { year: seasonName } })
  if (seasonExist === 0) {
    return res.json({ success: 'false', message: 'Säsong finns inte' })
  }

  const playoffGames = await Game.findAll({
    where: { playoff: true, category: ['eight', 'quarter', 'semi', 'final'] },
    include: [
      {
        model: Team,
        attributes: ['name', 'teamId', 'casualName', 'shortName'],
        as: 'homeTeam',
      },
      {
        model: Team,
        attributes: ['name', 'teamId', 'casualName', 'shortName'],
        as: 'awayTeam',
      },
      {
        model: Season,
        where: { year: { [Op.eq]: seasonName } },
        attributes: ['year', 'seasonId'],
      },
    ],
    order: [
      ['group', 'ASC'],
      ['date', 'ASC'],
    ],
  })
  const tabell = await TeamGame.findAll({
    where: { played: true },
    attributes: [
      'team',
      'group',
      'women',
      'category',
      [sequelize.literal('count(*)'), 'totalGames'],
      [sequelize.literal('sum (points)'), 'totalPoints'],
      [sequelize.literal('sum(goals_scored)'), 'totalGoalsScored'],
      [sequelize.literal('sum(goals_conceded)'), 'totalGoalsConceded'],
      [sequelize.literal('sum(goal_difference)'), 'totalGoalDifference'],
      [sequelize.literal(`(count(*) filter (where win))`), 'totalWins'],
      [sequelize.literal(`(count(*) filter (where draw))`), 'totalDraws'],
      [sequelize.literal(`(count(*) filter (where lost))`), 'totalLost'],
    ],
    include: [
      {
        model: Team,
        attributes: ['name', 'teamId', 'casualName', 'shortName'],
        as: 'lag',
      },
      {
        model: Season,
        attributes: ['seasonId', 'year'],
        where: { year: { [Op.eq]: seasonName } },
      },
    ],
    group: [
      'group',
      'team',
      'lag.name',
      'lag.team_id',
      'lag.casual_name',
      'lag.short_name',
      'category',
      'season.season_id',
      'season.year',
      'teamgame.women',
    ],
    order: [
      ['group', 'DESC'],
      ['totalPoints', 'DESC'],
      ['totalGoalDifference', 'DESC'],
      ['totalGoalsScored', 'DESC'],
    ],
  })

  const hemmaTabell = await TeamGame.findAll({
    where: { homeGame: true, played: true },
    attributes: [
      'team',
      'group',
      'women',
      'category',
      [sequelize.literal('count(*)'), 'totalGames'],
      [sequelize.literal('sum (points)'), 'totalPoints'],
      [sequelize.literal('sum(goals_scored)'), 'totalGoalsScored'],
      [sequelize.literal('sum(goals_conceded)'), 'totalGoalsConceded'],
      [sequelize.literal('sum(goal_difference)'), 'totalGoalDifference'],
      [sequelize.literal(`(count(*) filter (where win))`), 'totalWins'],
      [sequelize.literal(`(count(*) filter (where draw))`), 'totalDraws'],
      [sequelize.literal(`(count(*) filter (where lost))`), 'totalLost'],
    ],
    include: [
      {
        model: Team,
        attributes: ['name', 'teamId', 'casualName', 'shortName'],
        as: 'lag',
      },
      {
        model: Season,
        attributes: ['seasonId', 'year'],
        where: { year: { [Op.eq]: seasonName } },
      },
    ],
    group: [
      'group',
      'team',
      'lag.name',
      'lag.team_id',
      'lag.casual_name',
      'lag.short_name',
      'category',
      'season.season_id',
      'season.year',
      'teamgame.women',
    ],
    order: [
      ['group', 'DESC'],
      ['totalPoints', 'DESC'],
      ['totalGoalDifference', 'DESC'],
      ['totalGoalsScored', 'DESC'],
    ],
  })

  const bortaTabell = await TeamGame.findAll({
    where: { homeGame: false, played: true },
    attributes: [
      'team',
      'group',
      'women',
      'category',
      [sequelize.literal('count(*)'), 'totalGames'],
      [sequelize.literal('sum (points)'), 'totalPoints'],
      [sequelize.literal('sum(goals_scored)'), 'totalGoalsScored'],
      [sequelize.literal('sum(goals_conceded)'), 'totalGoalsConceded'],
      [sequelize.literal('sum(goal_difference)'), 'totalGoalDifference'],
      [sequelize.literal(`(count(*) filter (where win))`), 'totalWins'],
      [sequelize.literal(`(count(*) filter (where draw))`), 'totalDraws'],
      [sequelize.literal(`(count(*) filter (where lost))`), 'totalLost'],
    ],
    include: [
      {
        model: Team,
        attributes: ['name', 'teamId', 'casualName', 'shortName'],
        as: 'lag',
      },
      {
        model: Season,
        attributes: ['seasonId', 'year'],
        where: { year: { [Op.eq]: seasonName } },
      },
    ],
    group: [
      'group',
      'team',
      'lag.name',
      'lag.team_id',
      'lag.casual_name',
      'lag.short_name',
      'category',
      'season.season_id',
      'season.year',
      'teamgame.women',
    ],
    order: [
      ['group', 'DESC'],
      ['totalPoints', 'DESC'],
      ['totalGoalDifference', 'DESC'],
      ['totalGoalsScored', 'DESC'],
    ],
  })

  if (!tabell) {
    throw new Error('No such table in the database')
  } else {
    res.json({
      tabell,
      hemmaTabell,
      bortaTabell,
      playoffGames,
    })
  }
})

router.post('/', authControl, async (req, res, next) => {
  res.locals.origin = 'POST Tables router'
  const table = await Table.create(req.body)
  res.json(table)
})

router.delete('/:tableId', authControl, async (req, res, next) => {
  res.locals.origin = 'DELETE Tables router'
  const table = await Table.findByPk(req.params.tableId)
  if (!table) {
    throw new Error('No such table in the database')
  } else {
    await table.destroy()
    res.json({ message: 'table deleted' })
  }
})

router.put('/:tableId', authControl, async (req, res, next) => {
  res.locals.origin = 'PUT Tables router'
  const table = await Table.findByPk(req.params.tableId)
  if (!table) {
    throw new Error('No such table in the database')
  } else {
    table.set(req.body)
    await table.save()
    res.json(table)
  }
})

module.exports = router
