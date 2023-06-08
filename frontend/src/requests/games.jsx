import axios from 'axios'

const gamesApi = axios.create({
  baseURL: 'http://localhost:3001/api/games',
})

export const getGames = async () => {
  const response = await gamesApi.get('/')
  return response.data
}

export const getSeasonGames = async ({ seasonId }) => {
  const response = await gamesApi.get(`/playoff/${seasonId}`)
  return response.data
}

export const getSingleGame = async ({ gameId }) => {
  const response = await gamesApi.get(`/${gameId}`)
  return response.data
}

export const postGame = async (game) => {
  return await gamesApi.post('/', game)
}

export const updateGame = async (game) => {
  return await gamesApi.put(`/${game.gameId}`, game)
}

export const deleteGame = async ({ gameId }) => {
  return await gamesApi.delete(`/${gameId}`, gameId)
}

export default gamesApi
