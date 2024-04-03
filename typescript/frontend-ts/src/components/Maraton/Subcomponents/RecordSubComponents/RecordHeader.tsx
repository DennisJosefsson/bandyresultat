import { Button } from '@/src/@/components/ui/button'
import useGenderContext from '@/src/hooks/contextHooks/useGenderContext'
import { useGetRecordData } from '@/src/hooks/dataHooks/maratonHooks/useGetRecordData'

const RecordHeader = () => {
  const { women } = useGenderContext()
  const { setSearchParams, setParams, title, setTitle, record } =
    useGetRecordData()
  return (
    <>
      <h2 className="mb-4 text-center text-base font-bold leading-4 sm:text-xl md:mb-6 lg:text-2xl">
        {title} {women ? 'Damer' : 'Herrar'}
      </h2>
      <div className="mb-2 flex flex-row justify-center gap-1 md:gap-4">
        <Button
          variant={record === 'generalStats' ? 'default' : 'outline'}
          onClick={() => {
            setParams((params) => ({ ...params, record: 'generalStats' }))
            setSearchParams({ tab: 'records', record: 'generalStats' })
            setTitle('Statistik')
          }}
        >
          Statistik
        </Button>
        <Button
          variant={record === 'points' ? 'default' : 'outline'}
          onClick={() => {
            setParams((params) => ({ ...params, record: 'points' }))
            setSearchParams({ tab: 'records', record: 'points' })
            setTitle('Poäng Elitserien')
          }}
        >
          Poäng
        </Button>
        <Button
          variant={record === 'scored' ? 'default' : 'outline'}
          onClick={() => {
            setParams((params) => ({ ...params, record: 'scored' }))
            setSearchParams({ tab: 'records', record: 'scored' })
            setTitle('Gjorda mål Elitserien')
          }}
        >
          Gjorda mål
        </Button>
        <Button
          variant={record === 'conceded' ? 'default' : 'outline'}
          onClick={() => {
            setParams((params) => ({ ...params, record: 'conceded' }))
            setSearchParams({ tab: 'records', record: 'conceded' })
            setTitle('Insläppta mål Elitserien')
          }}
        >
          Insl. mål
        </Button>
        <Button
          variant={record === 'streaks' ? 'default' : 'outline'}
          onClick={() => {
            setParams((params) => ({ ...params, record: 'streaks' }))
            setSearchParams({ tab: 'records', record: 'streaks' })
            setTitle('Rekordsviter')
          }}
        >
          Rekordsviter
        </Button>
      </div>
    </>
  )
}

export default RecordHeader
