import axios from 'axios'

const loginApi = axios.create({
  baseURL: 'http://localhost:3001/api/login',
})

export const getLogin = async (clientId, credential) => {
  const response = await loginApi.post('/', { clientId, credential })
  return response.data
}

export default loginApi
