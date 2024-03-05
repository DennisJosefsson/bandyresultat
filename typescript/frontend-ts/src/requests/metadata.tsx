import axios from 'axios'
import { baseUrl, mobileBaseUrl, header } from '../config/requestConfig'
import { MetadataState } from '../reducers/metadataFormReducer'

const backendUrl = import.meta.env.MODE === 'mobile' ? mobileBaseUrl : baseUrl

const metadataApi = axios.create({
  baseURL: `${backendUrl}/api/metadata`,
  headers: header,
})

export const getMetadata = async () => {
  const response = await metadataApi.get('/')
  return response.data
}

export const getSingleMetadata = async ({ seasonId }: { seasonId: number }) => {
  const response = await metadataApi.get(`/${seasonId}`)
  return response.data
}

export const postMetadata = async ({
  formState,
}: {
  formState: MetadataState
}) => {
  return await metadataApi.post('/', formState)
}

export default metadataApi
