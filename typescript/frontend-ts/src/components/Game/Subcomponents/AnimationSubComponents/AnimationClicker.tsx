import { Dispatch, SetStateAction } from 'react'
import {
  LeftArrow,
  RightArrow,
} from '../../../utilitycomponents/Components/icons'
import { Slider } from '@/src/@/components/ui/slider'

type AnimationClickerProps = {
  round: number[]
  setRound: Dispatch<SetStateAction<number[]>>
  groupName: string | undefined
  arrayLength: number
}

const AnimationClicker = ({
  round,
  setRound,
  groupName,
  arrayLength,
}: AnimationClickerProps) => {
  return (
    <div className="flex flex-col">
      {groupName && (
        <>
          <div className="mb-2 flex w-full flex-row items-center justify-evenly">
            <div
              onClick={() =>
                round[0] > 0 && setRound((current) => [current[0] - 1])
              }
              className={
                round[0] > 0
                  ? 'mt-3 w-6 cursor-pointer rounded-md py-3 text-left text-foreground'
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
                round[0] < arrayLength - 1 &&
                setRound((current) => [current[0] + 1])
              }
              className={
                round[0] < arrayLength - 1
                  ? 'mt-3 w-6 cursor-pointer rounded-md py-3 text-right text-foreground'
                  : 'mt-3 w-6 cursor-not-allowed rounded-md py-3 text-right text-slate-400'
              }
            >
              <RightArrow />
            </div>
          </div>
          <div className="mb-2">
            <Slider
              value={round}
              onValueChange={setRound}
              max={arrayLength - 1}
              step={1}
              className="m-auto w-[55%]"
            />
          </div>
        </>
      )}
    </div>
  )
}

export default AnimationClicker
