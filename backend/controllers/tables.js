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
      [sequelize.fn('count', sequelize.col('team_game_id')), 'total_games'],
      [sequelize.fn('sum', sequelize.col('points')), 'total_points'],
      [
        sequelize.fn('sum', sequelize.col('goals_scored')),
        'total_goals_scored',
      ],
      [
        sequelize.fn('sum', sequelize.col('goals_conceded')),
        'total_goals_conceded',
      ],
      [
        sequelize.fn('sum', sequelize.col('goal_difference')),
        'total_goal_difference',
      ],
      [sequelize.literal(`(count(*) filter (where win))`), 'total_wins'],
      [sequelize.literal(`(count(*) filter (where draw))`), 'total_draws'],
      [sequelize.literal(`(count(*) filter (where lost))`), 'total_lost'],
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
      ['total_points', 'DESC'],
      ['total_goal_difference', 'DESC'],
      ['total_goals_scored', 'DESC'],
    ],
  })

  const maratonHemmaTabell = await TeamGame.findAll({
    where: { category: 'regular', played: true, homeGame: true },
    attributes: [
      'team',
      [sequelize.fn('count', sequelize.col('team_game_id')), 'total_games'],
      [sequelize.fn('sum', sequelize.col('points')), 'total_points'],
      [
        sequelize.fn('sum', sequelize.col('goals_scored')),
        'total_goals_scored',
      ],
      [
        sequelize.fn('sum', sequelize.col('goals_conceded')),
        'total_goals_conceded',
      ],
      [
        sequelize.fn('sum', sequelize.col('goal_difference')),
        'total_goal_difference',
      ],
      [sequelize.literal(`(count(*) filter (where win))`), 'total_wins'],
      [sequelize.literal(`(count(*) filter (where draw))`), 'total_draws'],
      [sequelize.literal(`(count(*) filter (where lost))`), 'total_lost'],
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
      ['total_points', 'DESC'],
      ['total_goal_difference', 'DESC'],
      ['total_goals_scored', 'DESC'],
    ],
  })

  const maratonBortaTabell = await TeamGame.findAll({
    where: { category: 'regular', played: true, homeGame: false },
    attributes: [
      'team',
      [sequelize.fn('count', sequelize.col('team_game_id')), 'total_games'],
      [sequelize.fn('sum', sequelize.col('points')), 'total_points'],
      [
        sequelize.fn('sum', sequelize.col('goals_scored')),
        'total_goals_scored',
      ],
      [
        sequelize.fn('sum', sequelize.col('goals_conceded')),
        'total_goals_conceded',
      ],
      [
        sequelize.fn('sum', sequelize.col('goal_difference')),
        'total_goal_difference',
      ],
      [sequelize.literal(`(count(*) filter (where win))`), 'total_wins'],
      [sequelize.literal(`(count(*) filter (where draw))`), 'total_draws'],
      [sequelize.literal(`(count(*) filter (where lost))`), 'total_lost'],
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
      ['total_points', 'DESC'],
      ['total_goal_difference', 'DESC'],
      ['total_goals_scored', 'DESC'],
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
      [sequelize.fn('count', sequelize.col('team_game_id')), 'total_games'],
      [sequelize.fn('sum', sequelize.col('points')), 'total_points'],
      [
        sequelize.fn('sum', sequelize.col('goals_scored')),
        'total_goals_scored',
      ],
      [
        sequelize.fn('sum', sequelize.col('goals_conceded')),
        'total_goals_conceded',
      ],
      [
        sequelize.fn('sum', sequelize.col('goal_difference')),
        'total_goal_difference',
      ],
      [sequelize.literal(`(count(*) filter (where win))`), 'total_wins'],
      [sequelize.literal(`(count(*) filter (where draw))`), 'total_draws'],
      [sequelize.literal(`(count(*) filter (where lost))`), 'total_lost'],
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
      ['total_points', 'DESC'],
      ['total_goal_difference', 'DESC'],
      ['total_goals_scored', 'DESC'],
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
      [sequelize.fn('count', sequelize.col('team_game_id')), 'total_games'],
      [sequelize.fn('sum', sequelize.col('points')), 'total_points'],
      [
        sequelize.fn('sum', sequelize.col('goals_scored')),
        'total_goals_scored',
      ],
      [
        sequelize.fn('sum', sequelize.col('goals_conceded')),
        'total_goals_conceded',
      ],
      [
        sequelize.fn('sum', sequelize.col('goal_difference')),
        'total_goal_difference',
      ],
      [sequelize.literal(`(count(*) filter (where win))`), 'total_wins'],
      [sequelize.literal(`(count(*) filter (where draw))`), 'total_draws'],
      [sequelize.literal(`(count(*) filter (where lost))`), 'total_lost'],
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
      ['total_points', 'DESC'],
      ['total_goal_difference', 'DESC'],
      ['total_goals_scored', 'DESC'],
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
where team = any($team_array) and category = any(array['quarter','semi','final']) and season_id >= 25
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
where team = any($team_array) and category = any(array['quarter','semi','final'])
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
    where: { playoff: true },
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
    attributes: [
      'team',
      'group',
      'women',
      'category',
      [sequelize.fn('count', sequelize.col('team_game_id')), 'total_games'],
      [sequelize.fn('sum', sequelize.col('points')), 'total_points'],
      [
        sequelize.fn('sum', sequelize.col('goals_scored')),
        'total_goals_scored',
      ],
      [
        sequelize.fn('sum', sequelize.col('goals_conceded')),
        'total_goals_conceded',
      ],
      [
        sequelize.fn('sum', sequelize.col('goal_difference')),
        'total_goal_difference',
      ],
      [sequelize.literal(`(count(*) filter (where win))`), 'total_wins'],
      [sequelize.literal(`(count(*) filter (where draw))`), 'total_draws'],
      [sequelize.literal(`(count(*) filter (where lost))`), 'total_lost'],
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
      ['total_points', 'DESC'],
      ['total_goal_difference', 'DESC'],
      ['total_goals_scored', 'DESC'],
    ],
  })

  const hemmaTabell = await TeamGame.findAll({
    where: { homeGame: true },
    attributes: [
      'team',
      'group',
      'women',
      'category',
      [sequelize.fn('count', sequelize.col('team_game_id')), 'total_games'],
      [sequelize.fn('sum', sequelize.col('points')), 'total_points'],
      [
        sequelize.fn('sum', sequelize.col('goals_scored')),
        'total_goals_scored',
      ],
      [
        sequelize.fn('sum', sequelize.col('goals_conceded')),
        'total_goals_conceded',
      ],
      [
        sequelize.fn('sum', sequelize.col('goal_difference')),
        'total_goal_difference',
      ],
      [sequelize.literal(`(count(*) filter (where win))`), 'total_wins'],
      [sequelize.literal(`(count(*) filter (where draw))`), 'total_draws'],
      [sequelize.literal(`(count(*) filter (where lost))`), 'total_lost'],
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
      ['total_points', 'DESC'],
      ['total_goal_difference', 'DESC'],
      ['total_goals_scored', 'DESC'],
    ],
  })

  const bortaTabell = await TeamGame.findAll({
    where: { homeGame: false },
    attributes: [
      'team',
      'group',
      'women',
      'category',
      [sequelize.fn('count', sequelize.col('team_game_id')), 'total_games'],
      [sequelize.fn('sum', sequelize.col('points')), 'total_points'],
      [
        sequelize.fn('sum', sequelize.col('goals_scored')),
        'total_goals_scored',
      ],
      [
        sequelize.fn('sum', sequelize.col('goals_conceded')),
        'total_goals_conceded',
      ],
      [
        sequelize.fn('sum', sequelize.col('goal_difference')),
        'total_goal_difference',
      ],
      [sequelize.literal(`(count(*) filter (where win))`), 'total_wins'],
      [sequelize.literal(`(count(*) filter (where draw))`), 'total_draws'],
      [sequelize.literal(`(count(*) filter (where lost))`), 'total_lost'],
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
      ['total_points', 'DESC'],
      ['total_goal_difference', 'DESC'],
      ['total_goals_scored', 'DESC'],
    ],
  })

  //   const roundByRoundTables = await sequelize.query(
  //     `with win_draw_lost_values as (
  // select
  // 	team,
  // 	case when win = true then 1 else 0 end as win_var,
  // 	case when draw = true then 1 else 0 end as draw_var,
  // 	case when lost = true then 1 else 0 end as lost_var,
  // 	win,
  // 	draw,
  // 	lost,
  // 	"date",
  // 	points,
  // 	goals_scored,
  // 	goals_conceded,
  // 	goal_difference,
  //   "group",
  // 	"year",
  // 	teamgames.women as womens_table
  // from teamgames
  // join seasons on teamgames.season_id = seasons.season_id
  // where "year" = $season_name and category = 'regular' and played = true),

  // round_selection as (
  // select
  // 	team,
  // 	win,
  // 	"date",
  // 	womens_table,
  //   "group",
  // 	sum(win_var) over (partition by team, "group" order by date) sum_wins,
  // 	sum(draw_var) over (partition by team, "group" order by date) sum_draws,
  // 	sum(lost_var) over (partition by team, "group" order by date) sum_lost,
  // 	sum(goals_scored) over (partition by team, "group" order by date) sum_goals_scored,
  // 	sum(goals_conceded) over (partition by team, "group" order by date) sum_goals_conc,
  // 	sum(points) over (partition by team, "group" order by date) sum_points,
  // 	sum(goal_difference) over (partition by team, "group" order by date) sum_gd,
  // 	row_number() over (partition by team, "group" order by date) round
  // from win_draw_lost_values)

  // select
  // 	team,
  //   casual_name,
  //   short_name,
  // 	womens_table,
  // 	sum_wins,
  // 	sum_draws,
  // 	sum_lost,
  // 	sum_goals_scored,
  // 	sum_goals_conc,
  // 	sum_points,
  // 	sum_gd,
  // 	round,
  //   "group",
  // 	rank() over (partition by womens_table, "group", round order by sum_points desc, sum_gd desc, sum_goals_scored desc, team) "rank_position"
  // from round_selection
  // join teams
  // on teams.team_id = round_selection.team
  // order by "group",team, round asc;`,
  //     { bind: { season_name: seasonName }, type: QueryTypes.SELECT }
  //   )

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
