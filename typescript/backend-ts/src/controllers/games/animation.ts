import {
  Router,
  Request,
  Response,
  NextFunction,
  RequestHandler,
} from 'express'
import { Op } from 'sequelize'
import Season from '../../models/Season.js'
import Game from '../../models/Game.js'
import Team from '../../models/Team.js'
import Serie from '../../models/Serie.js'
import NotFoundError from '../../utils/middleware/errors/NotFoundError.js'
import seasonIdCheck from '../../utils/postFunctions/seasonIdCheck.js'
//import TeamSeason from '../../models/TeamSeason.js'
import {
  gameSortFunction,
  animationData,
} from '../../utils/postFunctions/animationData.js'

const animationRouter = Router()

animationRouter.get('/animation/:seasonId', (async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  const seasonYear = seasonIdCheck.parse(req.params.seasonId)
  const parsedSeasonId = parseInt(req.params.seasonId)

  const series = await Serie.findAll({
    where: { serieCategory: 'regular' },
    include: [{ model: Season, where: { year: seasonYear } }],
    raw: true,
    nest: true,
  })

  const teams = await Team.findAll({
    where: {
      '$seasonteam.year$': seasonYear,
      '$seasonteam.teamseason.qualification$': { [Op.not]: true },
    },
    include: [
      {
        model: Season,
        as: 'seasonteam',
      },
    ],
    raw: true,
    nest: true,
  })

  const games = await Game.findAll({
    where: { category: 'regular' },
    include: [
      {
        model: Season,
        where: { year: { [Op.eq]: seasonYear } },
      },
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
    ],
    order: [
      ['group', 'ASC'],
      ['date', 'ASC'],
    ],
    raw: true,
    nest: true,
  })
  if (!games || games.length === 0) {
    throw new NotFoundError({
      code: 404,
      message: 'No animation data',
      logging: false,
      context: { origin: 'GET Animation Data Router' },
    })
  }

  const mensTeamArray = teams
    ? teams
        .filter((team) => team.women === false)
        .map((team) => {
          return {
            casualName: team.casualName,
            teamId: team.teamId as number,
          }
        })
    : []

  const womensTeamArray = teams
    ? teams
        .filter((team) => team.women === true)
        .map((team) => {
          return {
            casualName: team.casualName,
            teamId: team.teamId as number,
          }
        })
    : []

  const mensRegularGames = gameSortFunction(
    games
      .filter((team) => team.women === false)
      .filter((game) => game.result !== null)
  )

  const womensRegularGames = gameSortFunction(
    games
      .filter((team) => team.women === true)
      .filter((game) => game.result !== null)
  )

  const mensAnimationArray = animationData(
    mensRegularGames,
    mensTeamArray,
    series.filter((serie) => serie.season.women === false),
    parsedSeasonId
  )

  const mensGameArray = mensRegularGames
    .filter((group) => group.group !== 'mix')
    .map((group) => {
      const animationObject = mensAnimationArray.find(
        (aniGroup) => aniGroup.group === group.group
      )
      if (
        !animationObject ||
        !animationObject.serieName ||
        !animationObject.tables
      ) {
        throw new Error('Missing data from Animation')
      }
      return {
        group: group.group,
        serieName: animationObject.serieName,
        dates: group.dates.map((date) => {
          const tableObject = animationObject.tables.find(
            (tableDate) => tableDate.date === date.date
          )
          if (!tableObject || !tableObject.table) {
            throw new Error('Missing table data from Animation')
          }
          return {
            date: date.date,
            games: [...date.games],
            table: tableObject.table,
          }
        }),
      }
    })

  const womensAnimationArray = animationData(
    womensRegularGames,
    womensTeamArray,
    series.filter((serie) => serie.season.women === true),
    parsedSeasonId
  )

  const womensGameArray = womensRegularGames
    .filter((group) => group.group !== 'mix')
    .map((group) => {
      const animationObject = womensAnimationArray.find(
        (aniGroup) => aniGroup.group === group.group
      )
      if (
        !animationObject ||
        !animationObject.serieName ||
        !animationObject.tables
      ) {
        throw new Error('Missing data from Animation')
      }
      return {
        group: group.group,
        serieName: animationObject.serieName,
        dates: group.dates.map((date) => {
          const tableObject = animationObject.tables.find(
            (tableDate) => tableDate.date === date.date
          )
          if (!tableObject || !tableObject.table) {
            throw new Error('Missing table data from Animation')
          }
          return {
            date: date.date,
            games: [...date.games],
            table: tableObject.table,
          }
        }),
      }
    })
  res.status(200).json([
    {
      women: false,
      games: mensGameArray,
      length: mensGameArray.length,
      series: series.filter((serie) => serie.season.women === false),
    },
    {
      women: true,
      games: womensGameArray,
      length: womensGameArray.length,
      series: series.filter((serie) => serie.season.women === true),
    },
  ])
}) as RequestHandler)

export default animationRouter
