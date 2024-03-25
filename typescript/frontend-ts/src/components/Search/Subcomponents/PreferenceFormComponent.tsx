import { useFormContext } from 'react-hook-form'
import { CheckboxComponent } from '../../utilitycomponents/Components/CheckboxComponent'
import { RadioGroupComponent } from '../../utilitycomponents/Components/RadioGroupComponent'

const categoryArray = [
  { value: 'final', label: 'Final' },
  { value: 'semi', label: 'Semi' },
  { value: 'quarter', label: 'Kvart' },
  { value: 'eight', label: 'Åttondel' },
  { value: 'regular', label: 'Grundserie' },
  { value: 'qualification', label: 'Kval' },
]

const resultCategoryArray = [
  { value: 'all', label: 'Alla' },
  { value: 'win', label: 'Vinst' },
  { value: 'lost', label: 'Förlust' },
  { value: 'draw', label: 'Oavgjort' },
]

const homeGameArray = [
  { value: 'both', label: 'Alla' },
  { value: 'home', label: 'Hemma' },
  { value: 'away', label: 'Borta' },
]
const selectedGenderArray = [
  { value: 'all', label: 'Alla' },
  { value: 'men', label: 'Herrar' },
  { value: 'women', label: 'Damer' },
]

const PreferenceFormComponent = () => {
  const methods = useFormContext()
  return (
    <div className="mb-2 flex w-[18rem] flex-col rounded bg-white lg:w-full">
      <div className="grid grid-cols-1 lg:grid-cols-3">
        <div className="text-left">
          <CheckboxComponent
            methods={methods}
            checkboxArray={categoryArray}
            label="Matchkategorier"
            description="Välj minst en kategori."
            name="categoryArray"
          />
          <RadioGroupComponent
            name="gameResult"
            radioGroupArray={resultCategoryArray}
            label="Matchresultat"
            methods={methods}
          />
          <RadioGroupComponent
            name="homeGame"
            radioGroupArray={homeGameArray}
            label="Hemma/borta"
            methods={methods}
          />
          <RadioGroupComponent
            name="selectedGender"
            radioGroupArray={selectedGenderArray}
            label="Sökpreferens"
            methods={methods}
          />
        </div>
      </div>
    </div>
  )
}

export default PreferenceFormComponent
