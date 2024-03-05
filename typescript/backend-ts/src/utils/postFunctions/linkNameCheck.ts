import { z } from 'zod'

export const link = z
  .string()
  .regex(/^link\d{7}$/, { message: 'Fel länkformat' })

export const resultObject = z.object({
  searchString: z.string(),
  origin: z.string(),
})
