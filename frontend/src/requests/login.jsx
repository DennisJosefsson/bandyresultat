import axios from 'axios'
import { baseUrl, mobileBaseUrl } from './config'

const backendUrl = import.meta.env.MODE === 'mobile' ? mobileBaseUrl : baseUrl

const loginApi = axios.create({
  baseURL: `${backendUrl}/api/login`,
})

export const logout = async () => {
  const response = await loginApi.get('/logout')
  return response.data
}

export const getLogin = async (userName, password) => {
  const response = await loginApi.post('/', { userName, password })
  return response.data
}

export default loginApi
