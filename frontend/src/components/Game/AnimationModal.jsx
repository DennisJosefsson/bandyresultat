import { useState, useRef, useContext, useLayoutEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { TeamPreferenceContext } from '../../contexts/contexts'
import dayjs from 'dayjs'
import 'dayjs/locale/sv'
import { ButtonComponent } from '../utilitycomponents/ButtonComponents'

dayjs.locale('sv')
gsap.registerPlugin(ScrollTrigger)

const AnimationModal = ({ setShowModal, animationArray, regularGames }) => {
  const [group, setGroup] = useState('elitserien')
  const mainRef = useRef(null)
  const scrollerRef = useRef(null)
  const revealRefs = useRef([])
  revealRefs.current = []

  const addToRefs = (el) => {
    if (el && !revealRefs.current.includes(el)) {
      revealRefs.current.push(el)
    }
  }
  const { favTeams } = useContext(TeamPreferenceContext)

  useLayoutEffect(() => {
    let context = gsap.context(() => {
      revealRefs.current.forEach((el, index) => {
        gsap.from(el, {
          autoAlpha: 0,
          duration: 0.25,
          ease: 'none',
          scrollTrigger: {
            id: `section-${index + 1}`,
            trigger: el,
            start: 'top bottom-=300',
            toggleActions: 'restart reverse restart reverse',
            scroller: scrollerRef.current,
            pin: true,
          },
        })
      })
    }, mainRef)

    return () => context.revert()
  }, [])

  const gamesArray = regularGames.map((group) => {
    return {
      group: group.group,
      serieName: animationArray.find(
        (aniGroup) => aniGroup.group === group.group,
      ).serieName,
      dates: group.dates.map((date) => {
        return {
          date: date.date,
          games: [...date.games],
          table: animationArray
            .find((tableGroup) => tableGroup.group === group.group)
            .tables.find((tableDate) => tableDate.date === date.date).table,
        }
      }),
    }
  })

  const dateArray =
    gamesArray.filter((serieGroup) => serieGroup.group === group).length > 0
      ? gamesArray.filter((serieGroup) => serieGroup.group === group)[0].dates
      : []

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none">
        <div
          className="fixed inset-2  mx-auto my-6 w-auto max-w-4xl overflow-y-auto"
          ref={scrollerRef}
        >
          {/*content*/}
          <div className="relative flex w-full flex-col border-0 bg-[#011d29] text-white shadow-lg outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between border-b border-solid border-slate-200 p-5">
              <h3 className="text-3xl font-semibold">Statistik</h3>
              <button
                className="float-right ml-auto border-0 bg-transparent p-1 font-inter text-3xl font-semibold leading-none text-[#011d29] outline-none focus:outline-none"
                onClick={() => setShowModal(false)}
              >
                <span className="block h-6 w-6 bg-transparent text-2xl text-white outline-none focus:outline-none">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    color="white"
                    fill="currentColor"
                    className="h-6 w-6"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              </button>
            </div>
            {/*body*/}
            <div className="p-5 font-inter text-white">
              <div>
                {gamesArray.length > 1 && (
                  <div className="flex flex-row justify-between">
                    {gamesArray.map((group) => {
                      return (
                        <ButtonComponent
                          key={group.group}
                          clickFunctions={() => setGroup(`${group.group}`)}
                        >
                          {group.serieName}
                        </ButtonComponent>
                      )
                    })}
                  </div>
                )}
                {gamesArray.length === 1 && (
                  <h4 className="text-lg font-bold">
                    {gamesArray[0].serieName}
                  </h4>
                )}
                <div ref={mainRef}>
                  {group && (
                    <div>
                      {dateArray.map((date) => {
                        return (
                          <div
                            className="flex flex-col"
                            key={date.date}
                            ref={addToRefs}
                          >
                            <div>{date.date}</div>
                            <div className="flex flex-row justify-between">
                              <div>
                                {date.games.map((game) => {
                                  return (
                                    <div
                                      key={game.gameId}
                                      className="mb-1 flex flex-row justify-between px-2 py-0.5 text-[10px] md:text-sm xl:w-[24rem]"
                                    >
                                      <span
                                        className={
                                          favTeams.includes(game.homeTeamId)
                                            ? 'w-24 font-bold'
                                            : 'w-24'
                                        }
                                      >
                                        {game.homeTeam.casualName}
                                      </span>
                                      <span className="w-1 xl:w-4"> - </span>
                                      <span
                                        className={
                                          favTeams.includes(game.awayTeamId)
                                            ? 'w-24 font-bold'
                                            : 'w-24'
                                        }
                                      >
                                        {game.awayTeam.casualName}
                                      </span>
                                      <span className="w-1 text-right xl:w-4">
                                        {game.homeGoal}
                                      </span>
                                      <span className="w-1">-</span>
                                      <span className="w-1 text-justify xl:w-4">
                                        {game.awayGoal}
                                      </span>
                                    </div>
                                  )
                                })}
                              </div>
                              <div>
                                <table className="animation w-full px-1 text-xs md:text-sm">
                                  {/* <thead>
                                    <tr>
                                      <th scope="col" className="pos"></th>
                                      <th scope="col" className="team"></th>
                                      <th scope="col"></th>
                                      <th scope="col"></th>
                                      <th scope="col"></th>
                                      <th scope="col"></th>
                                      <th scope="col" className="twelve"></th>
                                      <th scope="col" className="twelve"></th>
                                      <th scope="col" className="twelve"></th>
                                      <th scope="col"></th>
                                    </tr>
                                  </thead> */}
                                  <tbody>
                                    {date.table.map((team, index) => {
                                      return (
                                        <tr key={`${team.teamId}-${index}`}>
                                          <td className="pos">{index + 1}</td>
                                          <td className="team">
                                            {team.casualName}
                                          </td>

                                          <td>{team.table.games}</td>
                                          <td>{team.table.wins}</td>
                                          <td>{team.table.draws}</td>
                                          <td>{team.table.lost}</td>
                                          <td className="twelve">
                                            {team.table.scoredGoals}
                                          </td>
                                          <td className="twelve">
                                            {team.table.concededGoals}
                                          </td>
                                          <td className="twelve">
                                            {team.table.scoredGoals -
                                              team.table.concededGoals}
                                          </td>
                                          <td>{team.table.points}</td>
                                        </tr>
                                      )
                                    })}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  )}
                </div>
              </div>
            </div>
            {/*footer*/}
            <div className="flex items-center justify-end rounded-b border-t border-solid border-slate-200 p-6">
              <button
                className="mb-1 mr-1 bg-slate-200 px-6 py-2 text-sm font-bold uppercase text-red-500 outline-none transition-all duration-150 ease-linear focus:outline-none"
                type="button"
                onClick={() => setShowModal(false)}
              >
                Stäng
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
    </>
  )
}

export default AnimationModal
