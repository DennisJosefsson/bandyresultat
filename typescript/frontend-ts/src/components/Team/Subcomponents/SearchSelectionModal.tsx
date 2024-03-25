import useMenuContext from '../../../hooks/contextHooks/useMenuContext'
import { useFormContext } from 'react-hook-form'
import { CheckboxComponent } from '../../utilitycomponents/Components/CheckboxComponent'
import { SelectComponent } from '../../utilitycomponents/Components/SelectComponent'
import { useCompareSeasons } from '@/src/hooks/dataHooks/teamHooks/useCompare'
import useGenderContext from '@/src/hooks/contextHooks/useGenderContext'

const categoryArray = [
  { value: 'final', label: 'Final' },
  { value: 'semi', label: 'Semi' },
  { value: 'quarter', label: 'Kvart' },
  { value: 'eight', label: 'Åttondel' },
  { value: 'regular', label: 'Grundserie' },
  { value: 'qualification', label: 'Kval' },
]

const SearchSelection = () => {
  const { open } = useMenuContext()
  const methods = useFormContext()
  const { women } = useGenderContext()
  const { startOptions, endOptions } = useCompareSeasons()

  return (
    <>
      <div className="mx-2 font-inter text-[#011d29] xl:mx-0">
        {!open && (
          <div className="text-left">
            <CheckboxComponent
              label="Matchkategorier"
              description="Välj minst en kategori."
              name="categoryArray"
              checkboxArray={categoryArray}
              methods={methods}
            />
            <div>
              <SelectComponent
                methods={methods}
                selectionArray={startOptions}
                name="startSeason"
                placeholder={women ? '1972/73' : '1907'}
                label="Första säsong"
              />
              <SelectComponent
                methods={methods}
                selectionArray={endOptions}
                name="endSeason"
                placeholder="2023/2024"
                label="Sista säsong"
              />
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default SearchSelection
