import { Link } from 'react-router-dom'
// import { LeftArrow, RightArrow } from '../../utilitycomponents/Components/icons'
// import { useGetFirstAndLastSeason } from '../../../hooks/dataHooks/seasonHooks/useGetFirstAndLastSeason'
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/src/@/components/ui/carousel'

import { Button } from '@/src/@/components/ui/button'
import useGetAllSeasons from '@/src/hooks/dataHooks/seasonHooks/useGetAllSeasons'
import { useState, useEffect } from 'react'

type SeasonHeaderProps = {
  seasonId: number
  women: boolean
  tab: string | null
}

const SeasonHeader = ({ seasonId, tab }: SeasonHeaderProps) => {
  //const { firstSeason, lastSeason } = useGetFirstAndLastSeason()
  const [api, setApi] = useState<CarouselApi>()
  const [selectedButton, setSelectedButton] = useState(0)
  const { seasons } = useGetAllSeasons()

  const seasonArray = seasons
    ?.filter((season) => season.women === false)
    .sort((a, b) => (a.seasonId > b.seasonId ? 1 : -1))
    .map((season, index) => {
      return {
        year: season.year,
        season:
          parseInt(season.year) < 1964
            ? season.year
            : season.year.split('/')[1],
        index: index,
      }
    })

  const startIndex = seasonArray
    ? seasonArray.find((season) => {
        const seasonYear =
          seasonId < 1964 ? seasonId.toString() : `${seasonId - 1}/${seasonId}`
        return season.year === seasonYear
      })?.index
    : 0

  useEffect(() => {
    if (!api) return
    api.on('select', () => {
      setSelectedButton(api.selectedScrollSnap())
    })
  }, [api])

  useEffect(() => {
    if (!startIndex) return
    setSelectedButton(startIndex)
  }, [startIndex])

  return (
    <div className="flex flex-col gap-2">
      {/* <div className="flex flex-row justify-center">
        <div className="mx-auto mb-4 flex w-full flex-1 flex-row items-center justify-center">
          <div className={seasonId === firstSeason ? 'invisible' : undefined}>
            <Link
              to={`/season/${seasonId - 1}?tab=${tab}`}
              state={{ resetRound: true }}
            >
              <div className="flex flex-row items-center gap-1">
                <LeftArrow />
              </div>
            </Link>
          </div>
          <div className="mx-16">
            <h2 className="text-center text-[12px] font-bold sm:text-xl lg:text-2xl">
              Säsong{' '}
              {seasonId < 1964 ? `${seasonId}` : `${seasonId - 1}/${seasonId}`}{' '}
              {women ? 'Damer' : 'Herrar'}
            </h2>
          </div>
          <div className={seasonId === lastSeason ? 'invisible' : undefined}>
            <Link
              to={`/season/${seasonId + 1}?tab=${tab}`}
              state={{ resetRound: true }}
            >
              <div className="flex flex-row items-center gap-1">
                <RightArrow />
              </div>
            </Link>
          </div>
        </div>
      </div> */}
      <div className="mb-4 flex items-center justify-center">
        <Carousel
          setApi={setApi}
          className="w-[60%] max-w-2xl self-center"
          opts={{ startIndex: startIndex ?? 0, loop: true }}
        >
          <CarouselContent className="-ml-1">
            {seasonArray.map((season) => {
              return (
                <CarouselItem
                  key={season.index}
                  className="basis-1/2 px-1 sm:basis-1/3"
                >
                  <div className="flex items-center justify-center">
                    <Button
                      size="lg"
                      variant="ghost"
                      asChild
                      className={
                        season.index === selectedButton
                          ? 'text-[12px] font-semibold sm:text-xl'
                          : 'text-[10px] sm:text-lg'
                      }
                    >
                      <Link
                        to={`/season/${season.season}?tab=${tab}`}
                        state={{ resetRound: true }}
                      >
                        {season.year}
                      </Link>
                    </Button>
                  </div>
                </CarouselItem>
              )
            })}
          </CarouselContent>
          <CarouselPrevious className="h-6 w-6 md:h-8 md:w-8" />
          <CarouselNext className="h-6 w-6 md:h-8 md:w-8" />
        </Carousel>
      </div>
    </div>
  )
}

export default SeasonHeader
