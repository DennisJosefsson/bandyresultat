import { useQuery } from 'react-query'
import { getSeasons } from '../../requests/seasons'
import { Link } from 'react-router-dom'
import { useState, useRef } from 'react'
import Spinner from '../utilitycomponents/spinner'

const Seasons = () => {
  const [seasonFilter, setSeasonFilter] = useState('')
  const topRef = useRef()
  const bottomRef = useRef()
  const { data, isLoading, error } = useQuery('allSeasons', getSeasons)
  if (isLoading) {
    return (
      <div className="grid h-screen place-items-center mx-auto font-inter text-[#011d29]">
        <Spinner />
      </div>
    )
  }

  if (error) {
    return (
      <div className="grid h-screen place-items-center mx-auto font-inter text-[#011d29]">
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
      className="max-w-7xl min-h-screen mx-auto mb-2 font-inter text-[#011d29]"
      ref={topRef}
    >
      <div className="w-full ">
        <form>
          <input
            className="border-[#011d29] focus:border-[#011d29] w-full"
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-8 gap-y-2 justify-between pt-2">
          {seasons.map((season) => {
            const seasonYear =
              parseInt(season.year.split('/')[1]) >= 1964
                ? season.year.split('/')[1]
                : season.year
            if (!season.women) {
              return (
                <div
                  key={season.seasonId}
                  className="flex flex-row items-center justify-between text-[1.125rem] bg-white px-2 py-1"
                >
                  <div className="font-semibold w-28">{season.year}</div>
                  <div className="bg-slate-300 lg:bg-white rounded-md lg:rounded-0 px-2 py-1 xl:p-0 w-1/4 text-center">
                    <Link
                      to={`/season/${seasonYear}`}
                      className="tabular-nums font-medium lg:font-normal hover:font-bold"
                    >
                      Tabeller
                    </Link>
                  </div>
                  <div className="bg-slate-300 lg:bg-white rounded-md px-2 py-1 xl:p-0 w-1/4 text-center">
                    <Link
                      to={`/games/${seasonYear}`}
                      className="font-medium lg:font-normal hover:font-bold"
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
      <div className="sticky bottom-0 flex flex-row gap-2 justify-center bg-[#f4f5f5] z-20 items-center">
        <div
          onClick={(event) => scrollTo(event, topRef)}
          className="cursor-pointer rounded-md px-1 py-0.5 lg:px-2 lg:py-1 bg-[#93B8C1] text-[10px] lg:text-sm text-[#011d29] text-center my-2 select-none"
        >
          Scrolla upp
        </div>
        <div
          onClick={(event) => scrollTo(event, bottomRef)}
          className="cursor-pointer rounded-md px-1 py-0.5 lg:px-2 lg:py-1 bg-[#93B8C1] text-[10px] lg:text-sm text-[#011d29] text-center my-2 select-none"
        >
          Scrolla ner
        </div>
      </div>
    </div>
  )
}

export default Seasons
