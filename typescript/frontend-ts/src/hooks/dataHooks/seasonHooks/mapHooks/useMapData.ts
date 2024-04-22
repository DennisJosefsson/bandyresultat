import useGenderContext from '../../../contextHooks/useGenderContext'

import { useGetSingleSeason } from '../useGetSingleSeason'
import { latLngBounds, LatLngTuple, LatLngBounds } from 'leaflet'

export const useMapData = (seasonId: number) => {
  const { women } = useGenderContext()
  const { data, error, isLoading, isSuccess } = useGetSingleSeason(seasonId)
  const seasonObject = data?.find((season) => season.women === women)

  const teams = seasonObject?.teams.filter(
    (team) => team.teamseason.qualification !== true,
  )

  const qualificationTeams = seasonObject?.teams.filter(
    (team) => team.teamseason.qualification === true,
  )

  const latLongArray = seasonObject?.teams.map((team) => {
    return [team.lat, team.long]
  }) as LatLngTuple[]

  const bounds = latLngBounds(latLongArray) as LatLngBounds

  return { teams, qualificationTeams, bounds, error, isLoading, isSuccess }
}
