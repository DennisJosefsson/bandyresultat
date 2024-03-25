import { useFormContext } from 'react-hook-form'

import { InputComponent } from '../../utilitycomponents/Components/InputComponent'
import { SelectComponent } from '../../utilitycomponents/Components/SelectComponent'

const operatorSelection = [
  { value: 'gte', label: 'Lika eller större än' },
  { value: 'lte', label: 'Lika eller mindre än' },
  { value: 'eq', label: 'Lika' },
]

const ResultFormComponent = () => {
  const methods = useFormContext()
  return (
    <div className="mb-2 flex w-[18rem] flex-col rounded bg-white lg:w-full">
      <div className="w grid grid-cols-1 gap-2 lg:grid-cols-2">
        <div className="flex max-w-[16rem] flex-col lg:col-span-2">
          <InputComponent
            methods={methods}
            name="result"
            label="Resultat"
            placeholder="Resultat"
            description="Ange resultat i format t.ex. 3-2"
          />
        </div>
        <div className="flex max-w-[16rem] flex-col">
          <InputComponent
            methods={methods}
            name="goalDiff"
            label="Målskillnad"
            placeholder="Målskillnad"
            description="Målskillnad siffra större än 0."
          />
        </div>
        <div className="flex max-w-[16rem] flex-col">
          <SelectComponent
            selectionArray={operatorSelection}
            label="Jämförelse målskillnad"
            methods={methods}
            name="goalDiffOperator"
            placeholder="Välj"
          />
        </div>
        <div className="flex max-w-[16rem] flex-col">
          <InputComponent
            methods={methods}
            name="goalsScored"
            label="Gjorda mål"
            placeholder="Gjorda mål"
            description="Antalet gjorda mål, siffra större än 0."
          />
        </div>
        <div className="flex max-w-[16rem] flex-col">
          <SelectComponent
            selectionArray={operatorSelection}
            label="Jämförelse gjorda mål"
            methods={methods}
            name="goalsScoredOperator"
            placeholder="Välj"
          />
        </div>
        <div className="flex max-w-[16rem] flex-col">
          <InputComponent
            methods={methods}
            name="goalsConceded"
            label="Insläppta mål"
            placeholder="Insläppta mål"
            description="Antalet insläppta mål, siffra större än 0."
          />
        </div>
        <div className="flex max-w-[16rem] flex-col">
          <SelectComponent
            selectionArray={operatorSelection}
            label="Jämförelse insläppta mål"
            methods={methods}
            name="goalsConcededOperator"
            placeholder="Välj"
          />
        </div>
      </div>
    </div>
  )
}

export default ResultFormComponent
