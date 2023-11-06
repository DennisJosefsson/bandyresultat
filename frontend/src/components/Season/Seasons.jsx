import { useQuery } from 'react-query'
import { getSeasons } from '../../requests/seasons'
import { Link } from 'react-router-dom'
import { useState, useRef, useEffect } from 'react'

import Spinner from '../utilitycomponents/Components/spinner'

const Seasons = () => {
  const [seasonFilter, setSeasonFilter] = useState('')
  const topRef = useRef()
  const bottomRef = useRef()
  const { data, isLoading, error } = useQuery('allSeasons', getSeasons)

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }, [])

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

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault()
    }
  }

  const scrollTo = (event, ref) => {
    event.preventDefault()
    window.scrollTo(0, ref.current.offsetTop)
  }

  const seasons = data.filter((season) => season.year.includes(seasonFilter))

  return (
    <div
      className="mx-auto mb-2 min-h-screen max-w-7xl font-inter text-[#011d29]"
      ref={topRef}
    >
      <div className="w-full ">
        <form>
          <input
            className="w-full border-[#011d29] focus:border-[#011d29]"
            type="text"
            placeholder="Filter"
            value={seasonFilter}
            name="seasonFilter"
            onChange={(event) =>
              setSeasonFilter(event.target.value.replace(/[^0-9]/gi, ''))
            }
            onKeyDown={handleKeyDown}
          />
        </form>
      </div>

      <div className="self-center">
        <div className="grid grid-cols-1 justify-between gap-x-8 gap-y-2 pt-2 sm:grid-cols-2 lg:grid-cols-3">
          {seasons.map((season) => {
            const seasonYear =
              parseInt(season.year.split('/')[1]) >= 1964
                ? season.year.split('/')[1]
                : season.year
            if (!season.women) {
              return (
                <div
                  key={season.seasonId}
                  className="flex flex-row items-center justify-between bg-white px-2 py-1 text-sm lg:text-base"
                >
                  <div className="w-28 font-semibold">{season.year}</div>
                  <div className="rounded-md bg-slate-300 px-2 py-1 text-center lg:bg-white xl:p-0">
                    <Link
                      to={`/season/${seasonYear}`}
                      className="font-medium tabular-nums hover:font-bold lg:font-normal"
                    >
                      Tabeller
                    </Link>
                  </div>
                  <div className="rounded-md bg-slate-300 px-2 py-1 text-center lg:bg-white xl:p-0">
                    <Link
                      to={`/season/${seasonYear}`}
                      state={{ tab: 'games' }}
                      className="font-medium hover:font-bold lg:font-normal"
                    >
                      Matcher
                    </Link>
                  </div>
                </div>
              )
            }
          })}
          <div ref={bottomRef}></div>
        </div>
      </div>
      <div className="sticky bottom-0 z-20 flex flex-row items-center justify-center gap-2 bg-[#f4f5f5]">
        <div
          onClick={(event) => scrollTo(event, topRef)}
          className="my-2 cursor-pointer select-none rounded-md bg-[#93B8C1] px-1 py-0.5 text-center text-[10px] text-[#011d29] lg:px-2 lg:py-1 lg:text-sm"
        >
          Scrolla upp
        </div>
        <div
          onClick={(event) => scrollTo(event, bottomRef)}
          className="my-2 cursor-pointer select-none rounded-md bg-[#93B8C1] px-1 py-0.5 text-center text-[10px] text-[#011d29] lg:px-2 lg:py-1 lg:text-sm"
        >
          Scrolla ner
        </div>
      </div>
    </div>
  )
}

export default Seasons
