import axios from 'axios'
import { baseUrl, mobileBaseUrl, header } from '../config/requestConfig'
import { LinkObject } from '../components/types/link/link'

const backendUrl = import.meta.env.MODE === 'mobile' ? mobileBaseUrl : baseUrl

const linksApi = axios.create({
  baseURL: `${backendUrl}/api/links`,
  headers: header,
})

export const getLinkData = async (
  linkName: string | null,
): Promise<LinkObject> => {
  const response = await linksApi.get(`/${linkName}`)
  return response.data
}
