import axios from 'axios'

const teamsApi = axios.create({
  baseURL: 'http://localhost:3001/api/teams',
})

export const getTeams = async () => {
  const response = await teamsApi.get('/')
  return response.data
}

export const getSingleTeam = async (teamId) => {
  console.log(teamId)
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
