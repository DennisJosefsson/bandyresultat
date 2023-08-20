import Select from 'react-select'

const selectStyles = {
  option: (defaultStyles, state) => ({
    ...defaultStyles,
    color: state.isSelected ? '#fff' : '#011d29',
    backgroundColor: state.isSelected ? '#011d29' : '#fff',
  }),
  control: (defaultStyles) => ({
    ...defaultStyles,
    backgroundColor: '#fff',
    color: '#011d29',
    padding: '2px',
    border: 'solid 1px',
    borderColor: '#011d29',
    borderRadius: 'none',
    boxShadow: 'none',
    width: '16rem',
    outline: 'none',
  }),
  singleValue: (defaultStyles) => ({ ...defaultStyles, color: '#011d29' }),
  placeholder: (defaultStyles) => ({ ...defaultStyles, color: '#011d29' }),
  indicatorSeparator: (defaultStyles) => ({
    ...defaultStyles,
    color: '#011d29',
  }),
  dropdownIndicator: (defaultStyles) => ({
    ...defaultStyles,
    color: '#011d29',
  }),
  input: (defaultStyles) => ({
    ...defaultStyles,
    'input:focus': {
      boxShadow: 'none',
      borderColor: '#011d29',
    },
  }),
  container: (defaultStyles) => ({ ...defaultStyles, marginBottom: '6px' }),
}

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
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="fixed inset-2  w-auto my-6 mx-auto max-w-3xl overflow-y-auto">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
              <h3 className="text-3xl font-semibold">Sökval</h3>
              <button
                className="p-1 ml-auto bg-transparent border-0 font-inter text-[#011d29] float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={() => setShowModal(false)}
              >
                <span className="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
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
            <div className="w-[20rem] font-inter text-[#011d29] p-5">
              <div className="flex flex-row gap-2 justify-start items-center">
                <div
                  onClick={() => setElitserien()}
                  className="cursor-pointer rounded-md px-1 py-0.5 lg:px-2 lg:py-1 bg-[#011d29] text-[10px] lg:text-sm text-white text-center my-2 select-none"
                >
                  Förval Elitserien
                </div>
                <div
                  onClick={() => setPlayoff()}
                  className="cursor-pointer rounded-md px-1 py-0.5 lg:px-2 lg:py-1 bg-[#011d29] text-[10px] lg:text-sm text-white text-center my-2 select-none"
                >
                  Förval Slutspel
                </div>
              </div>
              <div className="text-left">
                <fieldset className="mb-2 flex flex-col self-start">
                  <legend className="font-bold underline underline-offset-2 mb-2">
                    Matchkategorier
                  </legend>
                  <div className="mb-1 flex items-center">
                    <input
                      className="border-[#011d29] focus:border-[#011d29] text-[#011d29] focus:ring-0 content-center"
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
                      className="border-[#011d29] focus:border-[#011d29] text-[#011d29] focus:ring-0"
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
                      className="border-[#011d29] focus:border-[#011d29] text-[#011d29] focus:ring-0"
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
                      className="border-[#011d29] focus:border-[#011d29] text-[#011d29] focus:ring-0"
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
                      className="border-[#011d29] focus:border-[#011d29] text-[#011d29] focus:ring-0"
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
                      className="border-[#011d29] focus:border-[#011d29] text-[#011d29] focus:ring-0"
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
                        (season) => season.value === formState.startSeason
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
                        (season) => season.value === formState.endSeason
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
            <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
              <button
                className="text-red-500 bg-slate-200 font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => setShowModal(false)}
              >
                Stäng
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  )
}

export default SearchSelectionModal
