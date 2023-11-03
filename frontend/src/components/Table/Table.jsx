import { useQuery } from 'react-query'
import { useContext, useState, useEffect, useRef } from 'react'
import { maratonTabell } from '../../requests/tables'
import { GenderContext, TeamPreferenceContext } from '../../contexts/contexts'

import Spinner from '../utilitycomponents/spinner'

import { ButtonComponent } from '../utilitycomponents/ButtonComponents'

const Table = () => {
  const { women } = useContext(GenderContext)
  const { favTeams } = useContext(TeamPreferenceContext)
  const [selectedTable, setSelectedTable] = useState('all')
  const [homeAwayTitle, setHomeAwayTitle] = useState('')
  const topRef = useRef()
  const bottomRef = useRef()

  const { data, isLoading, error } = useQuery('maratonTabell', maratonTabell)
  const [width, setWidth] = useState(window.innerWidth)
  const breakpoint = 576

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
    const handleWindowResize = () => setWidth(window.innerWidth)
    window.addEventListener('resize', handleWindowResize)

    return () => window.removeEventListener('resize', handleWindowResize)
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
  const scrollTo = (event, ref) => {
    event.preventDefault()
    window.scrollTo(0, ref.current.offsetTop)
  }
  let tabell
  switch (selectedTable) {
    case 'all':
      tabell = data.maratonTabell.filter((table) => table.lag.women === women)
      break
    case 'home':
      tabell = data.maratonHemmaTabell.filter(
        (table) => table.lag.women === women,
      )
      break
    case 'away':
      tabell = data.maratonBortaTabell.filter(
        (table) => table.lag.women === women,
      )
      break
  }

  return (
    <div ref={topRef}>
      <h2 className="mt-4 text-center text-base font-bold leading-4 sm:text-xl lg:text-2xl">
        Maratontabell {women ? 'Damer' : 'Herrar'} {homeAwayTitle}
      </h2>

      <div className="mx-auto mt-4 flex min-h-screen max-w-7xl flex-col font-inter text-[#011d29]">
        <div className="flex flex-row justify-center gap-4">
          <div>
            <ButtonComponent
              clickFunctions={() => {
                setSelectedTable('home')
                setHomeAwayTitle('Hemma')
              }}
            >
              Hemma
            </ButtonComponent>
          </div>
          <div>
            <ButtonComponent
              clickFunctions={() => {
                setSelectedTable('away')
                setHomeAwayTitle('Borta')
              }}
            >
              Borta
            </ButtonComponent>
          </div>
          <div>
            <ButtonComponent
              clickFunctions={() => {
                setSelectedTable('all')
                setHomeAwayTitle('')
              }}
            >
              Alla
            </ButtonComponent>
          </div>
        </div>
        <div className="w-full">
          <table className="w-full table-auto text-[10px] md:text-xs lg:text-base">
            <thead>
              <tr className="maraton" key={'header'}>
                <th scope="col" className="pos">
                  Pos
                </th>
                <th scope="col" className="team">
                  Lag
                </th>
                <th scope="col">M</th>
                <th scope="col">V</th>
                <th scope="col">O</th>
                <th scope="col">F</th>
                <th scope="col">GM</th>
                <th scope="col">IM</th>
                <th scope="col">MS</th>
                <th scope="col">Poä</th>
              </tr>
            </thead>
            <tbody>
              {tabell.map((team, index) => {
                return (
                  <tr
                    key={`${team.team}-${index}`}
                    className={
                      favTeams.includes(team.team)
                        ? 'maraton rounded font-bold odd:bg-slate-300'
                        : 'maraton rounded odd:bg-slate-300'
                    }
                  >
                    <td className="center">{index + 1}</td>
                    <td className="left">
                      {width < breakpoint
                        ? `${team.lag.shortName}`
                        : `${team.lag.name}`}
                    </td>
                    <td>{team.total_games}</td>
                    <td>{team.total_wins}</td>
                    <td>{team.total_draws}</td>
                    <td>{team.total_lost}</td>
                    <td>{team.total_goals_scored}</td>
                    <td>{team.total_goals_conceded}</td>
                    <td>{team.total_goal_difference}</td>
                    <td>{team.total_points}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
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

export default Table
