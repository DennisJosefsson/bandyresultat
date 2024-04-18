import axios, { AxiosError } from 'axios'
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

export const getLogin = async (userName: string, password: string) => {
  const response = await loginApi.post('/', { userName, password })

  if (response instanceof AxiosError) {
    return response
  }
  return response.data
}

export default loginApi
