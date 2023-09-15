import Select from 'react-select'
import { selectStyles } from '../utilitycomponents/selectStyles'

const SearchSelectionModal = ({
  setShowModal,
  formState,
  handleCategoryArrayChange,
  endOptions,
  startOptions,
  handleEndSeasonChange,
  handleStartSeasonChange,
  women,
  compareDispatch,
}) => {
  const setElitserien = () => {
    compareDispatch({
      type: 'INPUT START',
      payload: women ? 162 : 102,
    })
  }

  const setPlayoff = () => {
    compareDispatch({
      type: 'CLEAR CATEGORIES',
    })

    compareDispatch({
      type: 'ADD CATEGORY',
      payload: 'eight',
    })
    compareDispatch({
      type: 'ADD CATEGORY',
      payload: 'quarter',
    })
    compareDispatch({
      type: 'ADD CATEGORY',
      payload: 'semi',
    })
    compareDispatch({
      type: 'ADD CATEGORY',
      payload: 'final',
    })
  }

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none">
        <div className="fixed inset-2  mx-auto my-6 w-auto max-w-3xl overflow-y-auto">
          {/*content*/}
          <div className="relative flex w-full flex-col rounded-lg border-0 bg-white shadow-lg outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between rounded-t border-b border-solid border-slate-200 p-5">
              <h3 className="text-3xl font-semibold">Sökval</h3>
              <button
                className="float-right ml-auto border-0 bg-transparent p-1 font-inter text-3xl font-semibold leading-none text-[#011d29] outline-none focus:outline-none"
                onClick={() => setShowModal(false)}
              >
                <span className="block h-6 w-6 bg-transparent text-2xl text-black outline-none focus:outline-none">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    color="black"
                    fill="currentColor"
                    className="h-6 w-6"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              </button>
            </div>
            {/*body*/}
            <div className="w-[20rem] p-5 font-inter text-[#011d29]">
              <div className="flex flex-row items-center justify-start gap-2">
                <div
                  onClick={() => setElitserien()}
                  className="my-2 cursor-pointer select-none rounded-md bg-[#011d29] px-1 py-0.5 text-center text-[10px] text-white lg:px-2 lg:py-1 lg:text-sm"
                >
                  Förval Elitserien
                </div>
                <div
                  onClick={() => setPlayoff()}
                  className="my-2 cursor-pointer select-none rounded-md bg-[#011d29] px-1 py-0.5 text-center text-[10px] text-white lg:px-2 lg:py-1 lg:text-sm"
                >
                  Förval Slutspel
                </div>
              </div>
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
            </div>
            {/*footer*/}
            <div className="flex items-center justify-end rounded-b border-t border-solid border-slate-200 p-6">
              <button
                className="mb-1 mr-1 bg-slate-200 px-6 py-2 text-sm font-bold uppercase text-red-500 outline-none transition-all duration-150 ease-linear focus:outline-none"
                type="button"
                onClick={() => setShowModal(false)}
              >
                Stäng
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
    </>
  )
}

export default SearchSelectionModal
