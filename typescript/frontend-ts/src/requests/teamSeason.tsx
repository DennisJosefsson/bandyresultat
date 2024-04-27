import axios from 'axios'
import { baseUrl, header, mobileBaseUrl } from '../config/requestConfig'

import { TeamSeasonAttributes } from '../components/types/teams/teams'

const backendUrl = import.meta.env.MODE === 'mobile' ? mobileBaseUrl : baseUrl

const teamseasonsApi = axios.create({
  baseURL: `${backendUrl}/api/teamSeasons`,
  headers: header,
})

export const postTeamSeason = async ({
  teamSeasons,
}: {
  teamSeasons: TeamSeasonAttributes[]
}) => {
  const promise = await Promise.all(
    teamSeasons.map((teamSeason) => teamseasonsApi.post('/', teamSeason)),
  )
  return promise
}
