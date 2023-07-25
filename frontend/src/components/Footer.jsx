import { GoogleLogin } from '@react-oauth/google'
import { getLogin } from '../requests/login'
import { useContext } from 'react'
import { UserContext } from '../contexts/contexts'

const Footer = () => {
  const { user, dispatch } = useContext(UserContext)
  const handleResponse = async ({ clientId, credential }) => {
    const response = await getLogin(clientId, credential)
    if (response.success && user === false) {
      dispatch({ type: 'LOGIN' })
    } else if (user === true) {
      window.alert('Redan inloggad.')
    } else {
      window.alert('Du får inte logga in.')
    }
  }

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' })
  }

  return (
    <footer className="bg-[#93B8C1] h-[12rem] mt-16">
      {user ? (
        <div
          onClick={() => handleLogout()}
          className="cursor-pointer rounded-md px-2 py-1 bg-[#011d29] text-white text-center w-32 mt-4 ml-2"
        >
          Logga ut
        </div>
      ) : (
        <div className="w-48 mt-4 ml-2">
          <GoogleLogin
            onSuccess={(credentialResponse) =>
              handleResponse(credentialResponse)
            }
            onError={() => {
              console.log('Login Failed')
            }}
            theme="filled_black"
          />
        </div>
      )}
    </footer>
  )
}

export default Footer
