import {
  LeftArrow,
  RightArrow,
} from '../../../utilitycomponents/Components/icons'

const AnimationClicker = ({ round, setRound, groupName, dateArray }) => {
  return (
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
          round < dateArray.length - 1 && setRound((current) => current + 1)
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
  )
}

export default AnimationClicker
