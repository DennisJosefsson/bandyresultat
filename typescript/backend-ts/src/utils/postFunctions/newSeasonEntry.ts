import Season, {
  SeasonAttributes,
  seasonAttributes,
} from '../../models/Season.js'
import Serie from '../../models/Serie.js'

import { z } from 'zod'

const yearString = z
  .string()
  .regex(/^\d{4}\/\d{4}$/)
  .refine((arg) => {
    const yearArray = arg.split('/')
    const yearOne = yearArray[0]
    const yearTwo = yearArray[1]
    if (parseInt(yearTwo) - parseInt(yearOne) !== 1) return false
    return true
  })

const numberParse = z.number()

import BadRequestError from '../middleware/errors/BadRequestError.js'

export const fullNewSeason = (object: unknown) => {
  if (
    !object ||
    typeof object !== 'object' ||
    !('womenSeasonId' in object) ||
    !('menSeasonId' in object) ||
    typeof object.womenSeasonId !== 'number' ||
    typeof object.menSeasonId !== 'number'
  ) {
    throw new BadRequestError({
      code: 400,
      message: 'Incorrect or missing data',
      logging: true,
      context: { origin: 'NewSeriesArray' },
    })
  }

  const womenId = numberParse.parse(object.womenSeasonId)
  const menId = numberParse.parse(object.menSeasonId)

  return [
    {
      seasonId: womenId,
      serieGroupCode: 'final',
      serieCategory: 'final',
      serieName: 'Final',
    },
    {
      seasonId: menId,
      serieGroupCode: 'final',
      serieCategory: 'final',
      serieName: 'Final',
    },
    {
      seasonId: womenId,
      serieGroupCode: 'S1',
      serieCategory: 'semi',
      serieName: 'Semifinal 1',
    },
    {
      seasonId: menId,
      serieGroupCode: 'S1',
      serieCategory: 'semi',
      serieName: 'Semifinal 1',
    },
    {
      seasonId: womenId,
      serieGroupCode: 'S2',
      serieCategory: 'semi',
      serieName: 'Semifinal 2',
    },
    {
      seasonId: menId,
      serieGroupCode: 'S2',
      serieCategory: 'semi',
      serieName: 'Semifinal 2',
    },
    {
      seasonId: womenId,
      serieGroupCode: 'Q1',
      serieCategory: 'quarter',
      serieName: 'Kvartsfinal 1',
    },
    {
      seasonId: menId,
      serieGroupCode: 'Q1',
      serieCategory: 'quarter',
      serieName: 'Kvartsfinal 1',
    },
    {
      seasonId: womenId,
      serieGroupCode: 'Q2',
      serieCategory: 'quarter',
      serieName: 'Kvartsfinal 2',
    },
    {
      seasonId: menId,
      serieGroupCode: 'Q2',
      serieCategory: 'quarter',
      serieName: 'Kvartsfinal 2',
    },
    {
      seasonId: womenId,
      serieGroupCode: 'Q3',
      serieCategory: 'quarter',
      serieName: 'Kvartsfinal 3',
    },
    {
      seasonId: menId,
      serieGroupCode: 'Q3',
      serieCategory: 'quarter',
      serieName: 'Kvartsfinal 3',
    },
    {
      seasonId: womenId,
      serieGroupCode: 'Q4',
      serieCategory: 'quarter',
      serieName: 'Kvartsfinal 4',
    },
    {
      seasonId: menId,
      serieGroupCode: 'Q4',
      serieCategory: 'quarter',
      serieName: 'Kvartsfinal 4',
    },
    {
      seasonId: menId,
      serieGroupCode: 'E1',
      serieCategory: 'eight',
      serieName: 'Åttondel 1',
    },
    {
      seasonId: menId,
      serieGroupCode: 'E2',
      serieCategory: 'eight',
      serieName: 'Åttondel 2',
    },
    {
      seasonId: womenId,
      serieGroupCode: 'elitserien',
      serieCategory: 'regular',
      serieName: 'Elitserien',
    },
    {
      seasonId: menId,
      serieGroupCode: 'elitserien',
      serieCategory: 'regular',
      serieName: 'Elitserien',
    },
    {
      seasonId: womenId,
      serieGroupCode: 'kval',
      serieCategory: 'qualification',
      serieName: 'Kvalgrupp',
    },
    {
      seasonId: menId,
      serieGroupCode: 'kval',
      serieCategory: 'qualification',
      serieName: 'Kvalgrupp',
    },
  ].map((serie) => Serie.create(serie))
}

export const updateSeasonEntry = (object: unknown): SeasonAttributes => {
  if (!object || typeof object !== 'object') {
    throw new BadRequestError({
      code: 400,
      message: 'Incorrect or missing data',
      logging: true,
      context: { origin: 'UpdateSeasonEntry' },
    })
  }

  const updateSeason = seasonAttributes.parse(object)

  return updateSeason
}

const newSeasonEntry = (object: unknown) => {
  if (!object || typeof object !== 'object' || !('yearString' in object)) {
    throw new BadRequestError({
      code: 400,
      message: 'Incorrect or missing data',
      logging: true,
      context: { origin: 'NewSeasonEntry' },
    })
  }

  const newSeason = yearString.parse(object.yearString)

  return {
    seasonYear: newSeason,
    newSeasonArray: [
      Season.findOrCreate({ where: { women: true, year: newSeason } }),
      Season.findOrCreate({ where: { women: false, year: newSeason } }),
    ],
  }
}

export default newSeasonEntry
