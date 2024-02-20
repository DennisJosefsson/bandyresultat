import { useContext } from 'react'
import { MenuContext } from '../../contexts/contexts'

const useMenuContext = () => {
  const menuContext = useContext(MenuContext)

  if (!menuContext) throw new Error('Missing menu context')

  return menuContext
}

export default useMenuContext
