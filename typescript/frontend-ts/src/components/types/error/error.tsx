import { z } from 'zod'

const bandyError = z.object({
  errorId: z.number().optional(),
  date: z.string(),
  name: z.string(),
  message: z.string(),
  origin: z.string(),
  body: z.string(),
  production: z.boolean(),
  backend: z.boolean(),
})

export type BandyErrorType = z.infer<typeof bandyError>

export type BandyErrorResponseType = {
  frontendErrors: BandyErrorType[]
  backendErrors: BandyErrorType[]
}
