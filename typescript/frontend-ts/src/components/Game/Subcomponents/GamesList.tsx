import { Dispatch, SetStateAction } from 'react'

import { SortedGamesType } from '../../utilitycomponents/functions/sortFunction'
import { SerieAttributes } from '../../types/series/series'

import Date from '../../utilitycomponents/Components/Date'
import GamesListItem from './GamesListSubComponents/GamesListItem'

type GameListProps = {
  gamesArray: SortedGamesType
  title: string
  setShowModal: Dispatch<SetStateAction<boolean>>
  seriesInfo: SerieAttributes[]
  startSeason: number
  endSeason: number
}

const GamesList = ({
  gamesArray,
  title,
  seriesInfo,
  startSeason,
  endSeason,
}: GameListProps) => {
  return (
    <div className="mb-6 w-full font-inter">
      <h1 className="scroll-m-20 text-sm font-semibold text-primary md:text-base">
        {title}
      </h1>
      <div>
        {gamesArray.map((group) => {
          const seriesObject = seriesInfo.find(
            (serie) => serie.serieGroupCode === group.group,
          )
          return (
            <div key={group.group} className="mb-6">
              <h3 className="scroll-m-20 text-xs font-semibold text-primary md:text-sm">
                {gamesArray.length > 1 ? `${seriesObject?.serieName}` : ''}
              </h3>

              {seriesObject && seriesObject.comment && (
                <p className="my-2 max-w-xl bg-background p-1 text-xs font-bold">
                  {seriesObject.comment}
                </p>
              )}
              <div>
                {group.dates.map((date) => {
                  return (
                    <div key={`${date.date}-${Math.random()}`}>
                      {date.date !== 'null' && (
                        <h3 className="text-[0.75rem] md:text-sm">
                          <Date>{date.date}</Date>
                        </h3>
                      )}
                      <div className="w-full">
                        {date.games.map((game) => {
                          return (
                            <GamesListItem
                              key={game.gameId}
                              game={game}
                              startSeason={startSeason}
                              endSeason={endSeason}
                            />
                          )
                        })}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default GamesList
