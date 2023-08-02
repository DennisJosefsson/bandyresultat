import { useGoogleLogin } from '@react-oauth/google'
import { getLogin } from '../requests/login'
import { useContext } from 'react'
import { UserContext } from '../contexts/contexts'

const Footer = () => {
  const { user, dispatch } = useContext(UserContext)
  const login = useGoogleLogin({
    onSuccess: (codeResponse) => handleResponse(codeResponse),
  })

  const handleResponse = async ({ access_token }) => {
    const response = await getLogin(access_token)
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
    <footer className="bg-[#93B8C1] h-[12rem] mt-16 flex justify-end font-inter text-[#011d29]">
      <div>
        {user ? (
          <div
            onClick={() => handleLogout()}
            className="cursor-pointer rounded-md px-2 py-1 bg-[#011d29] text-white text-center w-32 h-8 mt-4 mr-2"
          >
            Logga ut
          </div>
        ) : (
          <div
            onClick={() => login()}
            className="cursor-pointer rounded-md px-2 py-1 bg-[#011d29] text-white text-center w-32 h-8 mt-4 mr-2"
          >
            Logga in
          </div>
        )}
      </div>
    </footer>
  )
}

export default Footer
