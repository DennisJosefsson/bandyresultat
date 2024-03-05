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
    order: z
      .object({ value: z.string(), label: z.string() })
      .transform((arg) => arg.value),
    limit: z
      .object({ value: z.number(), label: z.number() })
      .transform((arg) => arg.value),
    team: z
      .object({
        value: z.number().optional(),
        label: z.string().optional(),
      })
      .or(z.literal(''))
      .or(z.null())
      .transform((arg) => {
        if (arg && arg.value) return arg.value
        return null
      }),
    opponent: z
      .object({
        value: z.number().optional(),
        label: z.string().optional(),
      })
      .or(z.literal(''))
      .or(z.null())
      .transform((arg) => {
        if (arg && arg.value) return arg.value
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
    goalDiff: z.number().nonnegative().optional().nullable(),
    goalDiffOperator: z
      .object({ value: z.string(), label: z.string() })
      .transform((arg) => arg.value)
      .refine((arg) => ['lte', 'gte', 'eq'].includes(arg)),
    goalsScored: z.number().nonnegative().optional().nullable(),
    goalsScoredOperator: z
      .object({ value: z.string(), label: z.string() })
      .transform((arg) => arg.value)
      .refine((arg) => ['lte', 'gte', 'eq'].includes(arg)),
    goalsConceded: z.number().nonnegative().optional().nullable(),
    goalsConcededOperator: z
      .object({ value: z.string(), label: z.string() })
      .transform((arg) => arg.value)
      .refine((arg) => ['lte', 'gte', 'eq'].includes(arg)),
    orderVar: z
      .object({ value: z.string(), label: z.string() })
      .transform((arg) => arg.value)
      .refine((arg) =>
        [
          'goalDifference',
          'goalsConceded',
          'goalsScored',
          'totalGoals',
          'date',
        ].includes(arg)
      ),

    homeGame: z.enum(['home', 'away', 'both']),
    gameResult: z.enum(['win', 'lost', 'draw', 'all']).optional(),
    selectedGender: z.enum(['men', 'women', 'all']).optional(),
    result: z
      .string()
      .regex(/^\d{1,2}-\d{1,2}$/, { message: 'Fel resultat, sökning' })
      .optional()
      .or(z.literal('')),
    startSeason: z.number().min(1907).max(2024).default(1907),
    endSeason: z.number().min(1907).max(2024).default(2024),
  })
  .refine((arg) => arg.endSeason >= arg.startSeason)
