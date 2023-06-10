import { useReducer } from 'react'
import { useQueryClient } from 'react-query'
import teamFormReducer from '../../reducers/teamFormReducer'

const initState = {
  city: '',
  name: '',
  women: false,
}

const TeamForm = ({ mutation, setShowModal }) => {
  const [formState, dispatch] = useReducer(teamFormReducer, initState)
  const queryClient = useQueryClient()

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log(formState)
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
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
              <h3 className="text-3xl font-semibold">Lägg till nytt lag</h3>
              <button
                className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={() => setShowModal(false)}
              >
                <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                  ×
                </span>
              </button>
            </div>
            {/*body*/}
            <div>
              <form onSubmit={handleSubmit} id="teamForm">
                <div className="flex flex-col w-[540px] flex-auto p-5 px-16">
                  <div className="p-1">
                    <label
                      htmlFor="name"
                      className="flex flex-row text-sm font-medium text-gray-900"
                    >
                      <div className="w-32">Lagnamn:</div>
                      <div>
                        <input
                          className="w-72 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300"
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
                      htmlFor="city"
                      className="flex flex-row text-sm font-medium text-gray-900"
                    >
                      <div className="w-32">Stad:</div>
                      <div>
                        <input
                          className="w-72 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300"
                          type="text"
                          name="city"
                          value={formState.city}
                          onChange={(event) => handleChange(event)}
                        />
                      </div>
                    </label>
                  </div>

                  <div className="p-1 m-1">
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
            <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
              <button
                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => setShowModal(false)}
              >
                Stäng
              </button>
              <input
                className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="submit"
                form="teamForm"
                value="Spara"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  )
}

export default TeamForm
