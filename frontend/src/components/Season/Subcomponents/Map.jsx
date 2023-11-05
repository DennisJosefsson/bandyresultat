import { useContext } from 'react'
import { useQuery } from 'react-query'
import { GenderContext, MenuContext } from '../../../contexts/contexts'
import { Link } from 'react-router-dom'
import { getSingleSeason } from '../../../requests/seasons'
import Spinner from '../../utilitycomponents/Components/spinner'
import MarkerClusterGroup from 'react-leaflet-cluster'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { latLngBounds, Icon } from 'leaflet'
import 'leaflet/dist/leaflet.css'

const Map = ({ seasonId }) => {
  const { data, isLoading, error } = useQuery(['singleSeason', seasonId], () =>
    getSingleSeason(seasonId),
  )
  const { women } = useContext(GenderContext)
  const { open } = useContext(MenuContext)

  if (isLoading) {
    return (
      <div className="mx-auto grid h-screen place-items-center font-inter text-[#011d29]">
        <Spinner />
      </div>
    )
  }

  if (error) {
    return (
      <div className="mx-auto grid h-screen place-items-center font-inter text-[#011d29]">
        Något gick fel.
      </div>
    )
  }

  if (data?.success === 'false') {
    return (
      <div className="mx-auto grid h-screen place-items-center font-inter text-[#011d29]">
        {data.message}
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

  const teams = data
    .find((season) => season.women === women)
    .teams.filter((team) => team.teamseason.qualification !== true)

  const qualificationTeams = data
    .find((season) => season.women === women)
    .teams.filter((team) => team.teamseason.qualification === true)

  const latLongArray = data
    .find((season) => season.women === women)
    .teams.map((team) => {
      return [team.lat, team.long]
    })

  const bounds = new latLngBounds(latLongArray)

  return (
    <div>
      {!open && (
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
                const position = [team.lat, team.long]
                return (
                  <Marker key={team.teamId} position={position}>
                    <Popup>{team.name}</Popup>
                  </Marker>
                )
              })}
              {qualificationTeams.map((team) => {
                const position = [team.lat, team.long]
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
