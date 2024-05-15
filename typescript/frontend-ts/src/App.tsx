import { RouterProvider, createRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'
import useUserContext from './hooks/contextHooks/useUserContext'

const router = createRouter({ routeTree, context: { user: false } })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

function InnerApp() {
  const { user } = useUserContext()
  return <RouterProvider router={router} context={{ user }} />
}

function App() {
  return <InnerApp />
}

export default App
