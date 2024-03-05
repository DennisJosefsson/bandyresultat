import { z } from 'zod'
import { compareLink } from '../link/link'
import { searchResultTeamgameObject } from './games'

export const searchParamsObject = z
  .object({
    categoryArray: z
      .array(
        z.enum([
          'final',
          'semi',
          'quarter',
          'eight',
          'regular',
          'qualification',
        ]),
      )
      .min(1, { message: 'Måste ange minst en matchkategori.' })
      .max(6),
    order: z.object({ value: z.string(), label: z.string() }),
    limit: z.object({ value: z.number(), label: z.number() }),
    result: z
      .string()
      .regex(/^\d{1,2}-\d{1,2}$/, { message: 'Felaktigt resultatformat' })
      .optional()
      .nullable()
      .or(z.literal('')),
    gameResult: z.enum(['win', 'lost', 'draw', 'all']),
    goalsScored: z.coerce
      .number({ invalid_type_error: 'Gjorda mål måste vara en siffra' })
      .nonnegative({ message: 'Gjorda mål måste vara positivt' })
      .int({ message: 'Gjorda mål måste vara ett heltal' })
      .optional()
      .nullable(),
    goalsScoredOperator: z
      .object({ value: z.string(), label: z.string() })

      .optional()
      .nullable(),
    goalsConceded: z.coerce
      .number({ invalid_type_error: 'Insläppta mål måste vara en siffra' })
      .nonnegative({ message: 'Insläppta mål måste vara positivt' })
      .int({ message: 'Insläppta mål måste vara ett heltal' })
      .optional()
      .nullable(),
    goalsConcededOperator: z.object({ value: z.string(), label: z.string() }),
    goalDiff: z.coerce
      .number({ invalid_type_error: 'Målskillnad måste vara en siffra' })
      .int({ message: 'Målskillnad måste vara ett heltal' })
      .nonnegative({ message: 'Målskillnad måste vara positivt' })
      .optional()
      .nullable(),
    goalDiffOperator: z.object({ value: z.string(), label: z.string() }),
    startSeason: z.coerce
      .number({ invalid_type_error: 'Fel årsformat' })
      .transform((arg) => {
        const stringArg = arg.toString()

        if (stringArg === '0') return 1907
        else return arg
      })
      .refine(
        (arg) => {
          if (arg < 1907) return false
          return true
        },
        {
          message: 'Första året kan inte vara före 1907',
          path: ['startSeason'],
        },
      )
      .refine(
        (arg) => {
          if (arg > 2024) return false
          return true
        },
        {
          message: 'Första året kan inte vara efter 2024',
          path: ['startSeason'],
        },
      )
      .default(1907),
    endSeason: z.coerce
      .number({ invalid_type_error: 'Fel årsformat' })
      .transform((arg) => {
        const stringArg = arg.toString()

        if (stringArg === '0') return 2024
        else return arg
      })
      .refine(
        (arg) => {
          if (arg < 1907) return false
          return true
        },
        {
          message: 'Sista året kan inte vara före 1907',
          path: ['endSeason'],
        },
      )
      .refine(
        (arg) => {
          if (arg > 2024) return false
          return true
        },
        {
          message: 'Sista året kan inte vara efter 2024',
          path: ['endSeason'],
        },
      )
      .default(2024),
    team: z
      .object({
        value: z.number().optional(),
        label: z.string().optional(),
      })
      .or(z.literal(''))
      .or(z.null()),
    opponent: z
      .object({
        value: z.number().optional(),
        label: z.string().optional(),
      })
      .or(z.literal(''))
      .or(z.null()),
    inputDate: z
      .string()
      .regex(/^\d{1,2}\/\d{1,2}/, { message: 'Fel datum, sökning' })
      .refine(
        (arg) => {
          const dateArgs = arg.split('/')
          if (
            Number(dateArgs[0]) > 31 ||
            Number(dateArgs[0]) === 0 ||
            Number(dateArgs[1]) > 12 ||
            Number(dateArgs[1]) === 0
          )
            return false
          return true
        },
        { message: 'Fel datumformat', path: ['inputDate'] },
      )
      .optional()
      .nullable()
      .or(z.literal('')),
    selectedGender: z.string().optional().nullable(),
    homeGame: z.string().optional().nullable(),
    orderVar: z.object({ value: z.string(), label: z.string() }),
  })
  .refine((arg) => arg.endSeason >= arg.startSeason, {
    message: '"Första år" kan inte komma efter "Sista år"',
    path: ['startSeason'],
  })
  .refine(
    (arg) => {
      if (arg.team && arg.opponent) {
        if (arg.team == arg.opponent) return false
      }
      return true
    },
    {
      message: 'Lag och motståndare måste vara olika.',
      path: ['Opponent'],
    },
  )
  .refine(
    (arg) => {
      if (arg.opponent && !arg.team) return false
      return true
    },
    {
      message: 'Kan inte välja motståndare utan att välja lag.',
      path: ['Opponent'],
    },
  )

export const searchResponseObject = z.object({
  searchLink: compareLink,
  searchResult: z.array(searchResultTeamgameObject),
})

export type SearchParamsObject = z.infer<typeof searchParamsObject>
export type SearchResponseObject = z.infer<typeof searchResponseObject>
