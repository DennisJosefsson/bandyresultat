import {
  Router,
  Request,
  Response,
  NextFunction,
  RequestHandler,
} from 'express'
import { Op, QueryTypes } from 'sequelize'
import { sequelize } from '../../utils/db.js'
import Season from '../../models/Season.js'
import TeamGame from '../../models/TeamGame.js'
import Team from '../../models/Team.js'
import Link from '../../models/Link.js'
import { compareObject } from '../../utils/postFunctions/compareRequest.js'
import {
  compareAllTeamTables,
  compareCategoryTeamTables,
} from '../../utils/responseTypes/tableTypes.js'
import NotFoundError from '../../utils/middleware/errors/NotFoundError.js'

const compareRouter = Router()

compareRouter.post('/compare', (async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  res.locals.origin = 'POST Compare router'
  const { teamArray, categoryArray, startSeason, endSeason } =
    compareObject.parse(req.body)
  const searchString = JSON.stringify(req.body)

  const seasonNames = await Season.findAll({
    where: { seasonId: { [Op.in]: [startSeason, endSeason] } },
    attributes: ['seasonId', 'year'],
  })

  const getCatTables = await TeamGame.findAll({
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
      [sequelize.fn('count', sequelize.col('team_game_id')), 'totalGames'],
      [sequelize.fn('sum', sequelize.col('points')), 'totalPoints'],
      [sequelize.fn('sum', sequelize.col('goals_scored')), 'totalGoalsScored'],
      [
        sequelize.fn('sum', sequelize.col('goals_conceded')),
        'totalGoalsConceded',
      ],
      [
        sequelize.fn('sum', sequelize.col('goal_difference')),
        'totalGoalDifference',
      ],
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
    raw: true,
    nest: true,
  })

  if (!getCatTables || getCatTables.length === 0) {
    throw new NotFoundError({
      code: 404,
      message: 'Lagen har inte spelat mot varandra.',
      logging: false,
      context: { origin: 'Compare teams Router' },
    })
  }

  const tabeller = compareCategoryTeamTables.parse(getCatTables)

  const getCompareAllGames = await TeamGame.findAll({
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
      [sequelize.fn('count', sequelize.col('team_game_id')), 'totalGames'],
      [sequelize.fn('sum', sequelize.col('points')), 'totalPoints'],
      [sequelize.fn('sum', sequelize.col('goals_scored')), 'totalGoalsScored'],
      [
        sequelize.fn('sum', sequelize.col('goals_conceded')),
        'totalGoalsConceded',
      ],
      [
        sequelize.fn('sum', sequelize.col('goal_difference')),
        'totalGoalDifference',
      ],
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
    raw: true,
    nest: true,
  })

  const compareAllGames = compareAllTeamTables.parse(getCompareAllGames)

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

  res.status(200).json({
    tabeller,
    compareAllGames,
    golds,
    playoffs,
    seasons,
    allPlayoffs,
    allSeasons,
    firstAndLatestGames,
    link: link,
    seasonNames,
  })
}) as RequestHandler)

export default compareRouter
