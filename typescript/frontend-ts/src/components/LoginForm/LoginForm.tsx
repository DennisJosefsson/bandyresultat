import { Dispatch, SetStateAction, SyntheticEvent } from 'react'

type ComponentProps = {
  userName: string
  password: string
  setUserName: Dispatch<SetStateAction<string>>
  setPassword: Dispatch<SetStateAction<string>>
  setShowModal: Dispatch<SetStateAction<boolean>>
  handleResponse: (event: SyntheticEvent) => Promise<void>
}

const LoginForm = ({
  userName,
  setUserName,
  password,
  setPassword,
  handleResponse,
  setShowModal,
}: ComponentProps) => {
  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none">
        <div className="relative mx-auto my-6 w-auto max-w-3xl">
          {/*content*/}
          <div className="relative flex w-full flex-col rounded-lg border-0 bg-background shadow-lg outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between rounded-t border-b border-solid border-slate-200 p-5">
              <h3 className="text-3xl font-semibold">Inloggning</h3>
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
              <form onSubmit={handleResponse} id="loginForm">
                <div className="flex w-[540px] flex-auto flex-col p-5 px-16">
                  <div className="p-1">
                    <label
                      htmlFor="userName"
                      className="flex flex-row text-sm font-medium text-gray-900"
                    >
                      <div className="w-32">Användarnamn:</div>
                      <div>
                        <input
                          className="w-72 rounded-lg border border-gray-300 bg-gray-50 text-sm text-gray-900"
                          type="text"
                          name="userName"
                          autoComplete="new-userName"
                          value={userName}
                          onChange={(event) => setUserName(event.target.value)}
                        />
                      </div>
                    </label>
                  </div>

                  <div className="flex-row">
                    <div className="p-1">
                      <label
                        htmlFor="password"
                        className="flex flex-row text-sm font-medium text-gray-900"
                      >
                        <div className="w-32">Lösenord:</div>
                        <div>
                          <input
                            className="w-72 rounded-lg border border-gray-300 bg-gray-50 text-sm text-gray-900"
                            type="password"
                            name="password"
                            autoComplete="new-password"
                            value={password}
                            onChange={(event) =>
                              setPassword(event.target.value)
                            }
                          />
                        </div>
                      </label>
                    </div>
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
                form="loginForm"
                value="Skicka"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
    </>
  )
}

export default LoginForm
