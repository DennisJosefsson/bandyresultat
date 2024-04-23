import BadRequestError from '../middleware/errors/BadRequestError.js'

type Result = { result: string; homeGoal: number; awayGoal: number }
type TeamId = { homeTeamId: number; awayTeamId: number }

const isArrayOfNumbers = (x: unknown): x is number[] => {
  return Array.isArray(x) && x.every((y) => typeof y === 'number')
}

const isBool = (bool: unknown): bool is boolean => {
  return typeof bool === 'boolean' || bool instanceof Boolean
}

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String
}

const isNumber = (num: unknown): num is number => {
  return typeof num === 'number' || num instanceof Number
}

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date))
}

export const parseString = (text: unknown): string => {
  if (!text || !isString(text)) {
    throw new BadRequestError({
      code: 400,
      message: 'Incorrect or missing string property',
      logging: true,
      context: { origin: 'ParseString' },
    })
  }

  return text
}

export const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new BadRequestError({
      code: 400,
      message: 'Incorrect or missing date: ' + date,
      logging: true,
      context: { origin: 'ParseDate' },
    })
  }
  return date
}

export const parseNumber = (num: unknown): number => {
  if (!isNumber(num)) {
    throw new BadRequestError({
      code: 400,
      message: 'Incorrect or missing number property',
      logging: true,
      context: { origin: 'ParseNumber' },
    })
  }
  return num
}

export const parseBool = (bool: unknown): boolean => {
  if (!isBool(bool)) {
    throw new BadRequestError({
      code: 400,
      message: 'Incorrect or missing boolean property',
      logging: true,
      context: { origin: 'ParseBool' },
    })
  }
  return bool
}

export const parseLatLong = (
  object: unknown,
  prop: string
): number | undefined => {
  if (!object) {
    return
  }
  if (typeof object !== 'object') {
    throw new BadRequestError({
      code: 400,
      message: 'Incorrect or missing latAndLong object',
      logging: true,
      context: { origin: 'ParseLatLong' },
    })
  }
  if (
    ('lat' in object && !('long' in object)) ||
    ('long' in object && !('lat' in object))
  ) {
    throw new BadRequestError({
      code: 400,
      message: 'Incorrect lat and long object',
      logging: true,
      context: { origin: 'ParseLatLong' },
    })
  } else if ('lat' in object && 'long' in object && prop === 'lat') {
    return parseNumber(object.lat)
  } else if ('lat' in object && 'long' in object && prop === 'long') {
    return parseNumber(object.long)
  }
}

export const parseWomen = (object: unknown): boolean => {
  if (!object) {
    return false
  }
  if (typeof object !== 'object') {
    throw new BadRequestError({
      code: 400,
      message: 'Incorrect or missing object',
      logging: true,
      context: { origin: 'ParseWomen' },
    })
  }
  if ('women' in object) return parseBool(object.women)
  return false
}

export const parseOptionalString = (object: unknown): string | undefined => {
  if (!object) {
    return undefined
  }
  if (typeof object !== 'object') {
    throw new BadRequestError({
      code: 400,
      message: 'Incorrect or missing object',
      logging: true,
      context: { origin: 'ParseOptionalString' },
    })
  }
  if ('seasonStructure' in object) return parseString(object.seasonStructure)
  if ('bonusPoints' in object) return parseString(object.bonusPoints)
  return undefined
}

export const parseTableId = (object: unknown): number | undefined => {
  if (!object) {
    return undefined
  }
  if (typeof object !== 'object') {
    throw new BadRequestError({
      code: 400,
      message: 'Incorrect value tableId',
      logging: true,
      context: { origin: 'ParseTableId' },
    })
  }
  if ('tableId' in object) return parseNumber(object.tableId)
  return undefined
}

export const parseSerieComment = (object: unknown): string | undefined => {
  if (!object) return undefined
  if (typeof object !== 'object') {
    throw new BadRequestError({
      code: 400,
      message: 'Incorrect value SerieComment',
      logging: true,
      context: { origin: 'ParseSerieComment' },
    })
  }
  if ('comment' in object) return parseString(object.comment)
  return undefined
}

export const parseSerieStructure = (object: unknown): number[] | undefined => {
  if (!object) return undefined
  if (typeof object !== 'object') {
    throw new BadRequestError({
      code: 400,
      message: 'Incorrect value SerieStructure',
      logging: true,
      context: { origin: 'ParseSerieStructure' },
    })
  }
  if ('serieStructure' in object && isArrayOfNumbers(object.serieStructure))
    return object.serieStructure
  else if (
    'serieStructure' in object &&
    !isArrayOfNumbers(object.serieStructure)
  ) {
    throw new BadRequestError({
      code: 400,
      message: 'Incorrect value SerieStructure',
      logging: true,
      context: { origin: 'ParseSerieStructure' },
    })
  }
  return undefined
}

export const parseResult = (
  object: unknown,
  origin: string
): Result | undefined => {
  if (!object) return undefined
  if (typeof object !== 'object') {
    throw new BadRequestError({
      code: 400,
      message: 'Incorrect value Result',
      logging: true,
      context: { origin: 'ParseResult' },
    })
  }
  if (origin === 'fulltime') {
    if ('result' in object) {
      const stringResult = parseString(object.result)
      if (!stringResult.match(/\d{1,2}-\d{1,2}/gm)) {
        throw new BadRequestError({
          code: 400,
          message: 'Wrong fulltime result format',
          logging: true,
          context: { origin: 'ParseResult' },
        })
      }
      const homeGoal = Number(stringResult.split('-')[0])
      const awayGoal = Number(stringResult.split('-')[1])

      if (!isNaN(homeGoal) && !isNaN(awayGoal)) {
        return {
          result: parseString(object.result),
          homeGoal: homeGoal,
          awayGoal: awayGoal,
        }
      }
    }
  }

  if (origin === 'halftime') {
    if ('halftimeResult' in object) {
      const stringResult = parseString(object.halftimeResult)
      if (!stringResult.match(/\d{1,2}-\d{1,2}/gm)) {
        throw new BadRequestError({
          code: 400,
          message: 'Wrong halftime result format',
          logging: true,
          context: { origin: 'ParseResult' },
        })
      }
      const homeGoal = Number(stringResult.split('-')[0])
      const awayGoal = Number(stringResult.split('-')[1])

      if (!isNaN(homeGoal) && !isNaN(awayGoal)) {
        return {
          result: parseString(object.halftimeResult),
          homeGoal: homeGoal,
          awayGoal: awayGoal,
        }
      }
    }
  }

  throw new BadRequestError({
    code: 400,
    message: 'Incorrect value Result',
    logging: true,
    context: { origin: 'ParseResult' },
  })
}

const getTeamId = (object: unknown): number => {
  if (!object || typeof object !== 'object') {
    throw new BadRequestError({
      code: 400,
      message: 'Incorrect object GetTeamId',
      logging: true,
      context: { origin: 'GetTeamId' },
    })
  }

  if ('value' in object) return parseNumber(object.value)
  throw new BadRequestError({
    code: 400,
    message: 'Missing value GetTeamId',
    logging: true,
    context: { origin: 'GetTeamId' },
  })
}

export const parseGameTeamIds = (object: unknown): TeamId => {
  if (!object || typeof object !== 'object') {
    throw new BadRequestError({
      code: 400,
      message: 'Incorrect value ParseGameTeamIds',
      logging: true,
      context: { origin: 'ParseGameTeamIds' },
    })
  }

  if (
    typeof object === 'object' &&
    'homeTeamId' in object &&
    'awayTeamId' in object
  ) {
    return {
      homeTeamId: getTeamId(object['homeTeamId']),
      awayTeamId: getTeamId(object['awayTeamId']),
    }
  }

  throw new BadRequestError({
    code: 400,
    message: 'Missing value ParseGameTeamIds',
    logging: true,
    context: { origin: 'ParseGameTeamIds' },
  })
}
