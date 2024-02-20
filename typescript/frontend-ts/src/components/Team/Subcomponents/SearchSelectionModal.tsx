import Select from 'react-select'
import { selectStyles } from '../../utilitycomponents/Components/selectStyles'

import { ButtonComponent } from '../../utilitycomponents/Components/ButtonComponents'

import { MenuContext } from '../../../contexts/contexts'
import useMenuContext from '../../../hooks/contextHooks/useMenuContext'

const SearchSelection = ({
  formState,
  handleCategoryArrayChange,
  endOptions,
  startOptions,
  handleEndSeasonChange,
  handleStartSeasonChange,
  women,
  dispatch,
}) => {
  const { open } = useMenuContext()
  const setElitserien = () => {
    dispatch({
      type: 'INPUT START',
      payload: women ? 162 : 102,
    })
  }

  const setPlayoff = () => {
    dispatch({
      type: 'CLEAR CATEGORIES',
    })

    dispatch({
      type: 'ADD CATEGORY',
      payload: 'eight',
    })
    dispatch({
      type: 'ADD CATEGORY',
      payload: 'quarter',
    })
    dispatch({
      type: 'ADD CATEGORY',
      payload: 'semi',
    })
    dispatch({
      type: 'ADD CATEGORY',
      payload: 'final',
    })
  }

  return (
    <>
      <div className="mx-2 font-inter text-[#011d29] xl:mx-0">
        <div className="flex flex-row items-center justify-start gap-2">
          <ButtonComponent clickFunctions={() => setElitserien()}>
            Elitserien
          </ButtonComponent>
          <ButtonComponent clickFunctions={() => setPlayoff()}>
            Slutspel
          </ButtonComponent>
        </div>
        {!open && (
          <div className="text-left">
            <fieldset className="mb-2 flex flex-col self-start">
              <legend className="mb-2 font-bold underline underline-offset-2">
                Matchkategorier
              </legend>
              <div className="mb-1 flex items-center">
                <input
                  className="content-center border-[#011d29] text-[#011d29] focus:border-[#011d29] focus:ring-0"
                  type="checkbox"
                  id="final"
                  name="final"
                  value="final"
                  checked={formState.categoryArray.indexOf('final') > -1}
                  onChange={(event) => handleCategoryArrayChange(event)}
                />
                <label htmlFor="final" className="pl-2">
                  Final
                </label>
              </div>
              <div className="mb-1 flex items-center">
                <input
                  className="border-[#011d29] text-[#011d29] focus:border-[#011d29] focus:ring-0"
                  type="checkbox"
                  id="semi"
                  name="semi"
                  value="semi"
                  checked={formState.categoryArray.indexOf('semi') > -1}
                  onChange={(event) => handleCategoryArrayChange(event)}
                />
                <label htmlFor="semi" className="pl-2">
                  Semifinal
                </label>
              </div>
              <div className="mb-1 flex items-center">
                <input
                  className="border-[#011d29] text-[#011d29] focus:border-[#011d29] focus:ring-0"
                  type="checkbox"
                  id="quarter"
                  name="quarter"
                  value="quarter"
                  checked={formState.categoryArray.indexOf('quarter') > -1}
                  onChange={(event) => handleCategoryArrayChange(event)}
                />
                <label htmlFor="quarter" className="pl-2">
                  Kvartsfinal
                </label>
              </div>
              <div className="mb-1 flex items-center">
                <input
                  className="border-[#011d29] text-[#011d29] focus:border-[#011d29] focus:ring-0"
                  type="checkbox"
                  id="eight"
                  name="eight"
                  value="eight"
                  checked={formState.categoryArray.indexOf('eight') > -1}
                  onChange={(event) => handleCategoryArrayChange(event)}
                />
                <label htmlFor="eight" className="pl-2">
                  Åttondelsfinal
                </label>
              </div>
              <div className="mb-1 flex items-center">
                <input
                  className="border-[#011d29] text-[#011d29] focus:border-[#011d29] focus:ring-0"
                  type="checkbox"
                  id="regular"
                  name="regular"
                  value="regular"
                  checked={formState.categoryArray.indexOf('regular') > -1}
                  onChange={(event) => handleCategoryArrayChange(event)}
                />
                <label htmlFor="regular" className="pl-2">
                  Grundserie
                </label>
              </div>
              <div className="mb-1 flex items-center">
                <input
                  className="border-[#011d29] text-[#011d29] focus:border-[#011d29] focus:ring-0"
                  type="checkbox"
                  id="qualification"
                  name="qualification"
                  value="qualification"
                  checked={
                    formState.categoryArray.indexOf('qualification') > -1
                  }
                  onChange={(event) => handleCategoryArrayChange(event)}
                />
                <label htmlFor="qualification" className="pl-2">
                  Kval
                </label>
              </div>
            </fieldset>
            <div>
              {formState.teamArray.length > 0 && (
                <Select
                  placeholder={`Från ${startOptions[0].label}...`}
                  value={startOptions.find(
                    (season) => season.value === formState.startSeason,
                  )}
                  options={startOptions}
                  onChange={handleStartSeasonChange}
                  styles={selectStyles}
                  noOptionsMessage={() => 'Inga val'}
                />
              )}
              {formState.teamArray.length > 0 && (
                <Select
                  placeholder={`...till ${endOptions[0].label}.`}
                  value={endOptions.find(
                    (season) => season.value === formState.endSeason,
                  )}
                  options={endOptions}
                  onChange={handleEndSeasonChange}
                  styles={selectStyles}
                  noOptionsMessage={() => 'Inga val'}
                />
              )}
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default SearchSelection
