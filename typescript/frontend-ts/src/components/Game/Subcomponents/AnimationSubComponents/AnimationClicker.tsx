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
      <div className="flex flex-row items-center justify-center">
        {groupName && (
          <Carousel
            setApi={setApi}
            className="w-full max-w-sm"
            opts={{ loop: true, containScroll: 'keepSnaps' }}
          >
            <CarouselContent>
              {Array.from({ length: arrayLength }).map((_, index) => {
                return (
                  <CarouselItem key={index}>
                    <div className="flex cursor-pointer flex-row items-center justify-center">
                      Matchdag {index + 1}
                    </div>
                  </CarouselItem>
                )
              })}
            </CarouselContent>
            <CarouselPrevious className="h-6 w-6" />
            <CarouselNext className="h-6 w-6" />
          </Carousel>
        )}
      </div>
      <div className="flex flex-row items-center justify-center">
        {justDatesArray.length > 0 ? (
          <Carousel
            className="w-full max-w-sm"
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
            <CarouselPrevious className="h-6 w-6" />
            <CarouselNext className="h-6 w-6" />
          </Carousel>
        ) : null}
      </div>
    </div>
  )
}

export default AnimationClicker
