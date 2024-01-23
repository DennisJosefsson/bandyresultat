import { SeasonAttributes } from '../../models/Season.js'

export const seasonData: SeasonAttributes[] = [
  {
    seasonId: 1,
    year: '2022/2023',
    women: false,
  },
  {
    seasonId: 2,
    year: '2023/2024',
    women: false,
  },
  {
    seasonId: 3,
    year: '2024/2025',
    women: false,
  },
  {
    seasonId: 4,
    year: '2022/2023',
    women: true,
  },
  {
    seasonId: 5,
    year: '2023/2024',
    women: true,
  },
]

export const newSeason: SeasonAttributes = {
  seasonId: 6,
  year: '2024/2025',
  women: true,
}

export const wrongSeasonDataYearTooHigh = {
  seasonId: 7,
  year: '2026',
  women: false,
}

export const wrongSeasonDataWrongYearFormat = {
  seasonId: 8,
  year: '2026/2025',
  women: false,
}

export const wrongSeasonDataMissingWomenBoolean = {
  seasonId: 9,
  year: '2026/2027',
}

export const wrongSeasonDataYearNotNumber = {
  seasonId: 10,
  year: '2026/202x',
  women: false,
}
