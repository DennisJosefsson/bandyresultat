import axios, { AxiosError } from 'axios'
import { baseUrl, mobileBaseUrl, header } from '../config/requestConfig'
import {
  InputGameObjectType,
  GameObjectType,
} from '../components/types/games/games'
import {
  StreakObjectTypes,
  StreakParams,
} from '../components/types/games/streaks'
import {
  SearchParamsObject,
  SearchResponseObject,
} from '../components/types/games/search'
import { SeasonStatsObjectType } from '../components/types/games/stats'
import { AnimationObject } from '../components/types/games/animation'
import { Game } from '../components/Dashboard/Subcomponents/BulkAddGame/BulkGameForm'

const backendUrl = import.meta.env.MODE === 'mobile' ? mobileBaseUrl : baseUrl

const gamesApi = axios.create({
  baseURL: `${backendUrl}/api/games`,
  headers: header,
})

export const getGames = async () => {
  const response = await gamesApi.get('/')
  if (response instanceof AxiosError) {
    return response
  }
  return response.data
}

export const getStreaks = async (
  params: StreakParams,
): Promise<StreakObjectTypes> => {
  const response = await gamesApi.post('/streaks', params)

  return response.data
}

export const getSearch = async (
  searchParams: SearchParamsObject | null,
): Promise<SearchResponseObject> => {
  const response = await gamesApi.post('/search', searchParams)

  return response.data
}

export const getSeasonGames = async (
  seasonId: number,
): Promise<GameObjectType[]> => {
  const response = await gamesApi.get(`/season/${seasonId}`)

  return response.data
}

export const getSeasonStats = async (
  seasonId: number,
): Promise<SeasonStatsObjectType> => {
  const response = await gamesApi.get(`/stats/${seasonId}`)
  return response.data
}

export const getAnimation = async (
  seasonId: number,
): Promise<AnimationObject> => {
  const response = await gamesApi.get(`/animation/${seasonId}`)

  return response.data
}

export const getSingleGame = async ({ gameId }: { gameId: number }) => {
  const response = await gamesApi.get(`/${gameId}`)
  return response.data
}

export const postGame = async (newGameData: InputGameObjectType | null) => {
  const response = await gamesApi.post('/', newGameData)
  if (response instanceof AxiosError) {
    return response
  }
  return response.data
}

export const postBulkGames = async (games: Game[]) => {
  const promise = Promise.all(games.map((game) => gamesApi.post('/', game)))
  console.log(promise)
  return promise
}

export const deleteGame = async (gameId: number) => {
  return await gamesApi.delete(`/${gameId}`)
}

export default gamesApi
