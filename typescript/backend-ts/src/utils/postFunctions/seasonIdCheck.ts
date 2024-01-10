import { z } from 'zod'

const seasonIdCheck = z
  .string()
  .regex(/^[0-9]{4}$/)
  .transform((value) => {
    const seasonId = Number(value)
    if (!isNaN(seasonId)) {
      if (seasonId > 1906 && seasonId < 1964) {
        return String(seasonId)
      } else if (seasonId > 1906 && seasonId > 1963 && seasonId < 2026) {
        return `${seasonId - 1}/${seasonId}`
      }
    }
  })

export default seasonIdCheck
