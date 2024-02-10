import { z } from 'zod'

export const link = z.string().regex(/^link\d{7}$/)

export type LinkState =
  | {
      success: false
      message: string
    }
  | { success: true; message: string }
