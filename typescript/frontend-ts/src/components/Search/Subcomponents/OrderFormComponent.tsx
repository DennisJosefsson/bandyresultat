import { useFormContext } from 'react-hook-form'
import { SelectComponent } from '../../utilitycomponents/Components/SelectComponent'

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
  { value: 'goalDifference', label: 'Målskillnad' },
  { value: 'goalsScored', label: 'Gjorda mål' },
  { value: 'goalsConceded', label: 'Insläppta mål' },
]

const OrderFormComponent = () => {
  const methods = useFormContext()
  return (
    <div className="mb-2 flex w-[18rem] flex-col rounded bg-white lg:w-full">
      <div className="grid grid-cols-1 lg:grid-cols-3">
        <div className="flex max-w-[16rem] flex-col">
          <SelectComponent
            selectionArray={limitSelection}
            label="Max antal träffar"
            methods={methods}
            name="limit"
            placeholder="Välj"
          />
        </div>
        <div className="flex max-w-[16rem] flex-col">
          <SelectComponent
            selectionArray={orderSelection}
            label="Sorteringsordning"
            methods={methods}
            name="order"
            placeholder="Välj"
          />
        </div>
        <div className="flex max-w-[16rem] flex-col">
          <SelectComponent
            selectionArray={orderVariableSelection}
            label="Välj sorteringsfält"
            methods={methods}
            name="orderVar"
            placeholder="Välj"
          />
        </div>
      </div>
    </div>
  )
}

export default OrderFormComponent
