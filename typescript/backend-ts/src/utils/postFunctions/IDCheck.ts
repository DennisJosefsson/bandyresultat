import { z } from 'zod'

const IDCheck = z.coerce.number()

export default IDCheck
