import {
  Router,
  Request,
  Response,
  NextFunction,
  RequestHandler,
} from 'express'
import { sequelize } from '../../utils/db.js'
import { Op, Order } from 'sequelize'
import TeamGame from '../../models/TeamGame.js'
import Team from '../../models/Team.js'
import Season from '../../models/Season.js'
import Link from '../../models/Link.js'
import Game from '../../models/Game.js'
import NotFoundError from '../../utils/middleware/errors/NotFoundError.js'
import SearchError from '../../utils/middleware/errors/SearchError.js'
import { searchRequest } from '../../utils/postFunctions/gameRequest.js'
import seasonIdCheck from '../../utils/postFunctions/seasonIdCheck.js'
import dayjs from 'dayjs'

const searchRouter = Router()

searchRouter.post('/search', (async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  res.locals.origin = 'POST Search router'
  console.log(req.body)
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

  if (searchParams.team && searchParams.team) {
    team = searchParams.team
  }

  if (searchParams.opponent && searchParams.opponent) {
    opponent = searchParams.opponent
  }

  if (searchParams.inputDate) {
    const month = searchParams.inputDate.split('/')[1]
    const day = searchParams.inputDate.split('/')[0]
    if (month === '2' && Number(day) > 29) {
      throw new SearchError({
        code: 400,
        message: 'Felaktigt datum:' + searchParams.inputDate,
        logging: false,
        context: { origin: 'POST Search Router' },
      })
    } else if (['4', '6', '9', '11'].includes(month) && Number(day) > 30) {
      throw new SearchError({
        code: 400,
        message: 'Felaktigt datum: ' + searchParams.inputDate,
        logging: false,
        context: { origin: 'POST Search Router' },
      })
    }
    const date = '2024-' + month + '-' + day

    if (!dayjs(date, 'YYYY-M-D', true).isValid()) {
      throw new SearchError({
        code: 400,
        message: 'Felaktigt datum: ' + searchParams.inputDate,
        logging: false,
        context: { origin: 'POST Search Router' },
      })
    } else {
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

  const unfilteredSearchResult = await TeamGame.findAndCountAll({
    where,
    include,
    limit: 100,
    order,
    raw: true,
    nest: true,
  })

  if (unfilteredSearchResult.count === 0) {
    throw new NotFoundError({
      code: 404,
      message: 'Hittade ingen match som matchade sökningen.',
      logging: false,
      context: { origin: 'POST Search Router' },
    })
  }

  console.log('limit', searchParams.limit)

  const gameIdArray: number[] = []

  const searchResult = unfilteredSearchResult.rows
    .map((game) => {
      if (!gameIdArray.includes(game.gameId)) {
        gameIdArray.push(game.gameId)
        return game
      }
      return
    })
    .filter((game) => game !== undefined)
    .slice(0, searchParams.limit)

  const link = await Link.findOrCreate({
    where: { searchString: searchString, origin: 'search' },
  })

  res.status(200).json({
    searchResult,
    searchLink: link,
  })
}) as RequestHandler)

export default searchRouter
