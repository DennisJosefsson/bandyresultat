import { useFormContext, Controller } from 'react-hook-form'
import Select from 'react-select'
import { selectStyles } from '../utilitycomponents/selectStyles'
import { ChevronUp } from '../utilitycomponents/icons'

const operatorSelection = [
  { value: 'gte', label: 'Lika eller större än' },
  { value: 'lte', label: 'Lika eller mindre än' },
  { value: 'eq', label: 'Lika' },
]

const ResultFormComponent = ({ showResultForm, setShowResultForm }) => {
  const { register, control } = useFormContext()
  return (
    <div className="mb-2 flex w-[18rem] flex-col rounded bg-white p-2 text-sm shadow-md md:text-base lg:w-full">
      <div className="w grid grid-cols-1 gap-2 lg:grid-cols-3">
        <div className="flex max-w-[16rem] flex-col">
          <div>Resultat</div>
          <div>
            <input
              className="w-full border-[#011d29] text-[#011d29] md:w-[16rem]"
              type="text"
              {...register('result', {
                minLength: {
                  value: 3,
                  message: 'Resultatet måste vara i formatet n-n, t.ex. 2-1.',
                },
                maxLength: {
                  value: 5,
                  message: 'Resultatet måste vara i formatet n-n, t.ex. 2-1.',
                },
                pattern: {
                  value: '/[0-9]{1,2}-[0-9]{1,2}',
                  message: 'Resultatet måste vara i formatet n-n, t.ex. 2-1.',
                },
              })}
            />
          </div>
        </div>
        <div className="flex max-w-[16rem] flex-col">
          <div>Målskillnad</div>
          <div>
            <input
              className="w-full border-[#011d29] text-[#011d29] md:w-[16rem]"
              type="text"
              {...register('goalDiff', {
                pattern: {
                  value: '/[0-9]{1,2}',
                  message: 'Målskillnaden måste vara en eller två siffror.',
                },
              })}
            />
          </div>
        </div>
        <div className="flex max-w-[16rem] flex-col">
          <div>Jämförelse</div>
          <div>
            <Controller
              name="operator"
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
