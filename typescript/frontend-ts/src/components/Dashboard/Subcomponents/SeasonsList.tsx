import { Sheet, SheetContent } from '@/src/@/components/ui/sheet'
import { SeasonObjectType } from '../../types/season/seasons'
import { useState } from 'react'
import TeamSeasonForm from '../../Season/Subcomponents/TeamSeasonForm'
import SingleSeason from '../SingleSeason'

const SeasonsList = ({ seasons }: { seasons: SeasonObjectType[] }) => {
  const [seasonId, setSeasonId] = useState<number>(0)
  const [year, setYear] = useState<string>('')
  const [open, setOpen] = useState<boolean>(false)
  const [tab, setTab] = useState<string | null>(null)
  const [women, setWomen] = useState<boolean>(false)
  return (
    <>
      <div className="grid grid-cols-2 justify-between gap-x-8 gap-y-2 pt-2">
        {seasons.map((season) => {
          return (
            <div
              key={season.seasonId}
              className="flex flex-row items-center justify-between bg-background px-2 py-1 text-sm lg:text-base"
            >
              <div
                className="cursor-pointer font-semibold"
                onClick={() => {
                  setTab('singleSeason')
                  setYear(season.year)
                  setWomen(season.women)
                  setOpen(true)
                }}
              >
                {season.year} {season.women ? 'Dam' : 'Herr'}
              </div>
              <div
                className="cursor-pointer rounded-md bg-background px-2 py-1 text-center lg:bg-background xl:p-0"
                onClick={() => {
                  setTab('teamseason')
                  setOpen(true)
                  setSeasonId(season.seasonId)
                  setWomen(season.women)
                }}
              >
                Lag
              </div>
              <div className="cursor-pointer rounded-md bg-background px-2 py-1 text-center lg:bg-background xl:p-0">
                Matcher
              </div>
            </div>
          )
        })}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetContent side="bottom" className="h-[90%] overflow-auto">
            {tab === 'teamseason' && (
              <TeamSeasonForm women={women} seasonId={seasonId} />
            )}
            {tab === 'singleSeason' && (
              <SingleSeason year={year} women={women} />
            )}
          </SheetContent>
        </Sheet>
      </div>
    </>
  )
}

export default SeasonsList
