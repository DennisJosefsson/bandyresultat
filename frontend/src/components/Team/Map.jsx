import { useQuery } from 'react-query'
import { getTeams } from '../../requests/teams'
import { useContext } from 'react'
import { MenuContext } from '../../contexts/contexts'
import Spinner from '../utilitycomponents/spinner'
import MarkerClusterGroup from 'react-leaflet-cluster'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { useNavigate, Link } from 'react-router-dom'
import { ButtonComponent } from '../utilitycomponents/ButtonComponents'
import 'leaflet/dist/leaflet.css'

const Map = () => {
  const { data, isLoading, error } = useQuery(['teams'], getTeams)
  const { open } = useContext(MenuContext)
  const navigate = useNavigate()

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

  return (
    <div className="mx-auto mb-2 min-h-screen max-w-7xl px-1 font-inter text-[#011d29] lg:px-0">
      <div className=" mb-6 flex flex-row-reverse justify-between">
        <div className="mr-1 flex w-1/4 flex-col pt-2 md:flex-row-reverse">
          <div className="float-right flex w-full flex-col items-end pr-0.5 lg:w-3/4 lg:p-0">
            <ButtonComponent clickFunctions={() => navigate('/teams')}>
              Lista
            </ButtonComponent>
          </div>
        </div>
        {!open && (
          <div id="map" className="h-[400px] w-screen max-w-xl p-2">
            <MapContainer
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
                {data?.map((team) => {
                  const position = [team.lat, team.long]
                  return (
                    <Marker key={team.teamId} position={position}>
                      <Popup>
                        <Link to={`/teams/${team.teamId}`}>
                          {team.name} {team.women ? 'Dam' : 'Herr'}
                        </Link>
                      </Popup>
                    </Marker>
                  )
                })}
              </MarkerClusterGroup>
            </MapContainer>
          </div>
        )}
      </div>
    </div>
  )
}

export default Map
