import { Button } from '@/src/@/components/ui/button'
import { useGetMaratonTables } from '@/src/hooks/dataHooks/maratonHooks/useGetMaratonTables'

const MaratonTableHeader = () => {
  const { setHomeAwayTitle, setSearchParams, selectedTable } =
    useGetMaratonTables()
  return (
    <div className="mb-2 flex flex-row justify-center gap-4">
      <div>
        <Button
          variant={selectedTable === 'all' ? 'default' : 'outline'}
          onClick={() => {
            setSearchParams({ tab: 'maraton', table: 'all' })
            setHomeAwayTitle('')
          }}
        >
          Alla
        </Button>
      </div>
      <div>
        <Button
          variant={selectedTable === 'home' ? 'default' : 'outline'}
          onClick={() => {
            setSearchParams({ tab: 'maraton', table: 'home' })
            setHomeAwayTitle('Hemma')
          }}
        >
          Hemma
        </Button>
      </div>
      <div>
        <Button
          variant={selectedTable === 'away' ? 'default' : 'outline'}
          onClick={() => {
            setSearchParams({ tab: 'maraton', table: 'away' })
            setHomeAwayTitle('Borta')
          }}
        >
          Borta
        </Button>
      </div>
    </div>
  )
}

export default MaratonTableHeader
