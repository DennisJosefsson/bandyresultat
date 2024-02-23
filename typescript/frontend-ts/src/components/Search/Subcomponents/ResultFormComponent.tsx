import { useFormContext, Controller } from 'react-hook-form'
import Select from 'react-select'
import { selectStyles } from '../../utilitycomponents/Components/selectStyles'
import { ChevronUp } from '../../utilitycomponents/Components/icons'
import { Dispatch, SetStateAction } from 'react'

const operatorSelection = [
  { value: 'gte', label: 'Lika eller större än' },
  { value: 'lte', label: 'Lika eller mindre än' },
  { value: 'eq', label: 'Lika' },
]

type ResultFormComponentProps = {
  showResultForm: boolean
  setShowResultForm: Dispatch<SetStateAction<boolean>>
}

const ResultFormComponent = ({
  showResultForm,
  setShowResultForm,
}: ResultFormComponentProps) => {
  const { register, control } = useFormContext()
  return (
    <div className="mb-2 flex w-[18rem] flex-col rounded bg-white p-2 text-sm shadow-md md:text-base lg:w-full">
      <div className="w grid grid-cols-1 gap-2 lg:grid-cols-2">
        <div className="flex max-w-[16rem] flex-col lg:col-span-2">
          <div>Resultat</div>
          <div>
            <input
              className="w-full border-[#011d29] text-[#011d29] md:w-[16rem]"
              type="text"
              {...register('result')}
            />
          </div>
        </div>
        <div className="flex max-w-[16rem] flex-col">
          <div>Målskillnad</div>
          <div>
            <input
              className="w-full border-[#011d29] text-[#011d29] md:w-[16rem]"
              type="text"
              {...register('goalDiff')}
            />
          </div>
        </div>
        <div className="flex max-w-[16rem] flex-col">
          <div>Jämförelse målskillnad</div>
          <div>
            <Controller
              name="goalDiffOperator"
              control={control}
              render={({ field }) => (
                <Select
                  placeholder="Lika eller större än"
                  isSearchable={false}
                  {...field}
                  options={operatorSelection}
                  styles={selectStyles}
                  defaultValue={{
                    value: 'gte',
                    label: 'Lika eller större än',
                  }}
                  noOptionsMessage={() => 'Inga val'}
                />
              )}
            />
          </div>
        </div>
        <div className="flex max-w-[16rem] flex-col">
          <div>Gjorda mål</div>
          <div>
            <input
              className="w-full border-[#011d29] text-[#011d29] md:w-[16rem]"
              type="text"
              {...register('goalsScored')}
            />
          </div>
        </div>
        <div className="flex max-w-[16rem] flex-col">
          <div>Jämförelse gjorda mål</div>
          <div>
            <Controller
              name="goalsScoredOperator"
              control={control}
              render={({ field }) => (
                <Select
                  placeholder="Lika eller större än"
                  isSearchable={false}
                  {...field}
                  options={operatorSelection}
                  styles={selectStyles}
                  defaultValue={{
                    value: 'gte',
                    label: 'Lika eller större än',
                  }}
                  noOptionsMessage={() => 'Inga val'}
                />
              )}
            />
          </div>
        </div>
        <div className="flex max-w-[16rem] flex-col">
          <div>Insläppta mål</div>
          <div>
            <input
              className="w-full border-[#011d29] text-[#011d29] md:w-[16rem]"
              type="text"
              {...register('goalsConceded')}
            />
          </div>
        </div>
        <div className="flex max-w-[16rem] flex-col">
          <div>Jämförelse insläppta mål</div>
          <div>
            <Controller
              name="goalsConcededOperator"
              control={control}
              render={({ field }) => (
                <Select
                  placeholder="Lika eller större än"
                  isSearchable={false}
                  {...field}
                  options={operatorSelection}
                  styles={selectStyles}
                  defaultValue={{
                    value: 'gte',
                    label: 'Lika eller större än',
                  }}
                  noOptionsMessage={() => 'Inga val'}
                />
              )}
            />
          </div>
        </div>
      </div>
      <div
        className="flex w-full cursor-pointer flex-row justify-between py-2"
        onClick={() => setShowResultForm(false)}
      >
        <div>{showResultForm ? 'Göm resultatformulär' : null}</div>
        <div>{showResultForm ? <ChevronUp /> : null}</div>
      </div>
    </div>
  )
}

export default ResultFormComponent
