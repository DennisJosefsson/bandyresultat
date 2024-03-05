import axios from 'axios'
import { baseUrl, mobileBaseUrl, header } from '../config/requestConfig'

const backendUrl = import.meta.env.MODE === 'mobile' ? mobileBaseUrl : baseUrl

const loginApi = axios.create({
  baseURL: `${backendUrl}/api/login`,
  headers: header,
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
