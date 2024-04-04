import { getLogin, logout } from '../requests/login'
import { SyntheticEvent, useState } from 'react'
import { Button } from '../@/components/ui/button'
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
    <footer className="mt-auto h-[10rem] bg-background font-inter text-foreground">
      <div className="mx-auto flex max-w-7xl flex-row justify-end">
        <div className="pt-2">
          {!user ? (
            <Button onClick={() => setShowLoginModal(true)}>Logga in</Button>
          ) : (
            <Button onClick={() => loggaUt()}>Logga ut</Button>
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
