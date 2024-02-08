import { useReducer } from 'react'
import { MenuContext } from './contexts'

const menuReducer = (state, action) => {
  switch (action.type) {
    case 'TOGGLE':
      return !state
    case 'CLOSE':
      return (state = false)
    default:
      return state
  }
}

const MenuContextProvider = ({ children }) => {
  const [open, dispatch] = useReducer(menuReducer, false)

  return (
    <MenuContext.Provider value={{ open, dispatch }}>
      {children}
    </MenuContext.Provider>
  )
}

export default MenuContextProvider
