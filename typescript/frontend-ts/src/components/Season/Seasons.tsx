import { useState, KeyboardEvent, Suspense } from 'react'

import SeasonsList from './Subcomponents/SeasonsList'
import FilterComponent from './Subcomponents/FilterComponent'
import {
  Loading,
  DataError,
} from '../utilitycomponents/Components/LoadingAndError/LoadingOrError'

import useScrollTo from '../../hooks/domHooks/useScrollTo'
import useGetAllSeasons from '@/src/hooks/dataHooks/seasonHooks/useGetAllSeasons'
import { Card, CardContent } from '@/src/@/components/ui/card'

const Seasons = () => {
  const [seasonFilter, setSeasonFilter] = useState('')
  const { seasons, error } = useGetAllSeasons()

  useScrollTo()

  if (error) return <DataError error={error} />

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault()
    }
  }

  return (
    <div className="mx-auto mb-2 min-h-screen w-full px-1 font-inter text-foreground">
      <Card>
        <CardContent>
          <FilterComponent
            seasonFilter={seasonFilter}
            setSeasonFilter={setSeasonFilter}
            handleKeyDown={handleKeyDown}
          />

          <div className="self-center">
            <Suspense fallback={<Loading />}>
              <SeasonsList
                seasons={seasons.filter((season) =>
                  season.year.includes(seasonFilter),
                )}
              />
            </Suspense>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Seasons
