import { Dispatch, SetStateAction } from 'react'

type GroupArrayObject = {
  group: string
  serieName: string
}

type GroupSelectorProps = {
  groupName: string | undefined
  setRound: Dispatch<SetStateAction<number[]>>
  setGroup: Dispatch<SetStateAction<string | null>>
  groupArray: GroupArrayObject[]
}

const GroupSelector = ({
  groupArray,
  setRound,
  setGroup,
  groupName,
}: GroupSelectorProps) => {
  return (
    <>
      <div className="flex flex-row justify-center gap-1">
        {groupArray.map((group) => {
          return (
            <div
              key={group.group}
              onClick={() => {
                setGroup(group.group)
                setRound([0])
              }}
              className="cursor-pointer truncate rounded bg-slate-400 p-1 text-xs text-white md:text-sm lg:text-base"
            >
              {group.serieName}
            </div>
          )
        })}
      </div>
      {!groupName ? (
        <div className="mt-2 grid place-content-center font-bold">
          Välj serie.
        </div>
      ) : null}
    </>
  )
}

export default GroupSelector
