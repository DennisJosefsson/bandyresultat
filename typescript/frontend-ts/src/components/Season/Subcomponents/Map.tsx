import { useQuery } from 'react-query'

import { Link } from 'react-router-dom'
import { getSingleSeason } from '../../../requests/seasons'
import Spinner from '../../utilitycomponents/Components/Spinner'
import MarkerClusterGroup from 'react-leaflet-cluster'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import {
  latLngBounds,
  Icon,
  LatLngTuple,
  LatLngBounds,
  LatLngExpression,
} from 'leaflet'
import 'leaflet/dist/leaflet.css'
import useGenderContext from '../../../hooks/contextHooks/useGenderContext'
import useMenuContext from '../../../hooks/contextHooks/useMenuContext'

const Map = ({ seasonId }: { seasonId: number }) => {
  const { data, isLoading, error } = useQuery(['singleSeason', seasonId], () =>
    getSingleSeason(seasonId),
  )
  const { women } = useGenderContext()
  const { open } = useMenuContext()

  if (isLoading) {
    return (
      <div className="mx-auto grid h-screen place-items-center font-inter text-[#011d29]">
        <Spinner />
      </div>
    )
  }

  if (error && error instanceof Error) {
    return (
      <div className="mx-auto grid h-screen place-items-center font-inter text-[#011d29]">
        {error.message}
      </div>
    )
  }

  if (women && seasonId < 1973) {
    return (
      <div className="mx-auto mt-4 grid place-items-center py-5 font-inter text-sm font-bold text-[#011d29] md:text-base">
        <p className="mx-10 text-center">
          Första säsongen för damernas högsta serie var{' '}
          <Link to="/season/1973" className="font-bold">
            1972/73
          </Link>
          .
        </p>
      </div>
    )
  }

  const qualIcon = new Icon({
    iconUrl:
      'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    shadowUrl:
      'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  })

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

  return (
    <div>
      {!open && teams && qualificationTeams && (
        <div id="map" className="h-[400px] w-screen max-w-xl p-2">
          <MapContainer
            bounds={bounds}
            center={[62, 15]}
            zoom={4}
            scrollWheelZoom={true}
            className="h-[400px]"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <MarkerClusterGroup chunkedLoading>
              {teams.map((team) => {
                const position = [team.lat, team.long] as LatLngExpression
                return (
                  <Marker key={team.teamId} position={position}>
                    <Popup>{team.name}</Popup>
                  </Marker>
                )
              })}
              {qualificationTeams.map((team) => {
                const position = [team.lat, team.long] as LatLngExpression
                return (
                  <Marker key={team.teamId} position={position} icon={qualIcon}>
                    <Popup>{team.name}</Popup>
                  </Marker>
                )
              })}
            </MarkerClusterGroup>
          </MapContainer>
        </div>
      )}
    </div>
  )
}

export default Map
