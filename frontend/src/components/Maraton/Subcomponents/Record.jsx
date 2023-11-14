import { getStreaks } from '../../../requests/games'
import { useQuery } from 'react-query'
import { useContext, useRef, useState, useEffect } from 'react'
import { GenderContext } from '../../../contexts/contexts'

import Spinner from '../../utilitycomponents/Components/spinner'

import { ButtonComponent } from '../../utilitycomponents/Components/ButtonComponents'
import dayjs from 'dayjs'
import 'dayjs/locale/sv'
dayjs.locale('sv')

const Record = () => {
  const { women } = useContext(GenderContext)
  const [params, setParams] = useState({ record: 'generalStats', women: women })
  const [title, setTitle] = useState('Statistik')
  const { data, isLoading, error } = useQuery(['streaks', params], () =>
    getStreaks(params),
  )
  const topRef = useRef(null)
  const bottomRef = useRef(null)

  useEffect(() => {
    setParams((params) => ({ ...params, women: women }))
  }, [women])

  console.log(data)

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

  return (
    <div
      className="mx-auto mt-4 min-h-screen max-w-7xl font-inter text-[#011d29]"
      ref={topRef}
    >
      <div className="flex flex-col">
        <div>
          <h2 className="mb-4 text-center text-base font-bold leading-4 sm:text-xl md:mb-6 lg:text-2xl">
            {title} {women ? 'Damer' : 'Herrar'}
          </h2>
        </div>
        <div className="mb-2 flex flex-row justify-center gap-1 md:gap-4">
          <ButtonComponent
            clickFunctions={() => {
              setParams((params) => ({ ...params, record: 'generalStats' }))
              setTitle('Statistik')
            }}
          >
            Statistik
          </ButtonComponent>
          <ButtonComponent
            clickFunctions={() => {
              setParams((params) => ({ ...params, record: 'points' }))
              setTitle('Poäng Elitserien')
            }}
          >
            Poäng
          </ButtonComponent>
          <ButtonComponent
            clickFunctions={() => {
              setParams((params) => ({ ...params, record: 'scored' }))
              setTitle('Gjorda mål Elitserien')
            }}
          >
            Gjorda mål
          </ButtonComponent>
          <ButtonComponent
            clickFunctions={() => {
              setParams((params) => ({ ...params, record: 'conceded' }))
              setTitle('Insläppta mål Elitserien')
            }}
          >
            Insl. mål
          </ButtonComponent>
          <ButtonComponent
            clickFunctions={() => {
              setParams((params) => ({ ...params, record: 'streaks' }))
              setTitle('Rekordsviter')
            }}
          >
            Rekordsviter
          </ButtonComponent>
        </div>
        <div className="flex flex-col">
          {(params.record === 'points' ||
            params.record === 'scored' ||
            params.record === 'conceded') && (
            <div className="ml-4 xl:ml-0">
              <h3 className="mb-2 px-2 text-sm font-bold leading-4 sm:text-lg lg:text-xl">
                Högsta
              </h3>
              <div className="grid grid-cols-1 gap-2 lg:grid-cols-2 xl:grid-cols-3">
                <div className="p-2">
                  <h3 className="mb-2 text-sm font-bold leading-4 sm:text-lg lg:text-xl">
                    Genomsnitt
                  </h3>
                  <div className="table">
                    {data.avgMaxAll.map((team, index) => {
                      return (
                        <div
                          className="recordCard"
                          key={`${team.data}-${Math.random()}`}
                        >
                          <div className="pos">{index + 1}</div>
                          <div className="flex flex-col">
                            <div className="record1st">
                              <div className="name">{team.lag.name}</div>
                              <div className="count">{team.data}</div>
                            </div>
                            <div className="record2nd">
                              <div className="dates">{team.season.year}</div>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
                <div className="p-2">
                  <h3 className="mb-2 text-sm font-bold leading-4 sm:text-lg lg:text-xl">
                    Genomsnitt Hemma
                  </h3>
                  <div className="table">
                    {data.avgMaxHome.map((team, index) => {
                      return (
                        <div
                          className="recordCard"
                          key={`${team.data}-${Math.random()}`}
                        >
                          <div className="pos">{index + 1}</div>
                          <div className="flex flex-col">
                            <div className="record1st">
                              <div className="name">{team.lag.name}</div>
                              <div className="count">{team.data}</div>
                            </div>
                            <div className="record2nd">
                              <div className="dates">{team.season.year}</div>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
                <div className="p-2">
                  <h3 className="mb-2 text-sm font-bold leading-4 sm:text-lg lg:text-xl">
                    Genomsnitt Borta
                  </h3>
                  <div className="table">
                    {data.avgMaxAway.map((team, index) => {
                      return (
                        <div
                          className="recordCard"
                          key={`${team.data}-${Math.random()}`}
                        >
                          <div className="pos">{index + 1}</div>
                          <div className="flex flex-col">
                            <div className="record1st">
                              <div className="name">{team.lag.name}</div>
                              <div className="count">{team.data}</div>
                            </div>
                            <div className="record2nd">
                              <div className="dates">{team.season.year}</div>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
              <h3 className="mb-2 px-2 text-sm font-bold leading-4 sm:text-lg lg:text-xl">
                Lägsta
              </h3>
              <div className="grid grid-cols-1 gap-2 lg:grid-cols-2 xl:grid-cols-3">
                <div className="p-2">
                  <h3 className="mb-2 text-sm font-bold leading-4 sm:text-lg lg:text-xl">
                    Genomsnitt
                  </h3>
                  <div className="table">
                    {data.avgMinAll.map((team, index) => {
                      return (
                        <div
                          className="recordCard"
                          key={`${team.data}-${Math.random()}`}
                        >
                          <div className="pos">{index + 1}</div>
                          <div className="flex flex-col">
                            <div className="record1st">
                              <div className="name">{team.lag.name}</div>
                              <div className="count">{team.data}</div>
                            </div>
                            <div className="record2nd">
                              <div className="dates">{team.season.year}</div>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
                <div className="p-2">
                  <h3 className="mb-2 text-sm font-bold leading-4 sm:text-lg lg:text-xl">
                    Genomsnitt Hemma
                  </h3>
                  <div className="table">
                    {data.avgMinHome.map((team, index) => {
                      return (
                        <div
                          className="recordCard"
                          key={`${team.data}-${Math.random()}`}
                        >
                          <div className="pos">{index + 1}</div>
                          <div className="flex flex-col">
                            <div className="record1st">
                              <div className="name">{team.lag.name}</div>
                              <div className="count">{team.data}</div>
                            </div>
                            <div className="record2nd">
                              <div className="dates">{team.season.year}</div>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
                <div className="p-2">
                  <h3 className="mb-2 text-sm font-bold leading-4 sm:text-lg lg:text-xl">
                    Genomsnitt Borta
                  </h3>
                  <div className="table">
                    {data.avgMinAway.map((team, index) => {
                      return (
                        <div
                          className="recordCard"
                          key={`${team.data}-${Math.random()}`}
                        >
                          <div className="pos">{index + 1}</div>
                          <div className="flex flex-col">
                            <div className="record1st">
                              <div className="name">{team.lag.name}</div>
                              <div className="count">{team.data}</div>
                            </div>
                            <div className="record2nd">
                              <div className="dates">{team.season.year}</div>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
              <h3 className="mb-2 px-2 text-sm font-bold leading-4 sm:text-lg lg:text-xl">
                Högsta
              </h3>
              <div className="grid grid-cols-1 gap-2 lg:grid-cols-2 xl:grid-cols-3">
                <div className="p-2">
                  <h3 className="mb-2 text-sm font-bold leading-4 sm:text-lg lg:text-xl">
                    Totalt
                  </h3>
                  <div className="table">
                    {data.sumMaxAll.map((team, index) => {
                      return (
                        <div
                          className="recordCard"
                          key={`${team.data}-${Math.random()}`}
                        >
                          <div className="pos">{index + 1}</div>
                          <div className="flex flex-col">
                            <div className="record1st">
                              <div className="name">{team.lag.name}</div>
                              <div className="count">{team.data}</div>
                            </div>
                            <div className="record2nd">
                              <div className="dates">{team.season.year}</div>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
                <div className="p-2">
                  <h3 className="mb-2 text-sm font-bold leading-4 sm:text-lg lg:text-xl">
                    Totalt Hemma
                  </h3>
                  <div className="table">
                    {data.sumMaxHome.map((team, index) => {
                      return (
                        <div
                          className="recordCard"
                          key={`${team.data}-${Math.random()}`}
                        >
                          <div className="pos">{index + 1}</div>
                          <div className="flex flex-col">
                            <div className="record1st">
                              <div className="name">{team.lag.name}</div>
                              <div className="count">{team.data}</div>
                            </div>
                            <div className="record2nd">
                              <div className="dates">{team.season.year}</div>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
                <div className="p-2">
                  <h3 className="mb-2 text-sm font-bold leading-4 sm:text-lg lg:text-xl">
                    Totalt Borta
                  </h3>
                  <div className="table">
                    {data.sumMaxAway.map((team, index) => {
                      return (
                        <div
                          className="recordCard"
                          key={`${team.data}-${Math.random()}`}
                        >
                          <div className="pos">{index + 1}</div>
                          <div className="flex flex-col">
                            <div className="record1st">
                              <div className="name">{team.lag.name}</div>
                              <div className="count">{team.data}</div>
                            </div>
                            <div className="record2nd">
                              <div className="dates">{team.season.year}</div>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
              <h3 className="mb-2 px-2 text-sm font-bold leading-4 sm:text-lg lg:text-xl">
                Lägsta
              </h3>
              <div className="grid grid-cols-1 gap-2 lg:grid-cols-2 xl:grid-cols-3">
                <div className="p-2">
                  <h3 className="mb-2 text-sm font-bold leading-4 sm:text-lg lg:text-xl">
                    Totalt
                  </h3>
                  <div className="table">
                    {data.sumMinAll.map((team, index) => {
                      return (
                        <div
                          className="recordCard"
                          key={`${team.data}-${Math.random()}`}
                        >
                          <div className="pos">{index + 1}</div>
                          <div className="flex flex-col">
                            <div className="record1st">
                              <div className="name">{team.lag.name}</div>
                              <div className="count">{team.data}</div>
                            </div>
                            <div className="record2nd">
                              <div className="dates">{team.season.year}</div>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
                <div className="p-2">
                  <h3 className="mb-2 text-sm font-bold leading-4 sm:text-lg lg:text-xl">
                    Totalt Hemma
                  </h3>
                  <div className="table">
                    {data.sumMinHome.map((team, index) => {
                      return (
                        <div
                          className="recordCard"
                          key={`${team.data}-${Math.random()}`}
                        >
                          <div className="pos">{index + 1}</div>
                          <div className="flex flex-col">
                            <div className="record1st">
                              <div className="name">{team.lag.name}</div>
                              <div className="count">{team.data}</div>
                            </div>
                            <div className="record2nd">
                              <div className="dates">{team.season.year}</div>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
                <div className="p-2">
                  <h3 className="mb-2 text-sm font-bold leading-4 sm:text-lg lg:text-xl">
                    Totalt Borta
                  </h3>
                  <div className="table">
                    {data.sumMinAway.map((team, index) => {
                      return (
                        <div
                          className="recordCard"
                          key={`${team.data}-${Math.random()}`}
                        >
                          <div className="pos">{index + 1}</div>
                          <div className="flex flex-col">
                            <div className="record1st">
                              <div className="name">{team.lag.name}</div>
                              <div className="count">{team.data}</div>
                            </div>
                            <div className="record2nd">
                              <div className="dates">{team.season.year}</div>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}
          {params.record === 'generalStats' && (
            <div className="ml-4 xl:ml-0">
              {!women && (
                <>
                  <h3 className="mb-2 px-2 text-sm font-bold leading-4 sm:text-lg lg:text-xl">
                    Säsonger
                  </h3>
                  <div className="grid grid-cols-1 gap-2 lg:grid-cols-2 xl:grid-cols-3">
                    <div className="p-2">
                      <h3 className="mb-2 text-sm font-bold leading-4 sm:text-lg lg:text-xl">
                        Sedan 1931
                      </h3>
                      <div className="table">
                        {data.seasons.map((team, index) => {
                          return (
                            <div
                              className="recordCard"
                              key={`${team.seasons}-${Math.random()}`}
                            >
                              <div className="pos">{index + 1}</div>
                              <div className="flex flex-col">
                                <div className="record1st">
                                  <div className="name">{team.casual_name}</div>
                                  <div className="count">{team.seasons}</div>
                                </div>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>

                    <div className="p-2">
                      <h3 className="mb-2 text-sm font-bold leading-4 sm:text-lg lg:text-xl">
                        Säsonger totalt
                      </h3>
                      <div className="table">
                        {data.allSeasons?.map((team, index) => {
                          return (
                            <div
                              className="recordCard"
                              key={`${team.seasons}-${Math.random()}`}
                            >
                              <div className="pos">{index + 1}</div>
                              <div className="flex flex-col">
                                <div className="record1st">
                                  <div className="name">{team.casual_name}</div>
                                  <div className="count">{team.seasons}</div>
                                </div>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                  <h3 className="mb-2 px-2 text-sm font-bold leading-4 sm:text-lg lg:text-xl">
                    Slutspel
                  </h3>
                  <div className="grid grid-cols-1 gap-2 lg:grid-cols-2 xl:grid-cols-3">
                    <div className="p-2">
                      <h3 className="mb-2 text-sm font-bold leading-4 sm:text-lg lg:text-xl">
                        Sedan 1931
                      </h3>
                      <div className="table">
                        {data.playoffs.map((team, index) => {
                          return (
                            <div
                              className="recordCard"
                              key={`${team.playoffs}-${Math.random()}`}
                            >
                              <div className="pos">{index + 1}</div>
                              <div className="flex flex-col">
                                <div className="record1st">
                                  <div className="name">{team.casual_name}</div>
                                  <div className="count">{team.playoffs}</div>
                                </div>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>

                    <div className="p-2">
                      <h3 className="mb-2 text-sm font-bold leading-4 sm:text-lg lg:text-xl">
                        Slutspel totalt
                      </h3>
                      <div className="table">
                        {data.allPlayoffs?.map((team, index) => {
                          return (
                            <div
                              className="recordCard"
                              key={`${team.playoffs}-${Math.random()}`}
                            >
                              <div className="pos">{index + 1}</div>
                              <div className="flex flex-col">
                                <div className="record1st">
                                  <div className="name">{team.casual_name}</div>
                                  <div className="count">{team.playoffs}</div>
                                </div>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                  <h3 className="mb-2 px-2 text-sm font-bold leading-4 sm:text-lg lg:text-xl">
                    SM-Finaler
                  </h3>
                  <div className="grid grid-cols-1 gap-2 lg:grid-cols-2 xl:grid-cols-3">
                    <div className="p-2">
                      <h3 className="mb-2 text-sm font-bold leading-4 sm:text-lg lg:text-xl">
                        Guld
                      </h3>
                      <div className="table">
                        {data.golds.map((team, index) => {
                          return (
                            <div
                              className="recordCard"
                              key={`${team.guld}-${Math.random()}`}
                            >
                              <div className="pos">{index + 1}</div>
                              <div className="flex flex-col">
                                <div className="record1st">
                                  <div className="name">{team.casual_name}</div>
                                  <div className="count">{team.guld}</div>
                                </div>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                    <div className="p-2">
                      <h3 className="mb-2 text-sm font-bold leading-4 sm:text-lg lg:text-xl">
                        Spelade
                      </h3>
                      <div className="table">
                        {data.finals.map((team, index) => {
                          return (
                            <div
                              className="recordCard"
                              key={`${team.finals}-${Math.random()}`}
                            >
                              <div className="pos">{index + 1}</div>
                              <div className="flex flex-col">
                                <div className="record1st">
                                  <div className="name">{team.casual_name}</div>
                                  <div className="count">{team.finals}</div>
                                </div>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                </>
              )}
              {women && (
                <>
                  <div className="grid grid-cols-1 gap-2 lg:grid-cols-2 xl:grid-cols-3">
                    <div className="p-2">
                      <h3 className="mb-2 text-sm font-bold leading-4 sm:text-lg lg:text-xl">
                        Säsonger
                      </h3>
                      <div className="table">
                        {data.seasons.map((team, index) => {
                          return (
                            <div
                              className="recordCard"
                              key={`${team.seasons}-${Math.random()}`}
                            >
                              <div className="pos">{index + 1}</div>
                              <div className="flex flex-col">
                                <div className="record1st">
                                  <div className="name">{team.casual_name}</div>
                                  <div className="count">{team.seasons}</div>
                                </div>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>

                    <div className="p-2">
                      <h3 className="mb-2 text-sm font-bold leading-4 sm:text-lg lg:text-xl">
                        Slutspel
                      </h3>
                      <div className="table">
                        {data.playoffs.map((team, index) => {
                          return (
                            <div
                              className="recordCard"
                              key={`${team.playoffs}-${Math.random()}`}
                            >
                              <div className="pos">{index + 1}</div>
                              <div className="flex flex-col">
                                <div className="record1st">
                                  <div className="name">{team.casual_name}</div>
                                  <div className="count">{team.playoffs}</div>
                                </div>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                  <h3 className="mb-2 px-2 text-sm font-bold leading-4 sm:text-lg lg:text-xl">
                    SM-Finaler
                  </h3>
                  <div className="grid grid-cols-1 gap-2 lg:grid-cols-2 xl:grid-cols-3">
                    <div className="p-2">
                      <h3 className="mb-2 text-sm font-bold leading-4 sm:text-lg lg:text-xl">
                        Guld
                      </h3>
                      <div className="table">
                        {data.golds.map((team, index) => {
                          return (
                            <div
                              className="recordCard"
                              key={`${team.guld}-${Math.random()}`}
                            >
                              <div className="pos">{index + 1}</div>
                              <div className="flex flex-col">
                                <div className="record1st">
                                  <div className="name">{team.casual_name}</div>
                                  <div className="count">{team.guld}</div>
                                </div>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                    <div className="p-2">
                      <h3 className="mb-2 text-sm font-bold leading-4 sm:text-lg lg:text-xl">
                        Spelade
                      </h3>
                      <div className="table">
                        {data.finals.map((team, index) => {
                          return (
                            <div
                              className="recordCard"
                              key={`${team.finals}-${Math.random()}`}
                            >
                              <div className="pos">{index + 1}</div>
                              <div className="flex flex-col">
                                <div className="record1st">
                                  <div className="name">{team.casual_name}</div>
                                  <div className="count">{team.finals}</div>
                                </div>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}
          {params.record === 'streaks' && (
            <div className="ml-4 xl:ml-0">
              <div className="grid grid-cols-1 gap-2 lg:grid-cols-2 xl:grid-cols-3">
                <div className="p-2">
                  <h3 className="mb-2 text-sm font-bold leading-4 sm:text-lg lg:text-xl">
                    Matcher i rad utan förlust
                  </h3>
                  <div className="table">
                    {data.unbeatenStreak.map((streak, index) => {
                      return (
                        <div
                          className="recordCard"
                          key={`${streak.name}-${Math.random()}`}
                        >
                          <div className="pos">{index + 1}</div>
                          <div className="flex flex-col">
                            <div className="record1st">
                              <div className="name">{streak.name}</div>
                              <div className="count">{streak.game_count}</div>
                            </div>
                            <div className="record2nd">
                              <div className="dates">
                                {dayjs(streak.start_date).format('D MMMM YYYY')}
                                -{dayjs(streak.end_date).format('D MMMM YYYY')}
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
                <div className="p-2">
                  <h3 className="mb-2 text-sm font-bold leading-4 sm:text-lg lg:text-xl">
                    Matcher i rad med vinst
                  </h3>
                  <div className="table">
                    {data.winStreak.map((streak, index) => {
                      return (
                        <div
                          className="recordCard"
                          key={`${streak.name}-${Math.random()}`}
                        >
                          <div className="pos">{index + 1}</div>
                          <div className="flex flex-col">
                            <div className="record1st">
                              <div className="name">{streak.name}</div>
                              <div className="count">{streak.game_count}</div>
                            </div>
                            <div className="record2nd">
                              <div className="dates">
                                {dayjs(streak.start_date).format('D MMMM YYYY')}
                                -{dayjs(streak.end_date).format('D MMMM YYYY')}
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
                <div className="p-2">
                  <h3 className="mb-2 text-sm font-bold leading-4 sm:text-lg lg:text-xl">
                    Matcher i rad med oavgjort
                  </h3>
                  <div className="table">
                    {data.drawStreak.map((streak, index) => {
                      return (
                        <div
                          className="recordCard"
                          key={`${streak.name}-${Math.random()}`}
                        >
                          <div className="pos">{index + 1}</div>
                          <div className="flex flex-col">
                            <div className="record1st">
                              <div className="name">{streak.name}</div>
                              <div className="count">{streak.game_count}</div>
                            </div>
                            <div className="record2nd">
                              <div className="dates">
                                {dayjs(streak.start_date).format('D MMMM YYYY')}
                                -{dayjs(streak.end_date).format('D MMMM YYYY')}
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
                <div className="p-2">
                  <h3 className="mb-2 text-sm font-bold leading-4 sm:text-lg lg:text-xl">
                    Matcher i rad med förlust
                  </h3>
                  <div className="table">
                    {data.losingStreak.map((streak, index) => {
                      return (
                        <div
                          className="recordCard"
                          key={`${streak.name}-${Math.random()}`}
                        >
                          <div className="pos">{index + 1}</div>
                          <div className="flex flex-col">
                            <div className="record1st">
                              <div className="name">{streak.name}</div>
                              <div className="count">{streak.game_count}</div>
                            </div>
                            <div className="record2nd">
                              <div className="dates">
                                {dayjs(streak.start_date).format('D MMMM YYYY')}
                                -{dayjs(streak.end_date).format('D MMMM YYYY')}
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
                <div className="p-2">
                  <h3 className="mb-2 text-sm font-bold leading-4 sm:text-lg lg:text-xl">
                    Matcher i rad utan seger
                  </h3>
                  <div className="table">
                    {data.noWinStreak.map((streak, index) => {
                      return (
                        <div
                          className="recordCard"
                          key={`${streak.name}-${Math.random()}`}
                        >
                          <div className="pos">{index + 1}</div>
                          <div className="flex flex-col">
                            <div className="record1st">
                              <div className="name">{streak.name}</div>
                              <div className="count">{streak.game_count}</div>
                            </div>
                            <div className="record2nd">
                              <div className="dates">
                                {dayjs(streak.start_date).format('D MMMM YYYY')}
                                -{dayjs(streak.end_date).format('D MMMM YYYY')}
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
                <div className="p-2">
                  <h3 className="mb-2 text-sm font-bold leading-4 sm:text-lg lg:text-xl">
                    Inofficiella Svenska Mästare
                  </h3>
                  <div className="table">
                    {data.currInoffChamps.rows.map((team, index) => {
                      return (
                        <div
                          className="recordCard"
                          key={`${team.name}-${Math.random()}`}
                        >
                          <div className="pos">{index + 1}</div>
                          <div className="flex flex-col">
                            <div className="record1st">
                              <div className="name">{team.lag.name}</div>
                              <div className="count">
                                {team.goalsScored}-{team.goalsConceded}
                              </div>
                            </div>
                            <div className="record2nd">
                              <div className="dates">
                                {dayjs(team.date).format('D MMMM YYYY')}
                              </div>
                              <div className="text-right">
                                {team.opp.shortName}
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                  <div>
                    <p className="w-[292px] bg-white p-1 text-xs font-bold md:w-[22rem]">
                      Totalt {data.currInoffChamps.count + 1}{' '}
                      <a
                        href="https://sv.wikipedia.org/wiki/Inofficiella_v%C3%A4rldsm%C3%A4sterskapet_i_fotboll"
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-600"
                      >
                        &quot;mästare&quot;
                      </a>{' '}
                      sedan finalen 2000.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div ref={bottomRef}></div>
      <div className="sticky bottom-0 z-20 flex flex-row items-center justify-center gap-1 bg-[#f4f5f5] pl-4">
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

export default Record
