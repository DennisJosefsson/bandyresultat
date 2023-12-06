import BadRequestError from '../middleware/errors/BadRequestError.js'
type season = string

const seasonIdCheck = (value: unknown): season => {
  if (!value) {
    throw new BadRequestError({
      code: 400,
      message: 'Missing SeasonId value',
      logging: true,
      context: { origin: 'SeasonId check' },
    })
  }

  const seasonId = Number(value)
  if (!isNaN(seasonId)) {
    if (seasonId > 1906 && seasonId < 1964) {
      return String(seasonId)
    } else if (seasonId > 1906 && seasonId > 1963 && seasonId < 2026) {
      return `${seasonId - 1}/${seasonId}`
    }
  }

  throw new BadRequestError({
    code: 400,
    message: 'Wrong SeasonId',
    logging: true,
    context: { origin: 'SeasonId check' },
  })
}

export default seasonIdCheck
