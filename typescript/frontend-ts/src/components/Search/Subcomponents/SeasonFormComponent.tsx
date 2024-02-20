import { useFormContext } from 'react-hook-form'
import { ChevronUp } from '../../utilitycomponents/Components/icons'
import { Dispatch, SetStateAction } from 'react'

type SeasonFormComponentProps = {
  showSeasonForm: boolean
  setShowSeasonForm: Dispatch<SetStateAction<boolean>>
}

const SeasonFormComponent = ({
  showSeasonForm,
  setShowSeasonForm,
}: SeasonFormComponentProps) => {
  const { register } = useFormContext()

  return (
    <div className="mb-2 flex w-[18rem] flex-col rounded bg-white p-2 text-sm shadow-md md:text-base lg:w-full">
      <div className="grid grid-cols-1 lg:grid-cols-3">
        <div className="flex max-w-[16rem] flex-col">
          <div>Första år</div>
          <div>
            <input
              className="w-[16rem] border-[#011d29] text-[#011d29]"
              type="text"
              {...register('startSeason')}
              placeholder="T.ex. 1964 för 1963/1964"
            />
          </div>
        </div>
        <div className="flex max-w-[16rem] flex-col">
          <div>Sista år</div>
          <div>
            <input
              className="w-[16rem] border-[#011d29] text-[#011d29]"
              type="text"
              {...register('endSeason')}
              placeholder="T.ex. 2021 för 2020/2021"
            />
          </div>
        </div>
        <div className="flex max-w-[16rem] flex-col">
          <div>Matchdatum</div>
          <div>
            <input
              className="w-[16rem] border-[#011d29] text-[#011d29]"
              type="text"
              {...register('inputDate')}
              placeholder="T.ex. 26/12 för annandagen"
            />
          </div>
        </div>
      </div>
      <div
        className="flex w-full cursor-pointer flex-row justify-between py-2"
        onClick={() => setShowSeasonForm(false)}
      >
        <div>{showSeasonForm ? 'Göm säsongsinställningar' : null}</div>
        <div>{showSeasonForm ? <ChevronUp /> : null}</div>
      </div>
    </div>
  )
}

export default SeasonFormComponent
