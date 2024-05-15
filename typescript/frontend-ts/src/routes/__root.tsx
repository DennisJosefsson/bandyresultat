import { createRootRouteWithContext, Outlet } from '@tanstack/react-router'
import Header from '../components/Header'
import { ScrollArea } from '../@/components/ui/scroll-area'
import { Toaster } from '../@/components/ui/toaster'
import { UserType } from '../contexts/contexts'

interface MyRouterContext {
  user: UserType
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: () => <App />,
})

function App() {
  return (
    <div className="flex flex-col bg-background text-foreground dark:bg-slate-950 lg:min-h-screen">
      <Header />
      <ScrollArea className="content-container px-2">
        <main className="mb-4">
          <Outlet />
          <Toaster />
        </main>
      </ScrollArea>
    </div>
  )
}
