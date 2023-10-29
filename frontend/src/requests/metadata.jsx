import axios from 'axios'
import { baseUrl, mobileBaseUrl, header } from './config'

const backendUrl = import.meta.env.MODE === 'mobile' ? mobileBaseUrl : baseUrl

const metadataApi = axios.create({
  baseURL: `${backendUrl}/api/metadata`,
  headers: header,
})

export const getMetadata = async () => {
  const response = await metadataApi.get('/')
  return response.data
}

export const getSingleMetadata = async ({ seasonId }) => {
  const response = await metadataApi.get(`/${seasonId}`)
  return response.data
}

export const postMetadata = async ({ formState }) => {
  return await metadataApi.post('/', formState)
}

export const updateMetadata = async (metadata) => {
  return await metadataApi.put(`/${metadata.metadataId}`, metadata)
}

export const deleteMetadata = async ({ metadataId }) => {
  return await metadataApi.delete(`/${metadataId}`, metadataId)
}

export default metadataApi
