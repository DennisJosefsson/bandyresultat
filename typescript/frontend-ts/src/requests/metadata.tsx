import axios from 'axios'
import { baseUrl, mobileBaseUrl, header } from '../config/requestConfig'

import { MetadataType } from '../components/types/metadata/metadata'

const backendUrl = import.meta.env.MODE === 'mobile' ? mobileBaseUrl : baseUrl

const metadataApi = axios.create({
  baseURL: `${backendUrl}/api/metadata`,
  headers: header,
})

export const getMetadata = async () => {
  const response = await metadataApi.get('/')
  return response.data
}

export const getSingleMetadata = async (
  year: string,
): Promise<MetadataType[]> => {
  const seasonId = year.slice(-4)
  const response = await metadataApi.get(`/${seasonId}`)
  return response.data
}

export const postMetadata = async (formData: MetadataType) => {
  return await metadataApi.post('/', formData)
}

export default metadataApi
