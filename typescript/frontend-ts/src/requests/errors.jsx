import axios from 'axios'
import { baseUrl, mobileBaseUrl, header } from './config'

const backendUrl = import.meta.env.MODE === 'mobile' ? mobileBaseUrl : baseUrl

const errorApi = axios.create({
  baseURL: `${backendUrl}/api/errors`,
  headers: header,
})

export const getErrors = async () => {
  const response = await errorApi.get('/')
  return response.data
}

export const postError = async (errorData) => {
  const response = await errorApi.post('/', errorData)
  return response.data
}

export default errorApi
