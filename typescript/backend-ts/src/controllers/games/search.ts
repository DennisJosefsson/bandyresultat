import {
  Router,
  Request,
  Response,
  NextFunction,
  RequestHandler,
} from 'express'
import { sequelize } from '../../utils/db.js'
import { Op, Order } from 'sequelize'
import TeamGame from '../../models/TeamGame'
import Team from '../../models/Team'
import Season from '../../models/Season'
import Link from '../../models/Link.js'
import Game from '../../models/Game.js'
import NotFoundError from '../../utils/middleware/errors/NotFoundError.js'
import { searchRequest } from '../../utils/postFunctions/gameRequest'
import seasonIdCheck from '../../utils/postFunctions/seasonIdCheck.js'
import dayjs from 'dayjs'

const searchRouter = Router()

searchRouter.post('/search', (async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  res.locals.origin = 'POST Search router'

  const searchString = JSON.stringify(req.body)
  const searchParams = searchRequest.parse(req.body)

  let goalDifference
  let goalsScored
  let goalsConceded
  let inputDate
  let homeGame
  let team
  let opponent
  let win
  let draw
  let lost
  let women

  let limit = searchParams.limit

  const startSeasonName = seasonIdCheck.parse(req.body.startSeason)
  const endSeasonName = seasonIdCheck.parse(req.body.endSeason)

  const defaultInclude = [
    {
      model: Team,
      attributes: ['name', 'casualName', 'shortName'],
      as: 'lag',
    },
    {
      model: Team,
      attributes: ['name', 'casualName', 'shortName'],
      as: 'opp',
    },
    { model: Game, attributes: ['result'] },
    {
      model: Season,
      where: {
        year: {
          [Op.and]: {
            [Op.gte]: startSeasonName,
            [Op.lte]: endSeasonName,
          },
        },
      },
      attributes: ['year', 'seasonId'],
    },
  ]

  const order: Order = [['date', searchParams.order]]

  if (searchParams.team) {
    team = searchParams.team
  }

  if (searchParams.opponent) {
    opponent = searchParams.opponent
  }

  if (searchParams.inputDate) {
    const date =
      '2024-' +
      searchParams.inputDate.split('/')[1] +
      '-' +
      searchParams.inputDate.split('/')[0]

    if (!dayjs(date, 'YYYY-M-D', true).isValid()) {
      return res.json({ status: 400, message: 'Felaktigt datum' })
    } else {
      const month = date.split('-')[1]
      const day = date.split('-')[2]
      inputDate = [
        sequelize.fn('extract(month from game."date") =', month),
        sequelize.fn('extract(day from game."date") =', day),
      ]
    }
  }

  if (searchParams.goalDiff) {
    if (searchParams.goalDiffOperator === 'gte') {
      goalDifference = { [Op.gte]: searchParams.goalDiff }
    } else if (searchParams.goalDiffOperator === 'eq') {
      goalDifference = { [Op.eq]: searchParams.goalDiff }
    } else if (searchParams.goalDiffOperator === 'lte') {
      goalDifference = {
        [Op.and]: { [Op.lte]: searchParams.goalDiff, [Op.gte]: 0 },
      }
    }
  }

  if (searchParams.goalsScored) {
    if (searchParams.goalsScoredOperator === 'gte') {
      goalsScored = { [Op.gte]: searchParams.goalsScored }
    } else if (searchParams.goalsScoredOperator === 'eq') {
      goalsScored = { [Op.eq]: searchParams.goalsScored }
    } else if (searchParams.goalsScoredOperator === 'lte') {
      goalsScored = {
        [Op.and]: { [Op.lte]: searchParams.goalsScored, [Op.gte]: 0 },
      }
    }
  }

  if (searchParams.goalsConceded) {
    if (searchParams.goalsConcededOperator === 'gte') {
      goalsConceded = { [Op.gte]: searchParams.goalsConceded }
    } else if (searchParams.goalsConcededOperator === 'eq') {
      goalsConceded = { [Op.eq]: searchParams.goalsConceded }
    } else if (searchParams.goalsConcededOperator === 'lte') {
      goalsConceded = {
        [Op.and]: { [Op.lte]: searchParams.goalsConceded, [Op.gte]: 0 },
      }
    }
  }

  if (searchParams.orderVar === 'goalDifference' && searchParams.order) {
    order.unshift(['goalDifference', searchParams.order])
  }

  if (searchParams.orderVar === 'totalGoals' && searchParams.order) {
    order.unshift(['totalGoals', searchParams.order])
  }

  if (searchParams.orderVar === 'goalsScored' && searchParams.order) {
    order.unshift(['goalsScored', searchParams.order])
  }

  if (searchParams.orderVar === 'goalsConceded' && searchParams.order) {
    order.unshift(['goalsConceded', searchParams.order])
  }

  if (searchParams.homeGame === 'home') {
    homeGame = true
  }

  if (searchParams.homeGame === 'away') {
    homeGame = false
  }

  if (searchParams.gameResult === 'win') {
    win = true
  }

  if (searchParams.gameResult === 'draw') {
    draw = true
  }

  if (searchParams.gameResult === 'lost') {
    lost = true
  }

  if (searchParams.selectedGender === 'men' && !searchParams.team) {
    women = false
  }

  if (searchParams.selectedGender === 'women' && !searchParams.team) {
    women = true
  }
  let resultGame
  if (searchParams.result && searchParams.team) {
    goalsScored = Number(searchParams.result.split('-')[0])
    goalsConceded = Number(searchParams.result.split('-')[1])
  } else if (searchParams.result) {
    resultGame = {
      model: Game,
      where: { result: searchParams.result },
      attributes: ['result'],
    }
  }

  if (
    (!searchParams.team && searchParams.result) ||
    (!searchParams.team && searchParams.gameResult === 'draw') ||
    (!searchParams.team && searchParams.orderVar === 'totalGoals') ||
    (searchParams.goalDiff && searchParams.goalDiff === 0)
  ) {
    limit = searchParams.limit * 2 || 20
  }

  const include = resultGame
    ? [
        {
          model: Team,
          attributes: ['name', 'casualName', 'shortName'],
          as: 'lag',
        },
        {
          model: Team,
          attributes: ['name', 'casualName', 'shortName'],
          as: 'opp',
        },
        resultGame,
        {
          model: Season,
          where: {
            year: {
              [Op.and]: {
                [Op.gte]: startSeasonName,
                [Op.lte]: endSeasonName,
              },
            },
          },
          attributes: ['year', 'seasonId'],
        },
      ]
    : defaultInclude

  const where = {
    category: searchParams.categoryArray,
    played: true,
    ...(inputDate && { [Op.and]: inputDate }),
    ...(team && { team: team }),
    ...(opponent && { opponent: opponent }),
    ...(goalDifference && { goalDifference: goalDifference }),
    ...(goalsScored && { goalsScored: goalsScored }),
    ...(goalsConceded && { goalsConceded: goalsConceded }),
    ...(win && { win: win }),
    ...(draw && { draw: draw }),
    ...(lost && { lost: lost }),
    ...(women && { women: women }),
    ...(homeGame && { homeGame: homeGame }),
  }

  const searchResult = await TeamGame.findAndCountAll({
    where,
    include,
    limit,
    order,
  })

  const link = await Link.findOrCreate({
    where: { searchString: searchString, origin: 'search' },
  })

  if (searchResult.count === 0) {
    throw new NotFoundError({
      code: 404,
      message: 'Hittade ingen match som matchade sökningen.',
      logging: false,
      context: { origin: 'POST Search Router' },
    })
  } else {
    res.status(200).json({
      hits: searchResult.count,
      searchResult: searchResult.rows,
      searchLink: link,
    })
  }
}) as RequestHandler)

export default searchRouter
