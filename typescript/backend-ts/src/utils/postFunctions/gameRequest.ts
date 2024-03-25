import { z } from 'zod'

export const streakRequest = z.object({
  record: z.enum(['streaks', 'points', 'scored', 'conceded', 'generalStats']),
  women: z.boolean(),
})

export const searchRequest = z
  .object({
    categoryArray: z
      .array(
        z.enum([
          'qualification',
          'regular',
          'eight',
          'quarter',
          'semi',
          'final',
        ])
      )
      .default([
        'qualification',
        'regular',
        'eight',
        'quarter',
        'semi',
        'final',
      ]),
    order: z.string(),
    limit: z.coerce.number().default(10),
    team: z.coerce.number().transform((arg) => {
      if (arg !== 0) return arg
      return null
    }),
    opponent: z.coerce.number().transform((arg) => {
      if (arg !== 0) return arg
      return null
    }),
    inputDate: z
      .string()
      .regex(/^\d{1,2}\/\d{1,2}$/, { message: 'Fel sökdatum' })
      .superRefine((val, ctx) => {
        if (Number(val.split('/')[0]) > 31) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `Search date error, day larger than 31.`,
          })
        }
        if (Number(val.split('/')[1]) > 12) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `Search date error, month larger than 12.`,
          })
        }
      })
      .optional()
      .nullable()
      .or(z.literal('')),
    goalDiff: z.coerce.number().nonnegative().optional().nullable(),
    goalDiffOperator: z.enum(['lte', 'gte', 'eq']),
    goalsScored: z.coerce.number().nonnegative().optional().nullable(),
    goalsScoredOperator: z.enum(['lte', 'gte', 'eq']),
    goalsConceded: z.coerce.number().nonnegative().optional().nullable(),
    goalsConcededOperator: z.enum(['lte', 'gte', 'eq']),
    orderVar: z.enum([
      'goalDifference',
      'goalsConceded',
      'goalsScored',
      'totalGoals',
      'date',
    ]),

    homeGame: z.enum(['home', 'away', 'both']),
    gameResult: z.enum(['win', 'lost', 'draw', 'all']).optional(),
    selectedGender: z.enum(['men', 'women', 'all']).optional(),
    result: z
      .string()
      .regex(/^\d{1,2}-\d{1,2}$/, { message: 'Fel resultat, sökning' })
      .optional()
      .or(z.literal('')),
    startSeason: z.coerce.number().min(1907).max(2024).default(1907),
    endSeason: z.coerce.number().min(1907).max(2024).default(2024),
  })
  .refine((arg) => arg.endSeason >= arg.startSeason)
