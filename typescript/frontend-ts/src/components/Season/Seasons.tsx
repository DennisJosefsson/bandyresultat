import { useQuery } from 'react-query'
import { getSeasons } from '../../requests/seasons'

import { useState, useRef, useEffect, KeyboardEvent } from 'react'

import SeasonsList from './Subcomponents/SeasonsList'
import FilterComponent from './Subcomponents/FilterComponent'
import LoadingOrError from '../utilitycomponents/Components/LoadingOrError'
import ScrollRefComponent from '../utilitycomponents/Components/ScrollRefComponent'

const Seasons = () => {
  const [seasonFilter, setSeasonFilter] = useState('')
  const topRef = useRef(null)
  const bottomRef = useRef(null)
  const { data, isLoading, error, isSuccess } = useQuery(
    'allSeasons',
    getSeasons,
  )

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }, [])

  if (isLoading || error)
    return <LoadingOrError isLoading={isLoading} error={error} />

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault()
    }
  }

  const seasons = isSuccess
    ? data.filter((season) => season.year.includes(seasonFilter))
    : []

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
        <SeasonsList seasons={seasons} />
        <div ref={bottomRef}></div>
      </div>
      <ScrollRefComponent bottomRef={bottomRef} topRef={topRef} />
    </div>
  )
}

export default Seasons
