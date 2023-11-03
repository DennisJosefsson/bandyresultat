import { useContext } from 'react'
import { MenuContext } from '../../contexts/contexts'
import MarkerClusterGroup from 'react-leaflet-cluster'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

import 'leaflet/dist/leaflet.css'

const Map = ({
  teams,
  formState,
  handleTeamArrayChange,
  setTab,
  setTeamId,
}) => {
  const { open } = useContext(MenuContext)

  return (
    <div className="mx-auto mb-2 min-h-screen max-w-7xl px-1 font-inter text-[#011d29] lg:px-0">
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
              {teams.map((team) => {
                const position = [team.lat, team.long]
                return (
                  <Marker key={team.teamId} position={position}>
                    <Popup>
                      <div className="flew flex-row items-center gap-1">
                        <div
                          className="cursor-pointer text-blue-600"
                          onClick={() => {
                            setTeamId(team.teamId)
                            setTab('singleTeam')
                          }}
                        >
                          {team.name} {team.women ? 'Dam' : 'Herr'}
                        </div>
                        <div className="flex flex-row items-center">
                          <label htmlFor={team.teamId} className="mr-2">
                            Välj:
                          </label>
                          <input
                            name="check"
                            type="checkbox"
                            id={team.teamId}
                            checked={formState.teamArray.includes(team.teamId)}
                            onChange={(event) =>
                              handleTeamArrayChange(event, team.teamId)
                            }
                            className="border-[#011d29] text-[#011d29] focus:border-[#011d29] focus:ring-0"
                          />
                        </div>
                      </div>
                    </Popup>
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
