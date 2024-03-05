import { useState, useRef, KeyboardEvent } from 'react'

import SeasonsList from './Subcomponents/SeasonsList'
import FilterComponent from './Subcomponents/FilterComponent'
import {
  Loading,
  DataError,
} from '../utilitycomponents/Components/LoadingOrError'
import ScrollRefComponent from '../utilitycomponents/Components/ScrollRefComponent'
import useScrollTo from '../../hooks/domHooks/useScrollTo'
import useGetAllSeasons from '../../hooks/dataHooks/seasonHooks/useGetAllSeasons'

const Seasons = () => {
  const [seasonFilter, setSeasonFilter] = useState('')
  const topRef = useRef(null)
  const bottomRef = useRef(null)
  const { seasons, isLoading, error } = useGetAllSeasons()

  useScrollTo()

  if (error) return <DataError />

  if (isLoading) return <Loading />

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault()
    }
  }

  return (
    <div
      className="mx-auto mb-2 min-h-screen max-w-7xl font-inter text-[#011d29]"
      ref={topRef}
    >
      <FilterComponent
        seasonFilter={seasonFilter}
        setSeasonFilter={setSeasonFilter}
        handleKeyDown={handleKeyDown}
      />

      <div className="self-center">
        <SeasonsList
          seasons={seasons.filter((season) =>
            season.year.includes(seasonFilter),
          )}
        />
        <div ref={bottomRef}></div>
      </div>
      <ScrollRefComponent bottomRef={bottomRef} topRef={topRef} />
    </div>
  )
}

export default Seasons
