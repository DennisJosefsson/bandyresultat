import { ButtonComponent } from '../../utilitycomponents/Components/ButtonComponents'
const FormStateComponent = ({
  valueError,
  setValueError,
  formState,
  unFilteredTeams,
  dispatch,
  setTab,
  tab,
}) => {
  let selectedTeamString = ''
  selectedTeamString += formState.teamArray.map(
    (teamId) =>
      ' ' + unFilteredTeams.find((team) => team.teamId === teamId).shortName,
  )

  return (
    <div className="flex w-full flex-row items-center justify-between py-2 text-xs lg:text-xl">
      <div className="flex flex-row">
        <div>
          {formState.teamArray.length < 5 && !valueError.error && (
            <h3 className="mr-1 font-bold">Valda lag:</h3>
          )}
        </div>
        {formState.teamArray.length < 5 && !valueError.error && (
          <div className="flex flex-row items-center justify-start gap-1 text-xs lg:text-xl">
            {selectedTeamString}
          </div>
        )}

        {formState.teamArray.length > 4 &&
          formState.categoryArray.length > 0 && (
            <div
              className="text-warning-800 mb-1 mr-2 rounded-lg bg-[#FED7AA] px-1 py-0.5 text-center text-xs font-bold lg:px-2  lg:py-1 lg:text-xl"
              role="alert"
            >
              Välj max 4 lag.
            </div>
          )}

        {valueError.error && (
          <div
            className="text-warning-800 mb-1 mr-2 flex flex-row items-center justify-between rounded-lg bg-[#FED7AA] px-1 py-0.5 text-center text-xs font-bold lg:px-2 lg:py-1 lg:text-xl"
            role="alert"
          >
            <div>{valueError.message}</div>
            <div>
              <button
                type="button"
                className="text-warning-900 hover:text-warning-900 ml-auto box-content rounded-none border-none p-1 opacity-50 hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
                data-te-alert-dismiss
                aria-label="Close"
                onClick={() => setValueError(false)}
              >
                <span className="w-[1em] focus:opacity-100 disabled:pointer-events-none disabled:select-none disabled:opacity-25 [&.disabled]:pointer-events-none [&.disabled]:select-none [&.disabled]:opacity-25">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
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
          </div>
        )}
      </div>
      <ButtonComponent
        clickFunctions={() => {
          dispatch({ type: 'RESET' })
          tab === 'selection' && setTab('teams')
        }}
      >
        Nollställ val
      </ButtonComponent>
    </div>
  )
}

export default FormStateComponent
