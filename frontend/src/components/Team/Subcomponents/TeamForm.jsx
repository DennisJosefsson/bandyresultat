import { useReducer } from 'react'
import { useQueryClient } from 'react-query'
import teamFormReducer from '../../../reducers/teamFormReducer'

const initState = {
  city: '',
  name: '',
  casualName: '',
  shortName: '',
  women: false,
}

const TeamForm = ({ mutation, setShowModal }) => {
  const [formState, dispatch] = useReducer(teamFormReducer, initState)
  const queryClient = useQueryClient()

  const handleSubmit = (event) => {
    event.preventDefault()

    mutation.mutate({ formState })
    queryClient.invalidateQueries({ queryKey: ['teams'] })
    setShowModal(false)
  }

  const handleChange = (event) => {
    dispatch({
      type: 'INPUT',
      field: event.target.name,
      payload: event.target.value,
    })
  }

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none">
        <div className="relative mx-auto my-6 w-auto max-w-3xl">
          {/*content*/}
          <div className="relative flex w-full flex-col rounded-lg border-0 bg-white shadow-lg outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between rounded-t border-b border-solid border-slate-200 p-5">
              <h3 className="text-3xl font-semibold">Lägg till nytt lag</h3>
              <button
                className="float-right ml-auto border-0 bg-transparent p-1 text-3xl font-semibold leading-none text-black opacity-5 outline-none focus:outline-none"
                onClick={() => setShowModal(false)}
              >
                <span className="block h-6 w-6 bg-transparent text-2xl text-black opacity-5 outline-none focus:outline-none">
                  ×
                </span>
              </button>
            </div>
            {/*body*/}
            <div>
              <form onSubmit={handleSubmit} id="teamForm">
                <div className="flex w-[540px] flex-auto flex-col p-5 px-16">
                  <div className="p-1">
                    <label
                      htmlFor="name"
                      className="flex flex-row text-sm font-medium text-gray-900"
                    >
                      <div className="w-32">Lagnamn:</div>
                      <div>
                        <input
                          className="w-72 rounded-lg border border-gray-300 bg-gray-50 text-sm text-gray-900"
                          type="text"
                          name="name"
                          value={formState.name}
                          onChange={(event) => handleChange(event)}
                        />
                      </div>
                    </label>
                  </div>
                  <div className="p-1">
                    <label
                      htmlFor="casualName"
                      className="flex flex-row text-sm font-medium text-gray-900"
                    >
                      <div className="w-32">Vanligt namn:</div>
                      <div>
                        <input
                          className="w-72 rounded-lg border border-gray-300 bg-gray-50 text-sm text-gray-900"
                          type="text"
                          name="casualName"
                          value={formState.casualName}
                          onChange={(event) => handleChange(event)}
                        />
                      </div>
                    </label>
                  </div>
                  <div className="p-1">
                    <label
                      htmlFor="shortName"
                      className="flex flex-row text-sm font-medium text-gray-900"
                    >
                      <div className="w-32">Förkortning:</div>
                      <div>
                        <input
                          className="w-72 rounded-lg border border-gray-300 bg-gray-50 text-sm text-gray-900"
                          type="text"
                          name="shortName"
                          value={formState.shortName}
                          onChange={(event) => handleChange(event)}
                        />
                      </div>
                    </label>
                  </div>
                  <div className="p-1">
                    <label
                      htmlFor="city"
                      className="flex flex-row text-sm font-medium text-gray-900"
                    >
                      <div className="w-32">Stad:</div>
                      <div>
                        <input
                          className="w-72 rounded-lg border border-gray-300 bg-gray-50 text-sm text-gray-900"
                          type="text"
                          name="city"
                          value={formState.city}
                          onChange={(event) => handleChange(event)}
                        />
                      </div>
                    </label>
                  </div>

                  <div className="m-1 p-1">
                    <label
                      htmlFor="women"
                      className="flex flex-row  space-x-2 text-sm font-medium text-gray-900 "
                    >
                      <div>Damlag?</div>
                      <div>
                        <input
                          className="text-gray-900 focus:ring-gray-500"
                          type="checkbox"
                          name="women"
                          value={formState.women}
                          checked={formState.women}
                          onChange={() => dispatch({ type: 'TOGGLE' })}
                        />
                      </div>
                    </label>
                  </div>
                </div>
              </form>
            </div>
            {/*footer*/}
            <div className="flex items-center justify-end rounded-b border-t border-solid border-slate-200 p-6">
              <button
                className="background-transparent mb-1 mr-1 px-6 py-2 text-sm font-bold uppercase text-red-500 outline-none transition-all duration-150 ease-linear focus:outline-none"
                type="button"
                onClick={() => setShowModal(false)}
              >
                Stäng
              </button>
              <input
                className="mb-1 mr-1 rounded bg-emerald-500 px-6 py-3 text-sm font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none active:bg-emerald-600"
                type="submit"
                form="teamForm"
                value="Spara"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
    </>
  )
}

export default TeamForm
