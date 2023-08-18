import axios from 'axios'
import { baseUrl, mobileBaseUrl, header } from './config'

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
  return await tablesApi.post('/compare', compObject)
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
