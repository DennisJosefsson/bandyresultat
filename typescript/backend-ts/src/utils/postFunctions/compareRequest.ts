import { z } from 'zod'

export const compareObject = z.object({
  teamArray: z
    .array(z.number().int().positive())
    .min(2, { message: 'Måste ange minst två lag.' })
    .max(4, { message: 'Måste ange högst fyra lag.' }),
  categoryArray: z
    .array(
      z.enum(['qualification', 'regular', 'eight', 'quarter', 'semi', 'final'])
    )
    .min(1, { message: 'Måste ange minst en kategori.' }),
  startSeason: z.coerce.number().int().positive(),
  endSeason: z.coerce.number().int().positive(),
})
