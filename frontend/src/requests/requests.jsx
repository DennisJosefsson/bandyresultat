import axios from 'axios'

const baseUrl = 'http://localhost:3001/api'

export const getTeams = () => {
  const result = axios.get(`${baseUrl}/teams`).then((res) => res.data)
  return result
}

export const getSeasons = (season, gender) => {
  const result = axios
    .get(`${baseUrl}/seasons/${gender}`)
    .then((res) => res.data)
  return result
}

export const getTable = (tableId, gender) => {
  const result = axios
    .get(`${baseUrl}/tables/${tableId}/${gender}`)
    .then((res) => res.data)
  return result
}
