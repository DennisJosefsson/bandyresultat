import { FormField, FormItem, FormControl } from '@/src/@/components/ui/form'
import { Checkbox } from '@/src/@/components/ui/checkbox'
import { useFormContext } from 'react-hook-form'
import MarkerClusterGroup from 'react-leaflet-cluster'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

import 'leaflet/dist/leaflet.css'

import { SetURLSearchParams } from 'react-router-dom'
import { Button } from '@/src/@/components/ui/button'
import { useGetTeamsList } from '@/src/hooks/dataHooks/teamHooks/useGetTeamsList'

type MapProps = {
  teamFilter: string
  setSearchParams: SetURLSearchParams
}
const Map = ({ teamFilter, setSearchParams }: MapProps) => {
  const methods = useFormContext()
  const { teams } = useGetTeamsList(teamFilter)
  return (
    <div className="mx-auto mb-2 min-h-screen px-1 font-inter text-foreground lg:px-0">
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
                  {teams.map((team) => {
                    const position = [team.lat, team.long] as [number, number]
                    return (
                      <FormField
                        key={team.teamId}
                        control={methods.control}
                        name="teamArray"
                        render={({ field }) => {
                          return (
                            <FormItem key={team.teamId}>
                              <Marker key={team.teamId} position={position}>
                                <Popup>
                                  <div className="flex flex-row items-center justify-evenly gap-2 p-2">
                                    <Button
                                      variant="link"
                                      onClick={() =>
                                        setSearchParams({
                                          teamId: team.teamId.toString(),
                                        })
                                      }
                                    >
                                      {team.casualName}
                                    </Button>
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
                                  </div>
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
    </div>
  )
}

export default Map
