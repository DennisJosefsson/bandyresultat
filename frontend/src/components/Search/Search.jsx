import { useQuery } from 'react-query'
import { useState, useContext, useReducer, useEffect } from 'react'
import { getSeasons } from '../../requests/seasons'
import { getTeams } from '../../requests/teams'
import { getSearch } from '../../requests/games'
import { GenderContext } from '../../contexts/contexts'
import searchReducer from '../../reducers/searchReducer'
import Spinner from '../utilitycomponents/spinner'

const initForm = {
  team: null,
  opponent: null,
  result: '',
  categoryArray: [
    'final',
    'semi',
    'quarter',
    'eight',
    'regular',
    'qualification',
  ],
  limit: 10,
  orderVar: '',
  gameResult: '',
  order: 'desc',
  startSeason: null,
  endSeason: null,
}

const Search = () => {
  const [searchParams, setSearchParams] = useState(null)

  const { women, dispatch: genderDispatch } = useContext(GenderContext)
  const [startYear, setStartYear] = useState(null)
  const [endYear, setEndYear] = useState(null)
  const [specificDate, setSpecificDate] = useState(new Date(2023, 11, 26))
  const [formState, searchDispatch] = useReducer(searchReducer, initForm)
  const {
    data: teams,
    isLoading: isTeamsLoading,
    error: isTeamsError,
  } = useQuery('teams', getTeams)
  const {
    data: seasons,
    isLoading: isSeasonsLoading,
    error: isSeasonsError,
  } = useQuery('seasons', getSeasons)
  const { data: searchResult } = useQuery({
    queryKey: ['search', searchParams],
    queryFn: () => getSearch(searchParams),
    enabled: !!searchParams,
  })

  if (isTeamsLoading || isSeasonsLoading) {
    return (
      <div className="mx-auto grid h-screen place-items-center font-inter text-[#011d29]">
        <Spinner />
      </div>
    )
  }

  if (isTeamsError || isSeasonsError) {
    return (
      <div className="mx-auto grid h-screen place-items-center font-inter text-[#011d29]">
        Något gick fel.
      </div>
    )
  }

  const filteredTeams = teams.filter((team) => team.women === women)
  const filteredSeasons = seasons.filter((season) => season.women === women)

  const startYearString = new Date(
    filteredSeasons[filteredSeasons.length - 1].year.includes('/')
      ? filteredSeasons[filteredSeasons.length - 1].year.split('/').slice(1)
      : filteredSeasons[filteredSeasons.length - 1].year,
  )
  const endYearString = new Date(filteredSeasons[0].year.split('/').slice(1))

  const teamSelection = filteredTeams.map((team) => {
    return { value: team.teamId, label: team.casualName }
  })

  const limitSelection = [
    { value: 5, label: '5' },
    { value: 10, label: '10' },
    { value: 15, label: '15' },
    { value: 20, label: '20' },
  ]

  const orderSelection = [
    { value: 'asc', label: 'Stigande' },
    { value: 'desc', label: 'Fallande' },
  ]

  const handleStartYearChange = (date) => {
    const stringDate = date.toString()
    const year =
      Number(stringDate.split(' ')[3]) < 1964
        ? stringDate
        : `${Number(stringDate.split(' ')[3]) - 1}/${stringDate.split(' ')[3]}`

    const seasonId = filteredSeasons.find(
      (season) => season.year === year,
    ).seasonId

    searchDispatch({ type: 'INPUT', field: 'startSeason', payload: seasonId })
    setStartYear(date)
  }

  const handleEndYearChange = (date) => {
    const stringDate = date.toString()
    const year =
      Number(stringDate.split(' ')[3]) < 1964
        ? stringDate
        : `${Number(stringDate.split(' ')[3]) - 1}/${stringDate.split(' ')[3]}`

    const seasonId = filteredSeasons.find(
      (season) => season.year === year,
    ).seasonId

    searchDispatch({ type: 'INPUT', field: 'endSeason', payload: seasonId })
    setEndYear(date)
  }

  const handleSpecificDate = (date) => {
    console.log(date)
    setSpecificDate(date)
  }

  const months = [
    'Januari',
    'Februari',
    'Mars',
    'April',
    'Maj',
    'Juni',
    'Juli',
    'Augusti',
    'September',
    'Oktober',
    'November',
    'December',
  ]

  return <div></div>
}

export default Search
