import { z } from 'zod'

export const link = z
  .string()
  .regex(/^link\d{7}$/, { message: 'Fel länkformat' })
export const compareLink = z.tuple([
  z.object({
    linkName: z.string(),
    searchString: z.string(),
    origin: z.string(),
  }),
  z.boolean(),
])

export const linkObject = z.object({
  success: z.boolean(),
  message: z.string(),
  searchString: z.string(),
  origin: z.string(),
})

export type LinkState =
  | {
      success: false
      message: string
    }
  | { success: true; message: string }
export type CompareLink = z.infer<typeof compareLink>
export type LinkObject = z.infer<typeof linkObject>
