import { useQuery } from 'react-query'
import { getSingleSeason } from '../../requests/seasons'
import { getSingleSeasonTable } from '../../requests/tables'
import { useParams, Link, useLocation } from 'react-router-dom'
import { useContext, useState, useEffect, useRef } from 'react'
import { GenderContext } from '../../contexts/contexts'

import { sortOrder } from '../utilitycomponents/constants'
import Spinner from '../utilitycomponents/spinner'
import SeasonHelpModal from './SeasonHelpModal'
import PlayoffModal from './PlayoffModal'
import TableList from './TableList'
import RoundForRound from './RoundForRound'
import PlayoffSeriesPopup from './PlayoffSeriesPopup'

import { tableSortFunction } from '../utilitycomponents/sortFunction'
import { LeftArrow, RightArrow } from '../utilitycomponents/icons'
import GenderButtonComponent from '../utilitycomponents/GenderButtonComponent'
import {
  ButtonComponent,
  HiddenButtonComponent,
} from '../utilitycomponents/ButtonComponents'

const Season = () => {
  const seasonId = parseInt(useParams().seasonId)
  const { women, dispatch } = useContext(GenderContext)
  const topRef = useRef()
  const bottomRef = useRef()
  const [grupp, setGrupp] = useState('')
  const [roundForRound, setRoundForRound] = useState(false)
  const [showHelpModal, setShowHelpModal] = useState(false)
  const [showPlayoffModal, setShowPlayoffModal] = useState(false)
  const [round, setRound] = useState(1)
  const [gameData, setGameData] = useState(null)
  const [showPlayoffGames, setShowPlayoffGames] = useState(false)

  const location = useLocation()
  useEffect(() => {
    if (location.state && location.state.resetRound) {
      setRound(1)
      setRoundForRound(false)
    }
  }, [location])

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }, [])

  const {
    data: season,
    isLoading,
    error,
  } = useQuery(['singleSeason', seasonId], () => getSingleSeason(seasonId))
  const {
    data,
    isLoading: isTableLoading,
    error: tableError,
  } = useQuery(['singleSeasonTable', seasonId], () =>
    getSingleSeasonTable(seasonId),
  )
  if (isLoading || isTableLoading) {
    return (
      <div className="mx-auto grid h-screen place-items-center font-inter text-[#011d29]">
        <Spinner />
      </div>
    )
  }

  if (error || tableError) {
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

  const tables = data.tabell.filter((table) => table.women === women)

  const playoffGames = data.playoffGames.filter(
    (table) => table.women === women,
  )
  const roundByRoundTables = data.roundByRoundTables.filter(
    (table) => table.womens_table === women,
  )
  const groups = new Set(roundByRoundTables.map((team) => team.group))
  const teams = tables.map((team) => team.lag)
  const groupsArray = Array.from(groups)
  const final = tables.filter((table) => table.category === 'final')
  const unsortedSemiTables = tables.filter((table) => table.category === 'semi')
  const unsortedQuarterTables = tables.filter(
    (table) => table.category === 'quarter',
  )
  const unsortedEightTables = tables.filter(
    (table) => table.category === 'eight',
  )
  const unsortedRegularTables = tables.filter(
    (table) => table.category === 'regular',
  )
  const unsortedQualificationTables = tables.filter(
    (table) => table.category === 'qualification',
  )

  const semiTables = tableSortFunction(unsortedSemiTables)
  const quarterTables = tableSortFunction(unsortedQuarterTables)
  const eightTables = tableSortFunction(unsortedEightTables)
  const regularTables = tableSortFunction(unsortedRegularTables)
  const qualificationTables = tableSortFunction(unsortedQualificationTables)

  const seriesInfo = season.find((season) => season.women === women).series
  const bonusPointsArray = seriesInfo.map((serie) => {
    return {
      group: serie.serieGroupCode,
      bonusPoints: JSON.parse(serie.bonusPoints),
    }
  })

  if (women && seasonId < 1973) {
    return (
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col font-inter text-[#011d29]">
        <div className="flex flex-row justify-end">
          <div>
            <GenderButtonComponent
              women={women}
              clickFunctions={() => {
                setRound(1)
                setRoundForRound(false)
                dispatch({ type: 'TOGGLE' })
              }}
            />
          </div>
        </div>
        <div className="mx-auto grid place-items-center font-inter text-[#011d29]">
          <p className="p-16 text-center">
            Första säsongen för damernas högsta serie var{' '}
            <Link to="/season/1973" className="font-bold">
              1972/73
            </Link>
            .
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto mt-2 flex min-h-screen max-w-7xl flex-col font-inter text-[#011d29]">
      <div className="flex flex-row justify-between">
        <div className="mb-4 flex w-full flex-row items-center justify-evenly">
          {seasonId - 1 === 1906 ? null : (
            <Link to={`/season/${seasonId - 1}`} state={{ resetRound: true }}>
              <LeftArrow />
            </Link>
          )}
          <h2 className="text-center text-base font-bold leading-4 sm:text-xl lg:text-2xl">
            Säsong {season[0].year} {women ? 'Damer' : 'Herrar'}
          </h2>

          {seasonId + 1 === 2025 ? null : (
            <Link to={`/season/${seasonId + 1}`} state={{ resetRound: true }}>
              <RightArrow />
            </Link>
          )}
        </div>
      </div>
      <div className="flex flex-row-reverse justify-between">
        {seasonId === 2024 && (
          <div className="mx-auto grid place-items-center font-inter text-[#011d29]">
            <p>Inga resultat än.</p>
          </div>
        )}
        {women && seasonId < 1973 && (
          <div className="mx-auto grid h-screen place-items-center font-inter text-[#011d29]">
            <p>
              Första säsongen för damernas högsta serie var{' '}
              <Link to="/season/1973" className="font-bold">
                1972/73
              </Link>
              .
            </p>
          </div>
        )}
        {seasonId < 2024 && (
          <div ref={topRef}>
            <div className="flex flex-col-reverse justify-start gap-2 pr-2 md:mr-4 xl:mr-0 xl:flex-row xl:justify-between">
              <Link to={`/games/${seasonId}`}>
                <ButtonComponent clickFunctions={() => {}}>
                  Matcher
                </ButtonComponent>
              </Link>
              <HiddenButtonComponent
                clickFunctions={() => setShowPlayoffModal(true)}
              >
                Slutspel
              </HiddenButtonComponent>

              <ButtonComponent clickFunctions={() => setShowHelpModal(true)}>
                Hjälp/Info
              </ButtonComponent>

              <GenderButtonComponent
                women={women}
                clickFunctions={() => {
                  setRound(1)
                  setRoundForRound(false)
                  dispatch({ type: 'TOGGLE' })
                }}
              />
            </div>
            <div className="m-0 hidden justify-self-center text-base xl:contents">
              <h2 className="text-right text-xl font-bold">Slutspel</h2>

              <div className="flex w-[36rem] flex-col">
                <h5 className="text-right text-sm font-bold">Final</h5>
                <div className="mb-6 self-center">
                  <table className="w-32 table-fixed">
                    <thead>
                      <tr className="text-[0.5rem]">
                        <th scope="col" className="w-22 mx-1 p-1"></th>
                        <th
                          scope="col"
                          className="mx-1 w-8 p-1 text-right"
                        ></th>
                      </tr>
                    </thead>
                    <tbody>
                      {final.map((team, index) => {
                        return (
                          <tr key={`${team.teamId}-${index}`}>
                            <td>{team.lag.casualName}</td>
                            <td className="text-right">
                              {team.total_goals_scored}
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
                {semiTables.length > 0 && (
                  <h5 className="text-right text-sm font-bold">Semi</h5>
                )}
                <div className="mb-6 flex flex-row justify-around">
                  {semiTables.map((group, index) => {
                    return (
                      <div
                        key={`${group.group}-${index}`}
                        className="m-2 cursor-pointer gap-2 "
                        onMouseEnter={() => {
                          setGameData(
                            playoffGames.filter(
                              (game) => game.group === group.group,
                            ),
                          )
                          setShowPlayoffGames(true)
                        }}
                        onMouseLeave={() => {
                          setGameData(null)
                          setShowPlayoffGames(false)
                        }}
                      >
                        <table
                          className="w-32 table-fixed"
                          key={`semi-${Math.random()}`}
                        >
                          <thead>
                            <tr
                              className="text-[0.5rem]"
                              key={`semi-tablehead-${Math.random()}`}
                            >
                              <th scope="col" className="w-22 mx-1 p-1"></th>
                              <th
                                scope="col"
                                className="mx-1 w-8 p-1 text-right"
                              ></th>
                            </tr>
                          </thead>
                          <tbody>
                            {group.tables.map((team) => {
                              return (
                                <tr key={`${team.teamId}-${Math.random()}`}>
                                  <td>{team.lag.casualName}</td>
                                  <td className="text-right">
                                    {team.total_wins}
                                  </td>
                                </tr>
                              )
                            })}
                          </tbody>
                        </table>
                      </div>
                    )
                  })}
                </div>
                {quarterTables.length > 0 && (
                  <h5 className="text-right text-sm font-bold">Kvart</h5>
                )}
                <div className="mb-6 flex flex-row justify-around">
                  {quarterTables.map((group) => {
                    return (
                      <div
                        className="cursor-pointer "
                        key={group.group}
                        onMouseEnter={() => {
                          setGameData(
                            playoffGames.filter(
                              (game) => game.group === group.group,
                            ),
                          )
                          setShowPlayoffGames(true)
                        }}
                        onMouseLeave={() => {
                          setGameData(null)
                          setShowPlayoffGames(false)
                        }}
                      >
                        <table className="w-32 table-fixed">
                          <thead>
                            <tr
                              className="text-[0.5rem]"
                              key="quarter-tablehead"
                            >
                              <th scope="col" className="w-22 mx-1 p-1"></th>
                              <th
                                scope="col"
                                className="mx-1 w-8 p-1 text-right"
                              ></th>
                            </tr>
                          </thead>
                          <tbody>
                            {group.tables.map((team, index) => {
                              return (
                                <tr key={`${team.teamId}-${index}`}>
                                  <td>{team.lag.casualName}</td>
                                  <td className="text-right">
                                    {team.total_wins}
                                  </td>
                                </tr>
                              )
                            })}
                          </tbody>
                        </table>
                      </div>
                    )
                  })}
                </div>
                {eightTables.length > 0 && (
                  <h5 className="text-right text-sm font-bold">Åttondel</h5>
                )}
                <div className="mb-6 flex flex-row flex-wrap justify-around">
                  {eightTables.map((group) => {
                    return (
                      <div
                        className="cursor-pointer"
                        key={group.group}
                        onMouseEnter={() => {
                          setGameData(
                            playoffGames.filter(
                              (game) => game.group === group.group,
                            ),
                          )
                          setShowPlayoffGames(true)
                        }}
                        onMouseLeave={() => {
                          setGameData(null)
                          setShowPlayoffGames(false)
                        }}
                      >
                        <table className="w-30 table-fixed">
                          <thead>
                            <tr
                              key="eight-table-head"
                              className="text-[0.5rem]"
                            >
                              <th scope="col" className="w-16 p-1"></th>
                              <th scope="col" className="w-6 p-1">
                                P
                              </th>

                              <th scope="col" className="w-6 p-1 text-right">
                                MS
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {group.tables.map((team) => {
                              return (
                                <tr key={`${team.teamId}-${Math.random()}`}>
                                  <td className="p-1">{team.lag.shortName}</td>
                                  <td className="p-1 text-center">
                                    {team.total_points}
                                  </td>
                                  <td className="p-1 text-right">
                                    {team.total_goal_difference}
                                  </td>
                                </tr>
                              )
                            })}
                          </tbody>
                        </table>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {seasonId < 2024 && (
          <div className="w-full px-2 xl:px-4 ">
            <div
              onClick={() => {
                setGrupp(
                  groupsArray.sort((a, b) => {
                    if (sortOrder.indexOf(a) > sortOrder.indexOf(b)) {
                      return 1
                    }

                    if (sortOrder.indexOf(a) < sortOrder.indexOf(b)) {
                      return -1
                    }
                  })[0],
                )
                setRound(1)
                setRoundForRound(!roundForRound)
              }}
              className="mb-2 w-full cursor-pointer rounded-md bg-[#011d29] px-1 py-0.5 text-center text-sm text-white transition-all duration-150 ease-in-out hover:bg-slate-600 lg:px-2 lg:py-1 lg:text-lg xl:mb-6"
            >
              {roundForRound ? 'Visa tabeller' : 'Visa utveckling'}
            </div>
            {!roundForRound && (
              <div>
                {regularTables.length > 0 && (
                  <TableList
                    tableArray={regularTables}
                    seriesInfo={seriesInfo}
                    bonusPoints={bonusPointsArray}
                  />
                )}
                {qualificationTables.length > 0 && (
                  <TableList
                    tableArray={qualificationTables}
                    seriesInfo={seriesInfo}
                    bonusPoints={bonusPointsArray}
                  />
                )}
              </div>
            )}
            {roundForRound && groupsArray.length > 1 && (
              <div>
                <div className="flex w-full flex-row justify-between">
                  {groupsArray
                    .sort((a, b) => {
                      if (sortOrder.indexOf(a) > sortOrder.indexOf(b)) {
                        return 1
                      }

                      if (sortOrder.indexOf(a) < sortOrder.indexOf(b)) {
                        return -1
                      }
                    })
                    .map((group) => {
                      return (
                        <div
                          key={group}
                          onClick={() => {
                            setRound(1)
                            setGrupp(group)
                          }}
                          className={
                            grupp === group
                              ? 'w-30 mt-3 cursor-pointer rounded-md border-[#011d29] bg-slate-200 px-2 py-1 text-center text-[#011d29]'
                              : 'w-30 mt-3 cursor-pointer rounded-md bg-slate-200 px-2 py-1 text-center text-[#011d29]'
                          }
                        >
                          {
                            seriesInfo.find(
                              (serie) => serie.serieGroupCode === group,
                            ).serieName
                          }
                        </div>
                      )
                    })}
                </div>
                <RoundForRound
                  array={roundByRoundTables.filter(
                    (table) => table.group === grupp,
                  )}
                  round={round}
                  setRound={setRound}
                  seriesInfo={seriesInfo}
                  teams={teams}
                  bonusPoints={bonusPointsArray}
                />
              </div>
            )}
            {roundForRound && groupsArray.length === 1 && (
              <div>
                <RoundForRound
                  array={roundByRoundTables}
                  round={round}
                  setRound={setRound}
                  seriesInfo={seriesInfo}
                  teams={teams}
                  bonusPoints={bonusPointsArray}
                />
              </div>
            )}
          </div>
        )}
      </div>
      {showHelpModal ? (
        <>
          <SeasonHelpModal setShowModal={setShowHelpModal} />
        </>
      ) : null}
      {showPlayoffModal ? (
        <>
          <PlayoffModal
            setShowModal={setShowPlayoffModal}
            final={final}
            semiTables={semiTables}
            quarterTables={quarterTables}
            eightTables={eightTables}
            playoffGames={playoffGames}
          />
        </>
      ) : null}
      {showPlayoffGames ? (
        <>
          <PlayoffSeriesPopup gameData={gameData} />
        </>
      ) : null}
      <div ref={bottomRef}></div>
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

export default Season
