import { Dispatch, SetStateAction } from 'react'
import { useFormContext, Controller } from 'react-hook-form'
import Select from 'react-select'
import { selectStyles } from '../../utilitycomponents/Components/selectStyles'
import { ChevronUp } from '../../utilitycomponents/Components/icons'

const limitSelection = [
  { value: 5, label: '5' },
  { value: 10, label: '10' },
  { value: 15, label: '15' },
  { value: 20, label: '20' },
  { value: 50, label: '50' },
  { value: 100, label: '100' },
]

const orderSelection = [
  { value: 'asc', label: 'Stigande' },
  { value: 'desc', label: 'Fallande' },
]

const orderVariableSelection = [
  { value: 'date', label: 'Datum' },
  { value: 'totalGoals', label: 'Antal mål' },
  { value: 'goalDiff', label: 'Målskillnad' },
  { value: 'goalsScored', label: 'Gjorda mål' },
  { value: 'goalsConceded', label: 'Insläppta mål' },
]

type OrderFormComponentProps = {
  showOrderForm: boolean
  setShowOrderForm: Dispatch<SetStateAction<boolean>>
}

const OrderFormComponent = ({
  showOrderForm,
  setShowOrderForm,
}: OrderFormComponentProps) => {
  const { control } = useFormContext()
  return (
    <div className="mb-2 flex w-[18rem] flex-col rounded bg-white p-2 text-sm shadow-md md:text-base lg:w-full">
      <div className="grid grid-cols-1 lg:grid-cols-3">
        <div className="flex max-w-[16rem] flex-col">
          <div>Max antal träffar</div>
          <div>
            <Controller
              name="limit"
              control={control}
              render={({ field }) => (
                <Select
                  isSearchable={false}
                  {...field}
                  options={limitSelection}
                  styles={selectStyles}
                  defaultValue={{
                    label: '10',
                    value: '10',
                  }}
                  noOptionsMessage={() => 'Inga val'}
                />
              )}
            />
          </div>
        </div>
        <div className="flex max-w-[16rem] flex-col">
          <div>Sorteringsordning</div>
          <div>
            <Controller
              name="order"
              control={control}
              render={({ field }) => (
                <Select
                  isSearchable={false}
                  {...field}
                  options={orderSelection}
                  defaultValue={{ value: 'desc', label: 'Fallande' }}
                  styles={selectStyles}
                  noOptionsMessage={() => 'Inga val'}
                />
              )}
            />
          </div>
        </div>
        <div className="flex max-w-[16rem] flex-col">
          <div>Välj sorteringsfält</div>
          <div>
            <Controller
              name="orderVar"
              control={control}
              render={({ field }) => (
                <Select
                  isSearchable={false}
                  {...field}
                  options={orderVariableSelection}
                  styles={selectStyles}
                  defaultValue={{ value: 'date', label: 'Datum' }}
                  noOptionsMessage={() => 'Inga val'}
                />
              )}
            />
          </div>
        </div>
      </div>
      <div
        className="flex w-full cursor-pointer flex-row justify-between py-2"
        onClick={() => setShowOrderForm(false)}
      >
        <div>{showOrderForm ? 'Göm sorteringsval' : null}</div>
        <div>{showOrderForm ? <ChevronUp /> : null}</div>
      </div>
    </div>
  )
}

export default OrderFormComponent
