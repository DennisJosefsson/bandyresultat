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
      .min(2)
      .max(6),
    order: z.object({ value: z.string(), label: z.string() }),
    limit: z.object({ value: z.number(), label: z.number() }),
    gameResult: z
      .string()
      .regex(/^\d{1,2}-\d{1,2}$/, { message: 'Felaktigt resultatformat' })
      .optional()
      .nullable(),
    goalsScored: z.number().int().optional().nullable(),
    goalsScoredOperator: z
      .object({ value: z.string(), label: z.string() })
      .optional()
      .nullable(),
    goalsConceded: z.number().int().optional().nullable(),
    goalsConcededOperator: z.object({ value: z.string(), label: z.string() }),
    goalDiff: z.number().int().optional().nullable(),
    goalDiffOperator: z.object({ value: z.string(), label: z.string() }),
    startSeason: z.number().min(1907).max(2024).default(1907),
    endSeason: z.number().min(1907).max(2024).default(2024),
    team: z
      .object({ value: z.number(), label: z.string() })
      .optional()
      .nullable(),
    opponent: z
      .object({ value: z.number(), label: z.string() })
      .optional()
      .nullable(),
    women: z.boolean().nullable(),
    inputDate: z
      .string()
      .regex(/^\d{1,2}\/\d{1,2}/)
      .refine((arg) => {
        const dateArgs = arg.split('/')
        if (
          Number(dateArgs[0]) > 31 ||
          Number(dateArgs[0]) === 0 ||
          Number(dateArgs[1]) > 12 ||
          Number(dateArgs[1]) === 0
        )
          return false
        return true
      })
      .optional()
      .nullable(),
    date: z.string().optional().nullable(),
    selectedGender: z.string().optional().nullable(),
    homeGame: z.string().optional().nullable(),
    orderVar: z.object({ value: z.string(), label: z.string() }),
  })
  .refine((arg) => arg.endSeason >= arg.startSeason)

export const searchResponseObject = z.object({
  searchLink: compareLink,
  searchResult: z.array(searchResultTeamgameObject),
  hits: z.number(),
})

export type SearchParamsObject = z.infer<typeof searchParamsObject>
export type SearchResponseObject = z.infer<typeof searchResponseObject>
