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
    order: z.enum(['asc', 'desc']),
    limit: z.enum(['5', '10', '15', '20', '50', '100']),
    result: z
      .string()
      .regex(/^\d{1,2}-\d{1,2}$/, { message: 'Felaktigt resultatformat' })
      .optional()
      .nullable()
      .or(z.literal('')),
    gameResult: z.enum(['win', 'lost', 'draw', 'all']),
    goalsScored: z
      .string()
      .refine(
        (val) => {
          return !isNaN(Number(val))
        },
        { message: 'Gjorda mål måste vara en siffra.' },
      )
      .refine(
        (val) => {
          return Number.isInteger(Number(val))
        },
        { message: 'Gjorda mål måste vara ett heltal.' },
      )
      .refine(
        (val) => {
          return Number(val) > -1
        },
        { message: 'Gjorda mål måste vara 0 eller större än 0.' },
      ),
    goalsScoredOperator: z.enum(['eq', 'lte', 'gte']),
    goalsConceded: z
      .string()
      .refine(
        (val) => {
          return !isNaN(Number(val))
        },
        { message: 'Insläppta mål måste vara en siffra.' },
      )
      .refine(
        (val) => {
          return Number.isInteger(Number(val))
        },
        { message: 'Insläppta mål måste vara ett heltal.' },
      )
      .refine(
        (val) => {
          return Number(val) > -1
        },
        { message: 'Insläppta mål måste vara 0 eller större än 0.' },
      ),
    goalsConcededOperator: z.enum(['eq', 'lte', 'gte']),
    goalDiff: z
      .string()
      .refine(
        (val) => {
          return !isNaN(Number(val))
        },
        { message: 'Målskillnaden måste vara en siffra.' },
      )
      .refine(
        (val) => {
          return Number.isInteger(Number(val))
        },
        { message: 'Målskillnaden måste vara ett heltal.' },
      )
      .refine(
        (val) => {
          return Number(val) > -1
        },
        { message: 'Målskillnaden måste vara 0 eller större än 0.' },
      ),
    goalDiffOperator: z.enum(['eq', 'lte', 'gte']),
    startSeason: z
      .string()
      .regex(/^\d{4}$/, { message: 'Fel format, första år' })
      .refine(
        (arg) => {
          if (Number(arg) < 1907) return false
          return true
        },
        {
          message: 'Första år kan inte vara före 1907',
        },
      )
      .refine(
        (arg) => {
          if (Number(arg) > 2024) return false
          return true
        },
        {
          message: 'Första år kan inte vara efter 2024',
        },
      )
      .default('1907'),
    endSeason: z
      .string()
      .regex(/^\d{4}$/, { message: 'Fel format, sista år' })
      .refine(
        (arg) => {
          if (Number(arg) < 1907) return false
          return true
        },
        {
          message: 'Sista året kan inte vara före 1907',
        },
      )
      .refine(
        (arg) => {
          if (Number(arg) > 2024) return false
          return true
        },
        {
          message: 'Sista året kan inte vara efter 2024',
        },
      )
      .default('2024'),
    team: z.string().or(z.null()),
    opponent: z.string().or(z.null()),
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
        { message: 'Fel datumformat' },
      )
      .optional()
      .nullable()
      .or(z.literal('')),
    selectedGender: z.string().optional().nullable(),
    homeGame: z.string().optional().nullable(),
    orderVar: z.enum([
      'date',
      'goalsScored',
      'goalsConceded',
      'goalDifference',
      'totalGoals',
    ]),
  })
  .refine((arg) => Number(arg.endSeason) >= Number(arg.startSeason), {
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
      path: ['opponent'],
    },
  )
  .refine(
    (arg) => {
      if (arg.opponent && !arg.team) return false
      return true
    },
    {
      message: 'Kan inte välja motståndare utan att välja lag.',
      path: ['opponent'],
    },
  )

export const searchResponseObject = z.object({
  searchLink: compareLink,
  searchResult: z.array(searchResultTeamgameObject),
})

export type SearchParamsObject = z.infer<typeof searchParamsObject>
export type SearchResponseObject = z.infer<typeof searchResponseObject>
