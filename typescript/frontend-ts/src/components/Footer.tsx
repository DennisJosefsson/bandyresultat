import { getLogin, logout } from '../requests/login'
import { SyntheticEvent, useState } from 'react'

import LoginForm from './LoginForm/LoginForm'
import useUserContext from '../hooks/contextHooks/useUserContext'

const Footer = () => {
  const { user, dispatch } = useUserContext()
  const [userName, setUserName] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false)

  const handleResponse = async (event: SyntheticEvent) => {
    event.preventDefault()
    setShowLoginModal(false)
    const response = await getLogin(userName, password)
    if (response.success && user === false) {
      dispatch({ type: 'LOGIN' })
      window.alert('Inloggad.')
    } else if (user === true) {
      window.alert('Redan inloggad.')
    } else {
      window.alert('Du får inte logga in.')
    }
  }

  const loggaUt = async () => {
    const response = await logout()
    if (response.success) {
      dispatch({ type: 'LOGOUT' })
      window.alert('Utloggad.')
    } else {
      window.alert('Något gick fel.')
    }
  }

  return (
    <footer className="mt-auto h-[10rem] bg-[#93B8C1] font-inter text-[#011d29]">
      <div className="mx-auto flex max-w-7xl flex-row justify-end">
        <div className="pt-2">
          {!user ? (
            <div
              onClick={() => setShowLoginModal(true)}
              className="mb-4 mr-2 w-[84px] cursor-pointer rounded-md bg-[#011d29] px-1 py-0.5 text-center text-sm text-white lg:mb-6 lg:w-[128px] lg:px-2 lg:py-1 lg:text-lg xl:mr-0"
            >
              Logga in
            </div>
          ) : (
            <div
              onClick={() => loggaUt()}
              className="mb-4 mr-2 w-[84px] cursor-pointer rounded-md bg-[#011d29] px-1 py-0.5 text-center text-sm text-white lg:mb-6 lg:w-[128px] lg:px-2 lg:py-1 lg:text-lg xl:mr-0"
            >
              Logga ut
            </div>
          )}
        </div>
      </div>
      {showLoginModal ? (
        <>
          <LoginForm
            userName={userName}
            setUserName={setUserName}
            password={password}
            setPassword={setPassword}
            setShowModal={setShowLoginModal}
            handleResponse={handleResponse}
          />
        </>
      ) : null}
    </footer>
  )
}

export default Footer
