import {
  Router,
  Request,
  Response,
  NextFunction,
  RequestHandler,
} from 'express'
import { sequelize } from '../../utils/db.js'
import { Op } from 'sequelize'
import TeamGame from '../../models/TeamGame.js'
import Game from '../../models/Game.js'
import Team from '../../models/Team.js'
import Season from '../../models/Season.js'
import Serie from '../../models/Serie.js'
import seasonIdCheck from '../../utils/postFunctions/seasonIdCheck.js'
import {
  leagueTable,
  miniTableItemArray,
} from '../../utils/responseTypes/tableTypes.js'
import { leagueTableParser } from '../../utils/postFunctions/leagueTableParser.js'

type BonusPoints = {
  [key: string]: number
}

const leagueTableRouter = Router()

leagueTableRouter.get('/:seasonId', (async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  const seasonYear = seasonIdCheck.parse(req.params.seasonId)

  const getTeamArray = await TeamGame.findAll({
    where: { playoff: false },
    include: [
      {
        model: Season,
        where: { year: { [Op.eq]: seasonYear } },
        attributes: ['year', 'seasonId'],
      },
      {
        model: Team,
        attributes: ['name', 'teamId', 'casualName', 'shortName'],
        as: 'lag',
      },
    ],
    attributes: [
      [sequelize.literal('DISTINCT (team)'), 'team'],
      'group',
      'category',
      'women',
    ],
    group: [
      'group',
      'team',
      'category',
      'lag.name',
      'lag.team_id',
      'lag.casual_name',
      'lag.short_name',
      'season.season_id',
      'season.year',
      'teamgame.women',
    ],
    raw: true,
    nest: true,
  })

  const teamArray = miniTableItemArray.parse(getTeamArray)

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
        where: { year: { [Op.eq]: seasonYear } },
        attributes: ['year', 'seasonId'],
      },
    ],
    order: [
      ['group', 'ASC'],
      ['date', 'ASC'],
    ],
  })

  const getTable = await TeamGame.findAll({
    where: { played: true },
    attributes: [
      'team',
      'group',
      'women',
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
        model: Season,
        attributes: ['seasonId', 'year'],
        where: { year: { [Op.eq]: seasonYear } },
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
    raw: true,
    nest: true,
  })

  const parsedTable = leagueTable.parse(getTable)

  const tabell = leagueTableParser(teamArray, parsedTable)

  const getHomeTable = await TeamGame.findAll({
    where: { homeGame: true, played: true },
    attributes: [
      'team',
      'group',
      'women',
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
        model: Season,
        attributes: ['seasonId', 'year'],
        where: { year: { [Op.eq]: seasonYear } },
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
    raw: true,
    nest: true,
  })

  const parsedHomeTable = leagueTable.parse(getHomeTable)

  const hemmaTabell = leagueTableParser(teamArray, parsedHomeTable)

  const getAwayTable = await TeamGame.findAll({
    where: { homeGame: false, played: true },
    attributes: [
      'team',
      'group',
      'women',
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
        model: Season,
        attributes: ['seasonId', 'year'],
        where: { year: { [Op.eq]: seasonYear } },
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
    raw: true,
    nest: true,
  })

  const parsedAwayTable = leagueTable.parse(getAwayTable)

  const bortaTabell = leagueTableParser(teamArray, parsedAwayTable)

  const series = await Serie.findAll({
    where: { serieCategory: 'regular' },
    include: [{ model: Season, where: { year: seasonYear } }],
    raw: true,
    nest: true,
  })

  const seriesWithBonusPoints = series.find(
    (serie) => serie.bonusPoints !== null
  )

  if (seriesWithBonusPoints) {
    const bonusPointsObject = JSON.parse(
      seriesWithBonusPoints.bonusPoints
    ) as BonusPoints

    const updatedTable = tabell.map((table) => {
      return table.group === seriesWithBonusPoints.serieGroupCode &&
        table.women === seriesWithBonusPoints.season.women
        ? {
            ...table,
            totalPoints:
              table.totalPoints + bonusPointsObject[table.team.toString()],
          }
        : table
    })

    return res
      .status(200)
      .json({ tabell: updatedTable, hemmaTabell, bortaTabell, playoffGames })
  }

  if (seasonYear && ['1933', '1937'].includes(seasonYear)) {
    const games = await TeamGame.findAll({
      where: {
        group: {
          [Op.startsWith]: seasonYear === '1933' ? 'Div' : 'Avd',
        },
        [Op.not]: {
          opponent: seasonYear === '1933' ? [5, 31, 57, 29] : [5, 64, 57, 17],
        },
      },
      include: [
        {
          model: Season,
          attributes: ['seasonId', 'year'],
          where: { year: { [Op.eq]: seasonYear } },
        },
      ],
      raw: true,
      nest: true,
    })

    games.forEach((game) => {
      const tableIndex = tabell.findIndex(
        (table) =>
          table.team === game.team && table.group.includes('Nedflyttning')
      )

      if (tableIndex === -1) return

      tabell[tableIndex].totalGames = tabell[tableIndex].totalGames + 1
      tabell[tableIndex].totalWins =
        tabell[tableIndex].totalWins + (game.win ? 1 : 0)
      tabell[tableIndex].totalDraws =
        tabell[tableIndex].totalDraws + (game.draw ? 1 : 0)
      tabell[tableIndex].totalLost =
        tabell[tableIndex].totalLost + (game.lost ? 1 : 0)
      tabell[tableIndex].totalGoalsScored =
        tabell[tableIndex].totalGoalsScored + game.goalsScored
      tabell[tableIndex].totalGoalsConceded =
        tabell[tableIndex].totalGoalsConceded + game.goalsConceded
      tabell[tableIndex].totalGoalDifference =
        tabell[tableIndex].totalGoalDifference + game.goalDifference
      tabell[tableIndex].totalPoints =
        tabell[tableIndex].totalPoints + game.points
    })

    const homeGames = games.filter((game) => game.homeGame === true)

    homeGames.forEach((game) => {
      const tableIndex = hemmaTabell.findIndex(
        (table) =>
          table.team === game.team && table.group.includes('Nedflyttning')
      )

      if (tableIndex === -1) return

      hemmaTabell[tableIndex].totalGames =
        hemmaTabell[tableIndex].totalGames + 1
      hemmaTabell[tableIndex].totalWins =
        hemmaTabell[tableIndex].totalWins + (game.win ? 1 : 0)
      hemmaTabell[tableIndex].totalDraws =
        hemmaTabell[tableIndex].totalDraws + (game.draw ? 1 : 0)
      hemmaTabell[tableIndex].totalLost =
        hemmaTabell[tableIndex].totalLost + (game.lost ? 1 : 0)
      hemmaTabell[tableIndex].totalGoalsScored =
        hemmaTabell[tableIndex].totalGoalsScored + game.goalsScored
      hemmaTabell[tableIndex].totalGoalsConceded =
        hemmaTabell[tableIndex].totalGoalsConceded + game.goalsConceded
      hemmaTabell[tableIndex].totalGoalDifference =
        hemmaTabell[tableIndex].totalGoalDifference + game.goalDifference
      hemmaTabell[tableIndex].totalPoints =
        hemmaTabell[tableIndex].totalPoints + game.points
    })

    const awayGames = games.filter((game) => game.homeGame === false)

    awayGames.forEach((game) => {
      const tableIndex = bortaTabell.findIndex(
        (table) =>
          table.team === game.team && table.group.includes('Nedflyttning')
      )

      if (tableIndex === -1) return

      bortaTabell[tableIndex].totalGames =
        bortaTabell[tableIndex].totalGames + 1
      bortaTabell[tableIndex].totalWins =
        bortaTabell[tableIndex].totalWins + (game.win ? 1 : 0)
      bortaTabell[tableIndex].totalDraws =
        bortaTabell[tableIndex].totalDraws + (game.draw ? 1 : 0)
      bortaTabell[tableIndex].totalLost =
        bortaTabell[tableIndex].totalLost + (game.lost ? 1 : 0)
      bortaTabell[tableIndex].totalGoalsScored =
        bortaTabell[tableIndex].totalGoalsScored + game.goalsScored
      bortaTabell[tableIndex].totalGoalsConceded =
        bortaTabell[tableIndex].totalGoalsConceded + game.goalsConceded
      bortaTabell[tableIndex].totalGoalDifference =
        bortaTabell[tableIndex].totalGoalDifference + game.goalDifference
      bortaTabell[tableIndex].totalPoints =
        bortaTabell[tableIndex].totalPoints + game.points
    })

    return res.status(200).json({
      tabell,
      hemmaTabell,
      bortaTabell,
      playoffGames,
    })
  }

  res
    .status(200)
    .json({ tabell, hemmaTabell, bortaTabell, playoffGames, teamArray })
}) as RequestHandler)

export default leagueTableRouter
