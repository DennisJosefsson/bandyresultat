import { getLogin, logout } from '../requests/login'
import { useContext, useState } from 'react'
import { UserContext } from '../contexts/contexts'
import LoginForm from './LoginForm/LoginForm'

const Footer = () => {
  const { user, dispatch } = useContext(UserContext)
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [showLoginModal, setShowLoginModal] = useState(false)

  const handleResponse = async (event) => {
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
    <footer className="bg-[#93B8C1] mt-auto h-[10rem] font-inter text-[#011d29]">
      <div className="max-w-7xl mx-auto flex flex-row justify-end">
        <div className="pt-2">
          {!user ? (
            <div
              onClick={() => setShowLoginModal(true)}
              className="w-[84px] lg:w-[128px] cursor-pointer rounded-md px-1 py-0.5 lg:px-2 lg:py-1 bg-[#011d29] text-sm lg:text-lg text-white text-center mb-4 lg:mb-6 mr-2 xl:mr-0"
            >
              Logga in
            </div>
          ) : (
            <div
              onClick={() => loggaUt()}
              className="w-[84px] lg:w-[128px] cursor-pointer rounded-md px-1 py-0.5 lg:px-2 lg:py-1 bg-[#011d29] text-sm lg:text-lg text-white text-center mb-4 lg:mb-6 mr-2 xl:mr-0"
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
