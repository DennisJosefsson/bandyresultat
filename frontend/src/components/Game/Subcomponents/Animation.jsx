import { Link } from 'react-router-dom'
import { useQuery } from 'react-query'
import { getSeasonGames } from '../../../requests/games'
import { getSingleSeason } from '../../../requests/seasons'
import { useContext, useState, useEffect } from 'react'
import {
  TeamPreferenceContext,
  GenderContext,
} from '../../../contexts/contexts'
import {
  animationData,
  gameSortFunction,
} from '../../utilitycomponents/Functions/sortFunction'
import Spinner from '../../utilitycomponents/Components/spinner'
import {
  LeftArrow,
  RightArrow,
  SmallArrowUpRight,
  SmallArrowDownRight,
} from '../../utilitycomponents/Components/icons'
import dayjs from 'dayjs'
import 'dayjs/locale/sv'
dayjs.locale('sv')

const Animation = ({ seasonId }) => {
  const [group, setGroup] = useState()
  const [round, setRound] = useState(0)
  const { data, isLoading, error } = useQuery(
    ['singleSeasonGames', seasonId],
    () => getSeasonGames(seasonId),
  )

  const {
    data: season,
    isLoading: isSeasonLoading,
    error: seasonError,
  } = useQuery(['singleSeason', seasonId], () => getSingleSeason(seasonId))

  const { favTeams } = useContext(TeamPreferenceContext)
  const { women } = useContext(GenderContext)

  useEffect(() => {
    if (!isLoading && !error) {
      const unsortedRegularGames = data
        .filter((table) => table.women === women)
        .filter((game) => game.category === 'regular')

      const groupArray = [
        ...new Set(unsortedRegularGames.map((game) => game.group)),
      ]
      if (groupArray.length === 1) {
        setGroup(groupArray[0])
      }
    }
    setRound(0)
  }, [data, isLoading, error, women])

  useEffect(() => {
    setRound(0)
  }, [women, seasonId])

  if (isLoading || isSeasonLoading) {
    return (
      <div className="mx-auto grid h-screen place-items-center font-inter text-[#011d29]">
        <Spinner />
      </div>
    )
  }

  if (error || seasonError) {
    return (
      <div className="mx-auto grid h-screen place-items-center font-inter text-[#011d29]">
        Något gick fel.
      </div>
    )
  }

  const seriesArray = season.find((season) => season.women === women)
    ? season.find((season) => season.women === women).series
    : []

  const teamArray = season.find((season) => season.women === women)
    ? season.find((season) => season.women === women).teams
    : []

  const unsortedRegularGames = data
    .filter((table) => table.women === women)
    .filter((game) => game.category === 'regular')

  const seriesInfo = season.find((season) => season.women === women)
    ? season.find((season) => season.women === women).series
    : []

  if (women && seasonId < 1973) {
    return (
      <div className="mx-auto mt-4 grid place-items-center py-5 font-inter text-sm font-bold text-[#011d29] md:text-base">
        <p className="mx-10 text-center">
          Första säsongen för damernas högsta serie var{' '}
          <Link to="/season/1973" className="font-bold">
            1972/73
          </Link>
          .
        </p>
      </div>
    )
  }

  if (
    unsortedRegularGames.filter((game) => game.result !== null).length === 0
  ) {
    return (
      <div className="mx-auto mt-4 grid place-items-center py-5 font-inter text-sm font-bold text-[#011d29] md:text-base">
        <p className="mx-10 text-center">
          Data över serieutvecklingen saknas för denna säsong.
        </p>
      </div>
    )
  }

  const regularGames = gameSortFunction(
    unsortedRegularGames.filter((game) => game.result !== null),
  )

  const animationArray = animationData(
    regularGames,
    teamArray,
    seriesArray,
    seasonId,
  )

  console.log(seriesArray)

  const groupName = seriesArray.find((serie) => serie.serieGroupCode === group)
    ? seriesArray.find((serie) => serie.serieGroupCode === group).serieName
    : ''

  const gamesArray = regularGames
    .filter((group) => group.group !== 'mix')
    .map((group) => {
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

  const displayArrow = (teamId) => {
    const prevPos = dateArray[round - 1].table.find(
      (team) => team.teamId === teamId,
    ).position
    const currPos = dateArray[round].table.find(
      (team) => team.teamId === teamId,
    ).position

    if (prevPos === currPos) {
      return ''
    } else if (prevPos < currPos) {
      return <SmallArrowDownRight />
    } else if (prevPos > currPos) {
      return <SmallArrowUpRight />
    }
  }

  return (
    <div className="mx-auto flex flex-col pt-4 font-inter text-[#011d29]">
      {gamesArray.length > 1 && (
        <div className="flex flex-row justify-center gap-1">
          {gamesArray.map((group) => {
            return (
              <div
                key={group.group}
                onClick={() => {
                  setGroup(group.group)
                  setRound(0)
                }}
                className="cursor-pointer truncate rounded bg-slate-400 p-1 text-xs text-white md:text-sm lg:text-base"
              >
                {group.serieName}
              </div>
            )
          })}
        </div>
      )}
      {groupName === '' && (
        <div className="mt-2 grid place-content-center font-bold">
          Välj serie.
        </div>
      )}
      {groupName !== '' && gamesArray.length > 0 && (
        <div>
          <div className="flex w-full flex-row items-center justify-evenly">
            <div
              onClick={() => round > 0 && setRound((current) => current - 1)}
              className={
                round > 0
                  ? 'mt-3 w-6 cursor-pointer rounded-md py-3 text-left text-[#011d29]'
                  : 'mt-3 w-6 cursor-not-allowed rounded-md py-3 text-left text-slate-400'
              }
            >
              <LeftArrow />
            </div>
            <div className="mt-3 py-1 text-center font-bold md:text-xl">
              {groupName}
            </div>
            <div
              onClick={() =>
                round < dateArray.length - 1 &&
                setRound((current) => current + 1)
              }
              className={
                round < dateArray.length - 1
                  ? 'mt-3 w-6 cursor-pointer rounded-md py-3 text-right text-[#011d29]'
                  : 'mt-3 w-6 cursor-not-allowed rounded-md py-3 text-right text-slate-400'
              }
            >
              <RightArrow />
            </div>
          </div>
          <div>
            <div className="grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-8">
              <div className="mx-2 xl:mx-0">
                <div>
                  {dateArray[round]?.date !== null && (
                    <span className="text-sm font-bold md:text-base">
                      {dayjs(dateArray[round]?.date).format('D MMMM YYYY') !==
                      'Invalid Date'
                        ? dayjs(dateArray[round]?.date).format('D MMMM YYYY')
                        : 'Saknar speldatum'}
                    </span>
                  )}
                </div>
                {dateArray[round]?.games.map((game) => {
                  return (
                    <div
                      key={game.gameId}
                      className="flex flex-row justify-between px-2 py-1 text-[10px] even:bg-slate-300 md:text-sm xl:py-2 "
                    >
                      <div>
                        <span
                          className={
                            favTeams.includes(game.homeTeamId)
                              ? 'font-bold '
                              : ''
                          }
                        >
                          {game.homeTeam.casualName}
                        </span>
                        <span className="w-1 xl:w-4"> - </span>
                        <span
                          className={
                            favTeams.includes(game.awayTeamId)
                              ? 'font-bold'
                              : ''
                          }
                        >
                          {game.awayTeam.casualName}
                        </span>
                      </div>
                      <div>
                        <span className="w-4 pr-2 text-right">
                          {game.homeGoal}
                        </span>
                        <span className="w-4 text-center">-</span>
                        <span className="w-4 pl-2 text-justify">
                          {game.awayGoal}
                        </span>
                      </div>
                    </div>
                  )
                })}
              </div>
              <div className="mx-2 mt-4 xl:mx-0">
                <table className="season w-full text-xs md:text-sm ">
                  <thead>
                    <tr>
                      <th scope="col" className="pos"></th>
                      <th scope="col" className="team"></th>
                      <th scope="col"></th>
                      <th scope="col"></th>
                      <th scope="col"></th>
                      <th scope="col"></th>
                      <th scope="col"></th>
                      <th scope="col" className="twelve"></th>
                      <th scope="col" className="twelve"></th>
                      <th scope="col" className="twelve"></th>
                      <th scope="col"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {dateArray[round]?.table.map((team, index) => {
                      return (
                        <tr
                          key={`${team.teamId}-${index}`}
                          className={`season ${
                            seriesArray
                              .find((serie) => serie.serieGroupCode === group)
                              .serieStructure?.includes(index + 1)
                              ? 'border-b-2 border-black'
                              : null
                          } ${
                            favTeams.includes(team.teamId) ? 'font-bold' : null
                          } odd:bg-slate-300`}
                        >
                          <td className="pos">{team.position}</td>
                          <td className="team">{team.casualName}</td>
                          <td className="text-slate-100">
                            {round > 0 &&
                              team.table.games > 0 &&
                              displayArrow(team.teamId)}
                          </td>
                          <td>{team.table.games}</td>
                          <td>{team.table.wins}</td>
                          <td>{team.table.draws}</td>
                          <td>{team.table.lost}</td>
                          <td className="twelve">{team.table.scoredGoals}</td>
                          <td className="twelve">{team.table.concededGoals}</td>
                          <td className="twelve">
                            {team.table.scoredGoals - team.table.concededGoals}
                          </td>
                          <td>{team.table.points}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
                {seriesInfo.find((serie) => serie.serieGroupCode === group)
                  .comment && (
                  <p className="bg-white p-1 text-xs font-bold">
                    {
                      seriesInfo.find((serie) => serie.serieGroupCode === group)
                        .comment
                    }
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Animation
