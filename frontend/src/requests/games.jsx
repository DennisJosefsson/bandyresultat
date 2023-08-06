import axios from 'axios'
import { baseUrl, mobileBaseUrl } from './config'

const backendUrl =
  import.meta.env.MODE === 'mobile'
    ? mobileBaseUrl
    : baseUrl
    ? 'https://bandyresultat.se'
    : 'http://localhost:3001'

const gamesApi = axios.create({
  baseURL: `${backendUrl}/api/games`,
})

export const getGames = async () => {
  const response = await gamesApi.get('/')
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
