import { useCompareSeasons } from '@/src/hooks/dataHooks/teamHooks/useCompare'
import useGenderContext from '@/src/hooks/contextHooks/useGenderContext'
import { FormComponent } from '../utilitycomponents/Components/ReactHookFormComponents/FormComponent'
import { useFormContext } from 'react-hook-form'

const categoryArraySelection = [
  { value: 'final', label: 'Final' },
  { value: 'semi', label: 'Semi' },
  { value: 'quarter', label: 'Kvart' },
  { value: 'eight', label: 'Åttondel' },
  { value: 'regular', label: 'Grundserie' },
  { value: 'qualification', label: 'Kval' },
]

const CompareSelectionForm = () => {
  const methods = useFormContext()

  const { women } = useGenderContext()
  const { startOptions, endOptions, endOptionsPlaceholder } =
    useCompareSeasons()

  return (
    <>
      <div className="m-2 font-inter text-foreground xl:mx-0">
        <div className=" flex flex-col gap-2">
          <div>
            <FormComponent name="categoryArray" methods={methods}>
              <FormComponent.Label>Matchkategorier</FormComponent.Label>
              <FormComponent.Description>
                Välj minst en kategori.
              </FormComponent.Description>
              <div className="grid grid-cols-1 gap-y-1 lg:grid-cols-3 lg:gap-x-32">
                <FormComponent.MultiCheckbox
                  checkboxArray={categoryArraySelection}
                  className="flex flex-row items-center justify-between space-x-3 space-y-0"
                />
              </div>
            </FormComponent>
          </div>
          <div className="w-60">
            <FormComponent methods={methods} name="startSeason">
              <FormComponent.Label>Första säsong</FormComponent.Label>
              <FormComponent.Select
                selectionArray={startOptions}
                placeholder={women ? '1972/73' : '1907'}
              />
            </FormComponent>
          </div>
          <div className="w-60">
            <FormComponent methods={methods} name="endSeason">
              <FormComponent.Label>Sista säsong</FormComponent.Label>
              <FormComponent.Select
                selectionArray={endOptions}
                placeholder={endOptionsPlaceholder}
              />
            </FormComponent>
          </div>
        </div>
      </div>
    </>
  )
}

export default CompareSelectionForm
