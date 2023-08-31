import { getStreaks } from '../../requests/games'
import { useQuery } from 'react-query'
import { useContext } from 'react'
import { GenderContext } from '../../contexts/contexts'

import Spinner from '../utilitycomponents/spinner'
import GenderButtonComponent from '../utilitycomponents/GenderButtonComponent'
import dayjs from 'dayjs'
import 'dayjs/locale/sv'
dayjs.locale('sv')

const Record = () => {
  const { women, dispatch } = useContext(GenderContext)
  const { data, isLoading, error } = useQuery('streaks', getStreaks)

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

  const {
    womenWinStreak,
    womenUnbeatenStreak,
    womenDrawStreak,
    womenNoWinStreak,
    womenLosingStreak,
    menWinStreak,
    menUnbeatenStreak,
    menDrawStreak,
    menNoWinStreak,
    menLosingStreak,
  } = data

  const streaks = women
    ? {
        winStreak: womenWinStreak,
        unbeatenStreak: womenUnbeatenStreak,
        drawStreak: womenDrawStreak,
        noWinStreak: womenNoWinStreak,
        losingStreak: womenLosingStreak,
      }
    : {
        winStreak: menWinStreak,
        unbeatenStreak: menUnbeatenStreak,
        drawStreak: menDrawStreak,
        noWinStreak: menNoWinStreak,
        losingStreak: menLosingStreak,
      }

  return (
    <div className="mx-auto my-4 flex min-h-screen max-w-7xl flex-row justify-between font-inter text-[#011d29]">
      <div className="ml-4 xl:ml-0">
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
      <div>
        <GenderButtonComponent
          women={women}
          clickFunctions={() => dispatch({ type: 'TOGGLE' })}
        />
      </div>
    </div>
  )
}

export default Record
