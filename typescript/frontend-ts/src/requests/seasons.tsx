import axios from 'axios'
import { baseUrl, mobileBaseUrl, header } from './config'
import { SeasonObjectType } from '../components/types/season/seasons'

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

export const postSeason = async (season) => {
  return await seasonsApi.post('/', season)
}

export const postTeamSeason = async ({ formState, seasonId, women }) => {
  return await seasonsApi.post('/teamseason', { formState, seasonId, women })
}

export const updateSeason = async (season) => {
  return await seasonsApi.put(`/${season.seasonId}`, season)
}

export const deleteSeason = async ({ seasonId }) => {
  return await seasonsApi.delete(`/${seasonId}`, seasonId)
}

export default seasonsApi