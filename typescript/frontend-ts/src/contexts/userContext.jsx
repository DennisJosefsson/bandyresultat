import { useReducer } from 'react'
import { UserContext } from './contexts'

const userReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return (state = true)
    case 'LOGOUT':
      return (state = false)
    default:
      return state
  }
}

const UserContextProvider = ({ children }) => {
  const [user, dispatch] = useReducer(userReducer, false)

  return (
    <UserContext.Provider value={{ user, dispatch }}>
      {children}
    </UserContext.Provider>
  )
}

export default UserContextProvider
