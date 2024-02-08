import axios from 'axios'
import { baseUrl, mobileBaseUrl, header } from './config'

const backendUrl = import.meta.env.MODE === 'mobile' ? mobileBaseUrl : baseUrl

const linksApi = axios.create({
  baseURL: `${backendUrl}/api/links`,
  headers: header,
})

export const getLinkData = async (linkName) => {
  const response = await linksApi.get(`/${linkName}`)
  return response.data
}
