import {
  FormField,
  FormItem,
  FormControl,
  FormLabel,
} from '@/src/@/components/ui/form'
import { Checkbox } from '@/src/@/components/ui/checkbox'
import { useFormContext } from 'react-hook-form'
import MarkerClusterGroup from 'react-leaflet-cluster'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

import 'leaflet/dist/leaflet.css'
import { TeamAttributes } from '../../types/teams/teams'
import useMenuContext from '../../../hooks/contextHooks/useMenuContext'

type MapProps = {
  teams: TeamAttributes[]
}
const Map = ({ teams }: MapProps) => {
  const { open } = useMenuContext()
  const methods = useFormContext()
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
              <FormField
                control={methods.control}
                name="teamArray"
                render={() => (
                  <FormItem>
                    <div className="grid w-2/3 grid-cols-1 justify-between gap-x-8 gap-y-2 pt-2 lg:grid-cols-3"></div>
                    {teams.map((team) => {
                      const position = [team.lat, team.long] as [number, number]
                      return (
                        <FormField
                          key={team.teamId}
                          control={methods.control}
                          name="teamArray"
                          render={({ field }) => {
                            return (
                              <FormItem
                                key={team.teamId}
                                className="flex flex-row items-start space-x-3 space-y-0"
                              >
                                <Marker key={team.teamId} position={position}>
                                  <Popup>
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(
                                          team.teamId,
                                        )}
                                        onCheckedChange={(checked) => {
                                          return checked
                                            ? field.onChange([
                                                ...field.value,
                                                team.teamId,
                                              ])
                                            : field.onChange(
                                                field.value?.filter(
                                                  (value: number) =>
                                                    value !== team.teamId,
                                                ),
                                              )
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel>{team.casualName}</FormLabel>
                                  </Popup>
                                </Marker>
                              </FormItem>
                            )
                          }}
                        />
                      )
                    })}
                  </FormItem>
                )}
              />
            </MarkerClusterGroup>
          </MapContainer>
        </div>
      )}
    </div>
  )
}

export default Map
