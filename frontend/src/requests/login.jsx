import axios from 'axios'

const loginApi = axios.create({
  baseURL: 'http://localhost:3001/api/login',
})

export const getLogin = async (access_token) => {
  const response = await loginApi.post('/', { access_token })
  return response.data
}

export default loginApi
