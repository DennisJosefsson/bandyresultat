import axios from 'axios'

const seasonsApi = axios.create({
  baseURL: 'http://localhost:3001/api/seasons',
})

export const getSeasons = async () => {
  const response = await seasonsApi.get('/')
  return response.data
}

export const getSingleSeason = async (seasonId) => {
  const response = await seasonsApi.get(`/${seasonId}`)
  return response.data
}

export const postSeason = async (season) => {
  return await seasonsApi.post('/', season)
}

export const postTeamSeason = async ({ formState, seasonId }) => {
  return await seasonsApi.post('/teamseason', { formState, seasonId })
}

export const updateSeason = async (season) => {
  return await seasonsApi.put(`/${season.seasonId}`, season)
}

export const deleteSeason = async ({ seasonId }) => {
  return await seasonsApi.delete(`/${seasonId}`, seasonId)
}

export default seasonsApi
