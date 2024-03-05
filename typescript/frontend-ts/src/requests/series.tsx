import axios from 'axios'
import { baseUrl, mobileBaseUrl, header } from '../config/requestConfig'
import { SerieAttributes } from '../components/types/series/series'

const backendUrl = import.meta.env.MODE === 'mobile' ? mobileBaseUrl : baseUrl

const seriesApi = axios.create({
  baseURL: `${backendUrl}/api/series`,
  headers: header,
})

export const getSeasonSeries = async (seasonId: number) => {
  const response = await seriesApi.get(`/serie/${seasonId}`)
  return response.data
}

export const postSerie = async (serieData: SerieAttributes | null) => {
  const response = await seriesApi.post('/', serieData)

  return response.data
}

export default seriesApi
