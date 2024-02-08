import { z } from 'zod'

export const teamIdChecker = z.coerce.number().int().positive().max(999)
