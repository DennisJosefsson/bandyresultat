import { useRef, useContext, useLayoutEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { TeamPreferenceContext } from '../../contexts/contexts'
import { useLocation } from 'react-router-dom'
import dayjs from 'dayjs'
import 'dayjs/locale/sv'
dayjs.locale('sv')
gsap.registerPlugin(ScrollTrigger)

const Animation = () => {
  const location = useLocation()
  const { animationArray, regularGames, group } = location.state
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

  if (animationArray === null || regularGames === null || group === null) {
    return (
      <div className="mx-auto grid h-screen place-items-center font-inter text-[#011d29]">
        Ingen data.
      </div>
    )
  }

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
    <div className="mx-auto flex min-h-screen max-w-7xl flex-row justify-between pt-4 font-inter text-[#011d29]">
      <div ref={mainRef}>
        {group && (
          <div>
            {dateArray.map((date) => {
              return (
                <div className="flex flex-col" key={date.date} ref={addToRefs}>
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
                                <td className="team">{team.casualName}</td>

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
  )
}

export default Animation
