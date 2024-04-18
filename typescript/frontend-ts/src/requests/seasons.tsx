import axios from 'axios'
import { baseUrl, mobileBaseUrl, header } from '../config/requestConfig'
import {
  PostNewSeasonType,
  SeasonObjectType,
} from '../components/types/season/seasons'
import { TeamSeasonStateType } from '../reducers/teamseasonReducer'
import { SerieAttributes } from '../components/types/series/series'

const backendUrl = import.meta.env.MODE === 'mobile' ? mobileBaseUrl : baseUrl

const seasonsApi = axios.create({
  baseURL: `${backendUrl}/api/seasons`,
  headers: header,
})

export const getSeasons = async (): Promise<SeasonObjectType[]> => {
  const response = await seasonsApi.get('/')
  return response.data
}

export const getSingleSeason = async (
  seasonId: number,
): Promise<SeasonObjectType[]> => {
  const response = await seasonsApi.get(`/${seasonId}`)
  return response.data
}

type PostNewSeasonReturnType = {
  womenSeason: PostNewSeasonType
  menSeason: PostNewSeasonType
  newSeries: SerieAttributes[]
}

export const postSeason = async ({
  yearString,
}: {
  yearString: string
}): Promise<PostNewSeasonReturnType> => {
  const response = await seasonsApi.post('/', { yearString })
  return response.data
}

export const postTeamSeason = async ({
  formState,
  seasonId,
  women,
}: {
  formState: TeamSeasonStateType
  seasonId: number
  women: boolean
}) => {
  return await seasonsApi.post('/teamseason', { formState, seasonId, women })
}

export default seasonsApi
