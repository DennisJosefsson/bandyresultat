import axios from 'axios'
import { baseUrl, mobileBaseUrl, header } from '../config/requestConfig'
import { SeasonObjectType } from '../components/types/season/seasons'
import { TeamSeasonStateType } from '../reducers/teamseasonReducer'

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

// export const postSeason = async (season) => {
//   return await seasonsApi.post('/', season)
// }

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
