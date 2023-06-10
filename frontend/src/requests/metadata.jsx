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

export const postMetadata = async ({ formState }) => {
  console.log('Console logging from request function', formState)
  return await metadataApi.post('/', formState)
}

export const updateMetadata = async (metadata) => {
  return await metadataApi.put(`/${metadata.metadataId}`, metadata)
}

export const deleteMetadata = async ({ metadataId }) => {
  return await metadataApi.delete(`/${metadataId}`, metadataId)
}

export default metadataApi
