import { ReactNode, useReducer } from 'react'
import { MenuContext, MenuActionType, MenuType } from './contexts'

const menuReducer = (state: MenuType, action: MenuActionType) => {
  switch (action.type) {
    case 'TOGGLE':
      return !state
    case 'CLOSE':
      return (state = false)
    default:
      return state
  }
}

const MenuContextProvider = ({ children }: { children: ReactNode }) => {
  const [open, dispatch] = useReducer(menuReducer, false)

  return (
    <MenuContext.Provider value={{ open, dispatch }}>
      {children}
    </MenuContext.Provider>
  )
}

export default MenuContextProvider
