import axios from 'axios'
import { baseUrl, mobileBaseUrl, header } from './config'
import {
  compareSortFunction,
  compareAllTeamData,
} from '../components/utilitycomponents/functions/sortFunction'

const backendUrl = import.meta.env.MODE === 'mobile' ? mobileBaseUrl : baseUrl

const tablesApi = axios.create({
  baseURL: `${backendUrl}/api/tables`,
  headers: header,
})

export const maratonTabell = async () => {
  const response = await tablesApi.get(`/maraton`)
  return response.data
}

export const compareTeams = async (compObject) => {
  if (compObject === null || compObject === undefined) {
    return { success: false, message: 'Inget objekt' }
  }
  const response = await tablesApi.post('/compare', compObject)
  const categoryData = compareSortFunction(response.data.tabeller)
  const allData =
    compObject.teamArray.length === 2
      ? response.data.compareAllGames
      : compareAllTeamData(response.data.compareAllGames)
  const firstGames = response.data.firstAndLatestGames.filter(
    (game) => game.ranked_first_games === '1',
  )

  const latestGames =
    compObject.teamArray.length === 2
      ? response.data.firstAndLatestGames
          .filter((game) => game.ranked_first_games !== '1')
          .sort((a, b) => new Date(b.date) - new Date(a.date)) || []
      : response.data.firstAndLatestGames
          .filter((game) => game.ranked_last_games === '1')
          .sort((a, b) => new Date(b.date) - new Date(a.date)) || []

  return {
    ...response.data,
    allData,
    categoryData,
    firstGames,
    latestGames,
  }
}

export const getSingleSeasonTable = async (seasonId) => {
  const response = await tablesApi.get(`/${seasonId}`)
  return response.data
}

export const postTable = async (table) => {
  return await tablesApi.post('/', table)
}

export const updateTable = async (table) => {
  return await tablesApi.put(`/${table.id}`, table)
}

export const deleteTable = async ({ tableId }) => {
  return await tablesApi.delete(`/${tableId}`, tableId)
}

export default tablesApi
