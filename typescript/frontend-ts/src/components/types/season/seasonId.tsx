import { z } from 'zod'

export const inputSeasonId = z
  .string({ invalid_type_error: 'Fel säsongsId' })
  .regex(/^\d{4}$/)
  .transform((val) => Number(val))
  .refine(
    (val) => {
      if (val < 1907) return false
      return true
    },
    { message: 'Första säsong är 1907.' },
  )
