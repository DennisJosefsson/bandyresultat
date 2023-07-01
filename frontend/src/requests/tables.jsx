import axios from 'axios'

const tablesApi = axios.create({
  baseURL: 'http://localhost:3001/api/tables',
})

export const maratonTabell = async () => {
  const response = await tablesApi.get(`/maraton`)
  return response.data
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
