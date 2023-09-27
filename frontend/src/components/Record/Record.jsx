import { getStreaks } from '../../requests/games'
import { useQuery } from 'react-query'
import { useContext, useRef } from 'react'
import { GenderContext } from '../../contexts/contexts'

import Spinner from '../utilitycomponents/spinner'
import GenderButtonComponent from '../utilitycomponents/GenderButtonComponent'
import dayjs from 'dayjs'
import 'dayjs/locale/sv'
dayjs.locale('sv')

const Record = () => {
  const { women, dispatch } = useContext(GenderContext)
  const { data, isLoading, error } = useQuery('streaks', getStreaks)
  const topRef = useRef(null)
  const streakRef = useRef(null)
  const pointsRef = useRef(null)
  const goalsScoredRef = useRef(null)
  const goalsConcededRef = useRef(null)

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

  const averagePointsMax = women
    ? {
        all: data.averagePointsWomenMax,
        home: data.averagePointsHomeWomenMax,
        away: data.averagePointsAwayWomenMax,
      }
    : {
        all: data.averagePointsMenMax,
        home: data.averagePointsHomeMenMax,
        away: data.averagePointsAwayMenMax,
      }

  const averagePointsMin = women
    ? {
        all: data.averagePointsWomenMin,
        home: data.averagePointsHomeWomenMin,
        away: data.averagePointsAwayWomenMin,
      }
    : {
        all: data.averagePointsMenMin,
        home: data.averagePointsHomeMenMin,
        away: data.averagePointsAwayMenMin,
      }

  const sumPointsMax = women
    ? {
        all: data.sumPointsWomenMax,
        home: data.sumPointsHomeWomenMax,
        away: data.sumPointsAwayWomenMax,
      }
    : {
        all: data.sumPointsMenMax,
        home: data.sumPointsHomeMenMax,
        away: data.sumPointsAwayMenMax,
      }

  const sumPointsMin = women
    ? {
        all: data.sumPointsWomenMin,
        home: data.sumPointsHomeWomenMin,
        away: data.sumPointsAwayWomenMin,
      }
    : {
        all: data.sumPointsMenMin,
        home: data.sumPointsHomeMenMin,
        away: data.sumPointsAwayMenMin,
      }

  const averageGoalsScoredMax = women
    ? {
        all: data.averageGoalsScoredWomenMax,
        home: data.averageGoalsScoredHomeWomenMax,
        away: data.averageGoalsScoredAwayWomenMax,
      }
    : {
        all: data.averageGoalsScoredMenMax,
        home: data.averageGoalsScoredHomeMenMax,
        away: data.averageGoalsScoredAwayMenMax,
      }

  const averageGoalsScoredMin = women
    ? {
        all: data.averageGoalsScoredWomenMin,
        home: data.averageGoalsScoredHomeWomenMin,
        away: data.averageGoalsScoredAwayWomenMin,
      }
    : {
        all: data.averageGoalsScoredMenMin,
        home: data.averageGoalsScoredHomeMenMin,
        away: data.averageGoalsScoredAwayMenMin,
      }

  const sumGoalsScoredMax = women
    ? {
        all: data.sumGoalsScoredWomenMax,
        home: data.sumGoalsScoredHomeWomenMax,
        away: data.sumGoalsScoredAwayWomenMax,
      }
    : {
        all: data.sumGoalsScoredMenMax,
        home: data.sumGoalsScoredHomeMenMax,
        away: data.sumGoalsScoredAwayMenMax,
      }

  const sumGoalsScoredMin = women
    ? {
        all: data.sumGoalsScoredWomenMin,
        home: data.sumGoalsScoredHomeWomenMin,
        away: data.sumGoalsScoredAwayWomenMin,
      }
    : {
        all: data.sumGoalsScoredMenMin,
        home: data.sumGoalsScoredHomeMenMin,
        away: data.sumGoalsScoredAwayMenMin,
      }

  const averageGoalsConcededMax = women
    ? {
        all: data.averageGoalsConcededWomenMax,
        home: data.averageGoalsConcededHomeWomenMax,
        away: data.averageGoalsConcededAwayWomenMax,
      }
    : {
        all: data.averageGoalsConcededMenMax,
        home: data.averageGoalsConcededHomeMenMax,
        away: data.averageGoalsConcededAwayMenMax,
      }

  const averageGoalsConcededMin = women
    ? {
        all: data.averageGoalsConcededWomenMin,
        home: data.averageGoalsConcededHomeWomenMin,
        away: data.averageGoalsConcededAwayWomenMin,
      }
    : {
        all: data.averageGoalsConcededMenMin,
        home: data.averageGoalsConcededHomeMenMin,
        away: data.averageGoalsConcededAwayMenMin,
      }

  const sumGoalsConcededMax = women
    ? {
        all: data.sumGoalsConcededWomenMax,
        home: data.sumGoalsConcededHomeWomenMax,
        away: data.sumGoalsConcededAwayWomenMax,
      }
    : {
        all: data.sumGoalsConcededMenMax,
        home: data.sumGoalsConcededHomeMenMax,
        away: data.sumGoalsConcededAwayMenMax,
      }

  const sumGoalsConcededMin = women
    ? {
        all: data.sumGoalsConcededWomenMin,
        home: data.sumGoalsConcededHomeWomenMin,
        away: data.sumGoalsConcededAwayWomenMin,
      }
    : {
        all: data.sumGoalsConcededMenMin,
        home: data.sumGoalsConcededHomeMenMin,
        away: data.sumGoalsConcededAwayMenMin,
      }

  const streaks = women
    ? {
        winStreak: data.womenWinStreak,
        unbeatenStreak: data.womenUnbeatenStreak,
        drawStreak: data.womenDrawStreak,
        noWinStreak: data.womenNoWinStreak,
        losingStreak: data.womenLosingStreak,
      }
    : {
        winStreak: data.menWinStreak,
        unbeatenStreak: data.menUnbeatenStreak,
        drawStreak: data.menDrawStreak,
        noWinStreak: data.menNoWinStreak,
        losingStreak: data.menLosingStreak,
      }

  return (
    <div
      className="mx-auto my-4 min-h-screen max-w-7xl font-inter text-[#011d29]"
      ref={topRef}
    >
      <div className="flex flex-row justify-between">
        <div className="flex flex-col">
          <div className="ml-4 xl:ml-0" ref={pointsRef}>
            <div>
              <h2 className="mb-4 text-center text-base font-bold leading-4 sm:text-xl md:mb-6 lg:text-2xl">
                Poäng Elitserien
              </h2>
            </div>
            <h3 className="mb-2 px-2 text-sm font-bold leading-4 sm:text-lg lg:text-xl">
              Högsta
            </h3>
            <div className="grid grid-cols-1 gap-2 lg:grid-cols-3">
              <div className="p-2">
                <h3 className="mb-2 text-sm font-bold leading-4 sm:text-lg lg:text-xl">
                  Genomsnitt
                </h3>
                <div className="table">
                  {averagePointsMax.all.map((team, index) => {
                    return (
                      <div
                        className="recordCard"
                        key={`${team.avg_points}-${Math.random()}`}
                      >
                        <div className="pos">{index + 1}</div>
                        <div className="flex flex-col">
                          <div className="record1st">
                            <div className="name">{team.lag.name}</div>
                            <div className="count">{team.avg_points}</div>
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
                  {averagePointsMax.home.map((team, index) => {
                    return (
                      <div
                        className="recordCard"
                        key={`${team.avg_points}-${Math.random()}`}
                      >
                        <div className="pos">{index + 1}</div>
                        <div className="flex flex-col">
                          <div className="record1st">
                            <div className="name">{team.lag.name}</div>
                            <div className="count">{team.avg_points}</div>
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
                  {averagePointsMax.away.map((team, index) => {
                    return (
                      <div
                        className="recordCard"
                        key={`${team.avg_points}-${Math.random()}`}
                      >
                        <div className="pos">{index + 1}</div>
                        <div className="flex flex-col">
                          <div className="record1st">
                            <div className="name">{team.lag.name}</div>
                            <div className="count">{team.avg_points}</div>
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
            <div className="grid grid-cols-1 gap-2 lg:grid-cols-3">
              <div className="p-2">
                <h3 className="mb-2 text-sm font-bold leading-4 sm:text-lg lg:text-xl">
                  Genomsnitt
                </h3>
                <div className="table">
                  {averagePointsMin.all.map((team, index) => {
                    return (
                      <div
                        className="recordCard"
                        key={`${team.avg_points}-${Math.random()}`}
                      >
                        <div className="pos">{index + 1}</div>
                        <div className="flex flex-col">
                          <div className="record1st">
                            <div className="name">{team.lag.name}</div>
                            <div className="count">{team.avg_points}</div>
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
                  {averagePointsMin.home.map((team, index) => {
                    return (
                      <div
                        className="recordCard"
                        key={`${team.avg_points}-${Math.random()}`}
                      >
                        <div className="pos">{index + 1}</div>
                        <div className="flex flex-col">
                          <div className="record1st">
                            <div className="name">{team.lag.name}</div>
                            <div className="count">{team.avg_points}</div>
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
                  {averagePointsMin.away.map((team, index) => {
                    return (
                      <div
                        className="recordCard"
                        key={`${team.avg_points}-${Math.random()}`}
                      >
                        <div className="pos">{index + 1}</div>
                        <div className="flex flex-col">
                          <div className="record1st">
                            <div className="name">{team.lag.name}</div>
                            <div className="count">{team.avg_points}</div>
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
            <div className="grid grid-cols-1 gap-2 lg:grid-cols-3">
              <div className="p-2">
                <h3 className="mb-2 text-sm font-bold leading-4 sm:text-lg lg:text-xl">
                  Totalt
                </h3>
                <div className="table">
                  {sumPointsMax.all.map((team, index) => {
                    return (
                      <div
                        className="recordCard"
                        key={`${team.sum_points}-${Math.random()}`}
                      >
                        <div className="pos">{index + 1}</div>
                        <div className="flex flex-col">
                          <div className="record1st">
                            <div className="name">{team.lag.name}</div>
                            <div className="count">{team.sum_points}</div>
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
                  {sumPointsMax.home.map((team, index) => {
                    return (
                      <div
                        className="recordCard"
                        key={`${team.sum_points}-${Math.random()}`}
                      >
                        <div className="pos">{index + 1}</div>
                        <div className="flex flex-col">
                          <div className="record1st">
                            <div className="name">{team.lag.name}</div>
                            <div className="count">{team.sum_points}</div>
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
                  {sumPointsMax.away.map((team, index) => {
                    return (
                      <div
                        className="recordCard"
                        key={`${team.sum_points}-${Math.random()}`}
                      >
                        <div className="pos">{index + 1}</div>
                        <div className="flex flex-col">
                          <div className="record1st">
                            <div className="name">{team.lag.name}</div>
                            <div className="count">{team.sum_points}</div>
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
            <div className="grid grid-cols-1 gap-2 lg:grid-cols-3">
              <div className="p-2">
                <h3 className="mb-2 text-sm font-bold leading-4 sm:text-lg lg:text-xl">
                  Totalt
                </h3>
                <div className="table">
                  {sumPointsMin.all.map((team, index) => {
                    return (
                      <div
                        className="recordCard"
                        key={`${team.sum_points}-${Math.random()}`}
                      >
                        <div className="pos">{index + 1}</div>
                        <div className="flex flex-col">
                          <div className="record1st">
                            <div className="name">{team.lag.name}</div>
                            <div className="count">{team.sum_points}</div>
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
                  {sumPointsMin.home.map((team, index) => {
                    return (
                      <div
                        className="recordCard"
                        key={`${team.sum_points}-${Math.random()}`}
                      >
                        <div className="pos">{index + 1}</div>
                        <div className="flex flex-col">
                          <div className="record1st">
                            <div className="name">{team.lag.name}</div>
                            <div className="count">{team.sum_points}</div>
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
                  {sumPointsMin.away.map((team, index) => {
                    return (
                      <div
                        className="recordCard"
                        key={`${team.sum_points}-${Math.random()}`}
                      >
                        <div className="pos">{index + 1}</div>
                        <div className="flex flex-col">
                          <div className="record1st">
                            <div className="name">{team.lag.name}</div>
                            <div className="count">{team.sum_points}</div>
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
          <div className="ml-4 xl:ml-0" ref={goalsScoredRef}>
            <div>
              <h2 className="mb-4 text-center text-base font-bold leading-4 sm:text-xl md:mb-6 lg:text-2xl">
                Gjorda mål Elitserien
              </h2>
            </div>
            <h3 className="mb-2 px-2 text-sm font-bold leading-4 sm:text-lg lg:text-xl">
              Högsta
            </h3>
            <div className="grid grid-cols-1 gap-2 lg:grid-cols-3">
              <div className="p-2">
                <h3 className="mb-2 text-sm font-bold leading-4 sm:text-lg lg:text-xl">
                  Genomsnitt
                </h3>
                <div className="table">
                  {averageGoalsScoredMax.all.map((team, index) => {
                    return (
                      <div
                        className="recordCard"
                        key={`${team.avg_goals_scored}-${Math.random()}`}
                      >
                        <div className="pos">{index + 1}</div>
                        <div className="flex flex-col">
                          <div className="record1st">
                            <div className="name">{team.lag.name}</div>
                            <div className="count">{team.avg_goals_scored}</div>
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
                  {averageGoalsScoredMax.home.map((team, index) => {
                    return (
                      <div
                        className="recordCard"
                        key={`${team.avg_goals_scored}-${Math.random()}`}
                      >
                        <div className="pos">{index + 1}</div>
                        <div className="flex flex-col">
                          <div className="record1st">
                            <div className="name">{team.lag.name}</div>
                            <div className="count">{team.avg_goals_scored}</div>
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
                  {averageGoalsScoredMax.away.map((team, index) => {
                    return (
                      <div
                        className="recordCard"
                        key={`${team.avg_goals_scored}-${Math.random()}`}
                      >
                        <div className="pos">{index + 1}</div>
                        <div className="flex flex-col">
                          <div className="record1st">
                            <div className="name">{team.lag.name}</div>
                            <div className="count">{team.avg_goals_scored}</div>
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
            <div className="grid grid-cols-1 gap-2 lg:grid-cols-3">
              <div className="p-2">
                <h3 className="mb-2 text-sm font-bold leading-4 sm:text-lg lg:text-xl">
                  Genomsnitt
                </h3>
                <div className="table">
                  {averageGoalsScoredMin.all.map((team, index) => {
                    return (
                      <div
                        className="recordCard"
                        key={`${team.avg_goals_scored}-${Math.random()}`}
                      >
                        <div className="pos">{index + 1}</div>
                        <div className="flex flex-col">
                          <div className="record1st">
                            <div className="name">{team.lag.name}</div>
                            <div className="count">{team.avg_goals_scored}</div>
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
                  {averageGoalsScoredMin.home.map((team, index) => {
                    return (
                      <div
                        className="recordCard"
                        key={`${team.avg_goals_scored}-${Math.random()}`}
                      >
                        <div className="pos">{index + 1}</div>
                        <div className="flex flex-col">
                          <div className="record1st">
                            <div className="name">{team.lag.name}</div>
                            <div className="count">{team.avg_goals_scored}</div>
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
                  {averageGoalsScoredMin.away.map((team, index) => {
                    return (
                      <div
                        className="recordCard"
                        key={`${team.avg_goals_scored}-${Math.random()}`}
                      >
                        <div className="pos">{index + 1}</div>
                        <div className="flex flex-col">
                          <div className="record1st">
                            <div className="name">{team.lag.name}</div>
                            <div className="count">{team.avg_goals_scored}</div>
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
            <div className="grid grid-cols-1 gap-2 lg:grid-cols-3">
              <div className="p-2">
                <h3 className="mb-2 text-sm font-bold leading-4 sm:text-lg lg:text-xl">
                  Totalt
                </h3>
                <div className="table">
                  {sumGoalsScoredMax.all.map((team, index) => {
                    return (
                      <div
                        className="recordCard"
                        key={`${team.sum_goals_scored}-${Math.random()}`}
                      >
                        <div className="pos">{index + 1}</div>
                        <div className="flex flex-col">
                          <div className="record1st">
                            <div className="name">{team.lag.name}</div>
                            <div className="count">{team.sum_goals_scored}</div>
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
                  {sumGoalsScoredMax.home.map((team, index) => {
                    return (
                      <div
                        className="recordCard"
                        key={`${team.sum_goals_scored}-${Math.random()}`}
                      >
                        <div className="pos">{index + 1}</div>
                        <div className="flex flex-col">
                          <div className="record1st">
                            <div className="name">{team.lag.name}</div>
                            <div className="count">{team.sum_goals_scored}</div>
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
                  {sumGoalsScoredMax.away.map((team, index) => {
                    return (
                      <div
                        className="recordCard"
                        key={`${team.sum_goals_scored}-${Math.random()}`}
                      >
                        <div className="pos">{index + 1}</div>
                        <div className="flex flex-col">
                          <div className="record1st">
                            <div className="name">{team.lag.name}</div>
                            <div className="count">{team.sum_goals_scored}</div>
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
            <div className="grid grid-cols-1 gap-2 lg:grid-cols-3">
              <div className="p-2">
                <h3 className="mb-2 text-sm font-bold leading-4 sm:text-lg lg:text-xl">
                  Totalt
                </h3>
                <div className="table">
                  {sumGoalsScoredMin.all.map((team, index) => {
                    return (
                      <div
                        className="recordCard"
                        key={`${team.sum_goals_scored}-${Math.random()}`}
                      >
                        <div className="pos">{index + 1}</div>
                        <div className="flex flex-col">
                          <div className="record1st">
                            <div className="name">{team.lag.name}</div>
                            <div className="count">{team.sum_goals_scored}</div>
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
                  {sumGoalsScoredMin.home.map((team, index) => {
                    return (
                      <div
                        className="recordCard"
                        key={`${team.sum_goals_scored}-${Math.random()}`}
                      >
                        <div className="pos">{index + 1}</div>
                        <div className="flex flex-col">
                          <div className="record1st">
                            <div className="name">{team.lag.name}</div>
                            <div className="count">{team.sum_goals_scored}</div>
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
                  {sumGoalsScoredMin.away.map((team, index) => {
                    return (
                      <div
                        className="recordCard"
                        key={`${team.sum_goals_scored}-${Math.random()}`}
                      >
                        <div className="pos">{index + 1}</div>
                        <div className="flex flex-col">
                          <div className="record1st">
                            <div className="name">{team.lag.name}</div>
                            <div className="count">{team.sum_goals_scored}</div>
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
          <div className="ml-4 xl:ml-0" ref={goalsConcededRef}>
            <div>
              <h2 className="mb-4 text-center text-base font-bold leading-4 sm:text-xl md:mb-6 lg:text-2xl">
                Insläppta mål Elitserien
              </h2>
            </div>
            <h3 className="mb-2 px-2 text-sm font-bold leading-4 sm:text-lg lg:text-xl">
              Högsta
            </h3>
            <div className="grid grid-cols-1 gap-2 lg:grid-cols-3">
              <div className="p-2">
                <h3 className="mb-2 text-sm font-bold leading-4 sm:text-lg lg:text-xl">
                  Genomsnitt
                </h3>
                <div className="table">
                  {averageGoalsConcededMax.all.map((team, index) => {
                    return (
                      <div
                        className="recordCard"
                        key={`${team.avg_goals_conceded}-${Math.random()}`}
                      >
                        <div className="pos">{index + 1}</div>
                        <div className="flex flex-col">
                          <div className="record1st">
                            <div className="name">{team.lag.name}</div>
                            <div className="count">
                              {team.avg_goals_conceded}
                            </div>
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
                  {averageGoalsConcededMax.home.map((team, index) => {
                    return (
                      <div
                        className="recordCard"
                        key={`${team.avg_goals_conceded}-${Math.random()}`}
                      >
                        <div className="pos">{index + 1}</div>
                        <div className="flex flex-col">
                          <div className="record1st">
                            <div className="name">{team.lag.name}</div>
                            <div className="count">
                              {team.avg_goals_conceded}
                            </div>
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
                  {averageGoalsConcededMax.away.map((team, index) => {
                    return (
                      <div
                        className="recordCard"
                        key={`${team.avg_goals_conceded}-${Math.random()}`}
                      >
                        <div className="pos">{index + 1}</div>
                        <div className="flex flex-col">
                          <div className="record1st">
                            <div className="name">{team.lag.name}</div>
                            <div className="count">
                              {team.avg_goals_conceded}
                            </div>
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
            <div className="grid grid-cols-1 gap-2 lg:grid-cols-3">
              <div className="p-2">
                <h3 className="mb-2 text-sm font-bold leading-4 sm:text-lg lg:text-xl">
                  Genomsnitt
                </h3>
                <div className="table">
                  {averageGoalsConcededMin.all.map((team, index) => {
                    return (
                      <div
                        className="recordCard"
                        key={`${team.avg_goals_conceded}-${Math.random()}`}
                      >
                        <div className="pos">{index + 1}</div>
                        <div className="flex flex-col">
                          <div className="record1st">
                            <div className="name">{team.lag.name}</div>
                            <div className="count">
                              {team.avg_goals_conceded}
                            </div>
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
                  {averageGoalsConcededMin.home.map((team, index) => {
                    return (
                      <div
                        className="recordCard"
                        key={`${team.avg_goals_conceded}-${Math.random()}`}
                      >
                        <div className="pos">{index + 1}</div>
                        <div className="flex flex-col">
                          <div className="record1st">
                            <div className="name">{team.lag.name}</div>
                            <div className="count">
                              {team.avg_goals_conceded}
                            </div>
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
                  {averageGoalsConcededMin.away.map((team, index) => {
                    return (
                      <div
                        className="recordCard"
                        key={`${team.avg_goals_conceded}-${Math.random()}`}
                      >
                        <div className="pos">{index + 1}</div>
                        <div className="flex flex-col">
                          <div className="record1st">
                            <div className="name">{team.lag.name}</div>
                            <div className="count">
                              {team.avg_goals_conceded}
                            </div>
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
            <div className="grid grid-cols-1 gap-2 lg:grid-cols-3">
              <div className="p-2">
                <h3 className="mb-2 text-sm font-bold leading-4 sm:text-lg lg:text-xl">
                  Totalt
                </h3>
                <div className="table">
                  {sumGoalsConcededMax.all.map((team, index) => {
                    return (
                      <div
                        className="recordCard"
                        key={`${team.sum_goals_conceded}-${Math.random()}`}
                      >
                        <div className="pos">{index + 1}</div>
                        <div className="flex flex-col">
                          <div className="record1st">
                            <div className="name">{team.lag.name}</div>
                            <div className="count">
                              {team.sum_goals_conceded}
                            </div>
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
                  {sumGoalsConcededMax.home.map((team, index) => {
                    return (
                      <div
                        className="recordCard"
                        key={`${team.sum_goals_conceded}-${Math.random()}`}
                      >
                        <div className="pos">{index + 1}</div>
                        <div className="flex flex-col">
                          <div className="record1st">
                            <div className="name">{team.lag.name}</div>
                            <div className="count">
                              {team.sum_goals_conceded}
                            </div>
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
                  {sumGoalsConcededMax.away.map((team, index) => {
                    return (
                      <div
                        className="recordCard"
                        key={`${team.sum_goals_conceded}-${Math.random()}`}
                      >
                        <div className="pos">{index + 1}</div>
                        <div className="flex flex-col">
                          <div className="record1st">
                            <div className="name">{team.lag.name}</div>
                            <div className="count">
                              {team.sum_goals_conceded}
                            </div>
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
            <div className="grid grid-cols-1 gap-2 lg:grid-cols-3">
              <div className="p-2">
                <h3 className="mb-2 text-sm font-bold leading-4 sm:text-lg lg:text-xl">
                  Totalt
                </h3>
                <div className="table">
                  {sumGoalsConcededMin.all.map((team, index) => {
                    return (
                      <div
                        className="recordCard"
                        key={`${team.sum_goals_conceded}-${Math.random()}`}
                      >
                        <div className="pos">{index + 1}</div>
                        <div className="flex flex-col">
                          <div className="record1st">
                            <div className="name">{team.lag.name}</div>
                            <div className="count">
                              {team.sum_goals_conceded}
                            </div>
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
                  {sumGoalsConcededMin.home.map((team, index) => {
                    return (
                      <div
                        className="recordCard"
                        key={`${team.sum_goals_conceded}-${Math.random()}`}
                      >
                        <div className="pos">{index + 1}</div>
                        <div className="flex flex-col">
                          <div className="record1st">
                            <div className="name">{team.lag.name}</div>
                            <div className="count">
                              {team.sum_goals_conceded}
                            </div>
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
                  {sumGoalsConcededMin.away.map((team, index) => {
                    return (
                      <div
                        className="recordCard"
                        key={`${team.sum_goals_conceded}-${Math.random()}`}
                      >
                        <div className="pos">{index + 1}</div>
                        <div className="flex flex-col">
                          <div className="record1st">
                            <div className="name">{team.lag.name}</div>
                            <div className="count">
                              {team.sum_goals_conceded}
                            </div>
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
          <div className="ml-4 xl:ml-0" ref={streakRef}>
            <div>
              <h2 className="mb-4 text-center text-base font-bold leading-4 sm:text-xl md:mb-6 lg:text-2xl">
                Rekordsviter
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-2 lg:grid-cols-3">
              <div className="p-2">
                <h3 className="mb-2 text-sm font-bold leading-4 sm:text-lg lg:text-xl">
                  Matcher i rad utan förlust
                </h3>
                <div className="table">
                  {streaks.unbeatenStreak.map((streak, index) => {
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
                              {dayjs(streak.start_date).format('D MMMM YYYY')}-
                              {dayjs(streak.end_date).format('D MMMM YYYY')}
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
                  {streaks.winStreak.map((streak, index) => {
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
                              {dayjs(streak.start_date).format('D MMMM YYYY')}-
                              {dayjs(streak.end_date).format('D MMMM YYYY')}
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
                  {streaks.drawStreak.map((streak, index) => {
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
                              {dayjs(streak.start_date).format('D MMMM YYYY')}-
                              {dayjs(streak.end_date).format('D MMMM YYYY')}
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
                  {streaks.losingStreak.map((streak, index) => {
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
                              {dayjs(streak.start_date).format('D MMMM YYYY')}-
                              {dayjs(streak.end_date).format('D MMMM YYYY')}
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
                  {streaks.noWinStreak.map((streak, index) => {
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
                              {dayjs(streak.start_date).format('D MMMM YYYY')}-
                              {dayjs(streak.end_date).format('D MMMM YYYY')}
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <GenderButtonComponent
            women={women}
            clickFunctions={() => dispatch({ type: 'TOGGLE' })}
          />
        </div>
      </div>
      <div className="sticky bottom-0 z-20 flex flex-row items-center justify-center gap-1 bg-[#f4f5f5] pl-4">
        <div
          onClick={(event) => scrollTo(event, pointsRef)}
          className="my-2 cursor-pointer select-none rounded-md bg-[#93B8C1] px-1 py-0.5 text-center text-[10px] text-[#011d29] lg:px-2 lg:py-1 lg:text-sm"
        >
          Poäng
        </div>
        <div
          onClick={(event) => scrollTo(event, goalsScoredRef)}
          className="my-2 cursor-pointer select-none rounded-md bg-[#93B8C1] px-1 py-0.5 text-center text-[10px] text-[#011d29] lg:px-2 lg:py-1 lg:text-sm"
        >
          Gjorda mål
        </div>
        <div
          onClick={(event) => scrollTo(event, goalsConcededRef)}
          className="my-2 cursor-pointer select-none rounded-md bg-[#93B8C1] px-1 py-0.5 text-center text-[10px] text-[#011d29] lg:px-2 lg:py-1 lg:text-sm"
        >
          Insläppta mål
        </div>
        <div
          onClick={(event) => scrollTo(event, streakRef)}
          className="my-2 cursor-pointer select-none rounded-md bg-[#93B8C1] px-1 py-0.5 text-center text-[10px] text-[#011d29] lg:px-2 lg:py-1 lg:text-sm"
        >
          Rekordsviter
        </div>
      </div>
    </div>
  )
}

export default Record
