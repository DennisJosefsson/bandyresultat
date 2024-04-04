import { useFormContext } from 'react-hook-form'
import { InputComponent } from '../../utilitycomponents/Components/InputComponent'
import { useGetFirstAndLastSeason } from '@/src/hooks/dataHooks/seasonHooks/useGetFirstAndLastSeason'

const SeasonFormComponent = () => {
  const methods = useFormContext()
  const { lastSeason } = useGetFirstAndLastSeason()

  return (
    <div className="mb-2 flex w-[18rem] flex-col rounded bg-background lg:w-full">
      <div className="grid grid-cols-1 lg:grid-cols-3">
        <div className="flex max-w-[16rem] flex-col">
          <InputComponent
            methods={methods}
            name="startSeason"
            label="Första år"
            placeholder="1907"
            description={`1907-${lastSeason}`}
          />
        </div>
        <div className="flex max-w-[16rem] flex-col">
          <InputComponent
            methods={methods}
            name="endSeason"
            label="Sista år"
            placeholder={`${lastSeason}`}
            description={`1907-${lastSeason}`}
          />
        </div>
        <div className="flex max-w-[16rem] flex-col">
          <InputComponent
            methods={methods}
            name="inputDate"
            label="Matchdatum"
            placeholder="Datum"
            description="T.ex. 26/12 för annandagen."
          />
        </div>
      </div>
    </div>
  )
}

export default SeasonFormComponent
