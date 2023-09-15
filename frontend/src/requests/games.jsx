import axios from 'axios'
import { baseUrl, mobileBaseUrl, header } from './config'

const backendUrl = import.meta.env.MODE === 'mobile' ? mobileBaseUrl : baseUrl

const gamesApi = axios.create({
  baseURL: `${backendUrl}/api/games`,
  headers: header,
})

export const getGames = async () => {
  const response = await gamesApi.get('/')
  return response.data
}

export const getStreaks = async () => {
  const response = await gamesApi.get('/streaks')
  return response.data
}

export const getSearch = async (searchParams) => {
  const response = await gamesApi.post('/search', searchParams)
  return response.data
}

export const getSeasonGames = async (seasonId) => {
  const response = await gamesApi.get(`/season/${seasonId}`)
  return response.data
}

export const getSingleGame = async ({ gameId }) => {
  const response = await gamesApi.get(`/${gameId}`)
  return response.data
}

export const postGame = async ({ formState }) => {
  return await gamesApi.post('/', formState)
}

export const updateGame = async (game) => {
  return await gamesApi.put(`/${game.gameId}`, game)
}

export const deleteGame = async ({ gameId }) => {
  return await gamesApi.delete(`/${gameId}`, gameId)
}

export default gamesApi
