import { z } from 'zod'

export const link = z.string().regex(/^link\d{7}$/)
export const compareLink = z.array(
  z.object({
    linkName: z.string(),
    searchString: z.string(),
    origin: z.string(),
  }),
)

export type LinkState =
  | {
      success: false
      message: string
    }
  | { success: true; message: string }
export type CompareLink = z.infer<typeof compareLink>
