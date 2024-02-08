import axios from 'axios'
import { baseUrl, mobileBaseUrl, header } from './config'

const backendUrl = import.meta.env.MODE === 'mobile' ? mobileBaseUrl : baseUrl

const teamsApi = axios.create({
  baseURL: `${backendUrl}/api/teams`,
  headers: header,
})

export const getTeams = async () => {
  const response = await teamsApi.get('/')
  return response.data
}

export const getSingleTeam = async (teamId) => {
  const response = await teamsApi.get(`/${teamId}`)
  return response.data
}

export const postTeam = async ({ formState }) => {
  return await teamsApi.post('/', formState)
}

export const updateTeam = async (team) => {
  return await teamsApi.put(`/${team.teamId}`, team)
}

export const deleteTeam = async ({ teamId }) => {
  return await teamsApi.delete(`/${teamId}`, teamId)
}

export default teamsApi
