import axios from 'axios'
import { baseUrl, mobileBaseUrl, header } from '../config/requestConfig'
import {
  BandyErrorResponseType,
  BandyErrorType,
} from '../components/types/error/error'

const backendUrl = import.meta.env.MODE === 'mobile' ? mobileBaseUrl : baseUrl

const errorApi = axios.create({
  baseURL: `${backendUrl}/api/errors`,
  headers: header,
})

export const getErrors = async (): Promise<BandyErrorResponseType> => {
  const response = await errorApi.get('/')
  return response.data
}

export const postError = async (errorData: BandyErrorType) => {
  const response = await errorApi.post('/', errorData)
  return response.data
}

export default errorApi
