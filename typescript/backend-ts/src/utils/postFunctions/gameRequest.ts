import { z } from 'zod'

export const streakRequest = z.object({
  record: z.enum(['streaks', 'points', 'scored', 'conceded', 'generalStats']),
  women: z.boolean(),
})

export const searchRequest = z.object({
  categoryArray: z
    .array(
      z.enum(['qualification', 'regular', 'eight', 'quarter', 'semi', 'final'])
    )
    .default(['qualification', 'regular', 'eight', 'quarter', 'semi', 'final']),
  limit: z.number().default(10),
  order: z.enum(['asc', 'desc']),
  team: z.number().optional(),
  opponent: z.number().optional(),
  inputDate: z
    .string()
    .regex(/^\d{1,2}\/\d{1,2}$/)
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
    .optional(),
  goalDiff: z.number().positive().optional(),
  goalDiffOperator: z.enum(['gte', 'lte', 'eq']).optional(),
  goalsScored: z.number().positive().optional(),
  goalsScoredOperator: z.enum(['gte', 'lte', 'eq']).optional(),
  goalsConceded: z.number().positive().optional(),
  goalsConcededOperator: z.enum(['gte', 'lte', 'eq']).optional(),
  orderVar: z
    .enum(['goalDifference', 'goalsConceded', 'goalsScored', 'totalGoals'])
    .optional(),
  homeGame: z.enum(['home', 'away']).optional(),
  gameResult: z.enum(['win', 'lost', 'draw']).optional(),
  selectedGender: z.enum(['men', 'women']).optional(),
  result: z
    .string()
    .regex(/^\d{1,2}-\d{1,2}$/)
    .optional(),
})
