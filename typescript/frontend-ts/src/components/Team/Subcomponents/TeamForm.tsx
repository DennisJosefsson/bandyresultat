import { SyntheticEvent, ChangeEvent, useReducer } from 'react'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import teamFormReducer from '../../../reducers/teamFormReducer'
import { postTeam } from '../../../requests/teams'

const initState = {
  city: '',
  name: '',
  casualName: '',
  shortName: '',
  lat: 0,
  long: 0,
  women: false,
}

const TeamForm = () => {
  const mutation = useMutation({ mutationFn: postTeam })
  const [formState, dispatch] = useReducer(teamFormReducer, initState)
  const queryClient = useQueryClient()

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault()

    mutation.mutate({ formState })
    queryClient.invalidateQueries({ queryKey: ['teams'] })
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: 'INPUT',
      field: event.target.name,
      payload: event.target.value,
    })
  }

  return (
    <>
      <div>
        {/*header*/}
        <div className="flex items-start justify-between rounded-t border-b border-solid border-slate-200 p-5">
          <h3 className="text-lg font-semibold">Lägg till nytt lag</h3>
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
              <div className="p-1">
                <label
                  htmlFor="lat"
                  className="flex flex-row text-sm font-medium text-gray-900"
                >
                  <div className="w-32">Latitud:</div>
                  <div>
                    <input
                      className="w-72 rounded-lg border border-gray-300 bg-gray-50 text-sm text-gray-900"
                      type="text"
                      name="lat"
                      value={formState.lat}
                      onChange={(event) => handleChange(event)}
                    />
                  </div>
                </label>
              </div>
              <div className="p-1">
                <label
                  htmlFor="long"
                  className="flex flex-row text-sm font-medium text-gray-900"
                >
                  <div className="w-32">Longitud:</div>
                  <div>
                    <input
                      className="w-72 rounded-lg border border-gray-300 bg-gray-50 text-sm text-gray-900"
                      type="text"
                      name="long"
                      value={formState.long}
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
          <input
            className="mb-1 mr-1 rounded bg-emerald-500 px-6 py-3 text-sm font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none active:bg-emerald-600"
            type="submit"
            form="teamForm"
            value="Spara"
          />
        </div>
      </div>
    </>
  )
}

export default TeamForm
