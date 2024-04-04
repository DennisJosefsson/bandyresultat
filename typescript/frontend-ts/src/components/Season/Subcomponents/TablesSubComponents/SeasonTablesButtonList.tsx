import { Dispatch, SetStateAction } from 'react'
import { Button } from '@/src/@/components/ui/button'
type SeasonTablesButtonListProps = {
  setHomeAwayTitle: Dispatch<SetStateAction<string>>
  setSelectedTable: Dispatch<SetStateAction<string>>
  table: string
}
const SeasonTablesButtonList = ({
  setHomeAwayTitle,
  setSelectedTable,
  table,
}: SeasonTablesButtonListProps) => {
  return (
    <div className="mt-2 grid w-full grid-cols-3 justify-center gap-4 px-6 sm:px-2 md:flex md:flex-row lg:px-0">
      <Button
        variant={table === 'all' ? 'default' : 'outline'}
        onClick={() => {
          setSelectedTable('all')
          setHomeAwayTitle('')
        }}
      >
        Alla matcher
      </Button>
      <Button
        variant={table === 'home' ? 'default' : 'outline'}
        onClick={() => {
          setSelectedTable('home')
          setHomeAwayTitle('Hemma')
        }}
      >
        Hemmatabell
      </Button>
      <Button
        variant={table === 'away' ? 'default' : 'outline'}
        onClick={() => {
          setSelectedTable('away')
          setHomeAwayTitle('Borta')
        }}
      >
        Bortatabell
      </Button>
    </div>
  )
}

export default SeasonTablesButtonList
