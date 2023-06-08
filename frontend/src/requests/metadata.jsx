import axios from 'axios'

const metadataApi = axios.create({
  baseURL: 'http://localhost:3001/api/metadata',
})

export const getMetadata = async () => {
  const response = await metadataApi.get('/')
  return response.data
}

export const getSingleMetadata = async ({ seasonId }) => {
  const response = await metadataApi.get(`/${seasonId}`)
  return response.data
}

export const postMetadata = async (metadata) => {
  return await metadataApi.post('/', metadata)
}

export const updateMetadata = async (metadata) => {
  return await metadataApi.put(`/${metadata.metadataId}`, metadata)
}

export const deleteMetadata = async ({ metadataId }) => {
  return await metadataApi.delete(`/${metadataId}`, metadataId)
}

export default metadataApi
