import { z } from 'zod'

export const teamAttributes = z.object({
  teamId: z.number(),
  name: z.string(),
  city: z.string(),
  casualName: z.string(),
  shortName: z.string(),
  women: z.boolean().optional(),
  lat: z.number().optional().nullable(),
  long: z.number().optional().nullable(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
})

export const teamSeasonAttributes = z.object({
  teamseasonId: z.number(),
  seasonId: z.number(),
  teamId: z.number(),
  tableId: z.number().nullable().optional(),
  women: z.boolean(),
  qualification: z.boolean(),
})

export const teamAndSeasonAttributes = z.object({
  teamId: z.number(),
  name: z.string(),
  city: z.string(),
  casualName: z.string(),
  shortName: z.string(),
  women: z.boolean().optional(),
  lat: z.number().optional().nullable(),
  long: z.number().optional().nullable(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  teamseason: z.object({
    teamseasonId: z.number(),
    seasonId: z.number(),
    teamId: z.number(),
    tableId: z.number().nullable().optional(),
    women: z.boolean(),
    qualification: z.boolean(),
  }),
})

export type TeamAttributes = z.infer<typeof teamAttributes>
export type TeamSeasonAttributes = z.infer<typeof teamSeasonAttributes>
export type TeamAndSeasonAttributes = z.infer<typeof teamAndSeasonAttributes>
