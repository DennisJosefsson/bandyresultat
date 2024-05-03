import { Dispatch, SetStateAction } from 'react'

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/src/@/components/ui/carousel'

type AnimationClickerProps = {
  groupName: string | undefined
  arrayLength: number
  justDatesArray: string[]
  setApi: Dispatch<SetStateAction<CarouselApi>>
  api: CarouselApi | undefined
  setDateApi: Dispatch<SetStateAction<CarouselApi>>
}

const AnimationClicker = ({
  groupName,
  arrayLength,
  setApi,
  api,
  setDateApi,
  justDatesArray,
}: AnimationClickerProps) => {
  return (
    <div className="mt-4 flex flex-col gap-4">
      <div className="mb-1 flex flex-row items-center justify-center">
        {groupName && (
          <Carousel
            setApi={setApi}
            className="w-[50%] max-w-[240px] self-center xxs:max-w-xs xs:w-[60%] sm:max-w-sm md:max-w-2xl"
            opts={{ loop: true, containScroll: 'keepSnaps' }}
          >
            <CarouselContent className="-ml-1">
              {Array.from({ length: arrayLength }).map((_, index) => {
                return (
                  <CarouselItem key={index}>
                    <div className="flex cursor-pointer flex-row items-center justify-center text-[10px] sm:text-xs lg:text-lg">
                      Matchdag {index + 1}
                    </div>
                  </CarouselItem>
                )
              })}
            </CarouselContent>
            <CarouselPrevious className="h-3 w-3 lg:h-6 lg:w-6" />
            <CarouselNext className="h-3 w-3 lg:h-6 lg:w-6" />
          </Carousel>
        )}
      </div>
      <div className="mb-2 flex flex-row items-center justify-center">
        {justDatesArray.length > 0 ? (
          <Carousel
            className="w-[50%] max-w-[240px] self-center xxs:max-w-xs xs:w-[60%] sm:max-w-sm md:max-w-2xl"
            setApi={setDateApi}
            opts={{ containScroll: 'keepSnaps', dragFree: true, loop: true }}
          >
            <CarouselContent>
              {justDatesArray.map((date, index) => {
                return (
                  <CarouselItem key={date} className="basis-1/5">
                    <div
                      className="flex cursor-pointer flex-row items-center justify-center text-[8px] md:text-[10px]"
                      onClick={() => api && api.scrollTo(index)}
                    >
                      {date}
                    </div>
                  </CarouselItem>
                )
              })}
            </CarouselContent>
            <CarouselPrevious className="h-3 w-3 lg:h-6 lg:w-6" />
            <CarouselNext className="h-3 w-3 lg:h-6 lg:w-6" />
          </Carousel>
        ) : null}
      </div>
    </div>
  )
}

export default AnimationClicker
