import { Dispatch, SetStateAction } from 'react'
import { CarouselApi } from '@/src/@/components/ui/carousel'
import { Button } from '@/src/@/components/ui/button'
import { sortOrder } from '@/src/components/utilitycomponents/functions/constants'
type GroupArrayObject = {
  group: string
  serieName: string
}

type GroupSelectorProps = {
  groupName: string | undefined
  setRound: Dispatch<SetStateAction<number>>
  setGroup: Dispatch<SetStateAction<string | null>>
  groupArray: GroupArrayObject[]
  api: CarouselApi | undefined
  dateApi: CarouselApi | undefined
}

const GroupSelector = ({
  groupArray,
  setRound,
  setGroup,
  groupName,
  api,
  dateApi,
}: GroupSelectorProps) => {
  return (
    <>
      <div className="flex flex-row justify-center gap-1">
        {groupArray
          .sort((a, b) => {
            if (sortOrder.indexOf(a.group) > sortOrder.indexOf(b.group)) {
              return 1
            } else if (
              sortOrder.indexOf(a.group) < sortOrder.indexOf(b.group)
            ) {
              return -1
            } else {
              return 0
            }
          })
          .map((group) => {
            return (
              <Button
                key={group.group}
                onClick={() => {
                  setGroup(group.group)
                  setRound(0)
                  api && api.scrollTo(0)
                  dateApi && dateApi.scrollTo(0)
                }}
                className="truncate"
                size="sm"
              >
                {group.serieName}
              </Button>
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
