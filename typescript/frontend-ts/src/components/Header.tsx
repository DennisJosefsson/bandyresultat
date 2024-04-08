import { Link } from 'react-router-dom'
import { Sheet, SheetTrigger, SheetContent } from '../@/components/ui/sheet'
import { Button } from '../@/components/ui/button'
import { Menu } from 'lucide-react'
import ModeToggle from './utilitycomponents/Components/ModeToggle'
import useUserContext from '../hooks/contextHooks/useUserContext'
import useMenuContext from '../hooks/contextHooks/useMenuContext'

const Header = () => {
  const { user } = useUserContext()
  const { open, dispatch } = useMenuContext()

  return (
    <header className="sticky top-0 z-[10000] mb-4 flex h-16 flex-row items-center justify-between gap-4 border-b bg-background px-2 font-poppins text-foreground md:px-6">
      <div className="flex flex-row gap-8">
        <h1 className="text-base font-bold uppercase tracking-[0.2rem] md:text-2xl lg:text-4xl xl:pl-0 ">
          <Link to="/">Bandyresultat</Link>
        </h1>
        <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <Link
            to="/seasons"
            className="text-foreground transition-colors hover:text-foreground"
          >
            Säsonger
          </Link>
          <Link
            to="/teams"
            className="text-foreground transition-colors hover:text-foreground"
          >
            Lag
          </Link>
          <Link
            to="/search"
            className="text-foreground transition-colors hover:text-foreground"
          >
            Sök
          </Link>
          <Link
            to="/tables?tab=maraton&table=all"
            className="text-foreground transition-colors hover:text-foreground"
          >
            Maratontabeller
          </Link>
          {user && (
            <Link
              to="/dashboard"
              className="text-foreground transition-colors hover:text-foreground"
            >
              Dashboard
            </Link>
          )}
          <Link
            to="/about"
            className="text-foreground transition-colors hover:text-foreground"
          >
            Om sidan
          </Link>
        </nav>
      </div>
      <div className="flex flex-row gap-2">
        <Sheet open={open} onOpenChange={() => dispatch({ type: 'TOGGLE' })}>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Öppnar och stänger menyn.</span>
            </Button>
          </SheetTrigger>
          <SheetContent>
            <nav className="grid gap-6 text-lg font-medium">
              <Link
                to="/"
                className="hover:text-foreground"
                onClick={() => dispatch({ type: 'TOGGLE' })}
              >
                Hem
              </Link>

              <Link
                to="/seasons"
                className="hover:text-foreground"
                onClick={() => dispatch({ type: 'TOGGLE' })}
              >
                Säsonger
              </Link>
              <Link
                to="/teams"
                className="hover:text-foreground"
                onClick={() => dispatch({ type: 'TOGGLE' })}
              >
                Lag
              </Link>
              <Link
                to="/search"
                className="hover:text-foreground"
                onClick={() => dispatch({ type: 'TOGGLE' })}
              >
                Sök
              </Link>
              <Link
                to="/tables?tab=maraton&table=all"
                className="hover:text-foreground"
                onClick={() => dispatch({ type: 'TOGGLE' })}
              >
                Maratontabeller
              </Link>
              {user && (
                <Link
                  to="/dashboard"
                  className="hover:text-foreground"
                  onClick={() => dispatch({ type: 'TOGGLE' })}
                >
                  Dashboard
                </Link>
              )}
              <Link
                to="/about"
                className="hover:text-foreground"
                onClick={() => dispatch({ type: 'TOGGLE' })}
              >
                Om sidan
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
        <div>
          <ModeToggle />
        </div>
      </div>
      {/* <hr className="mx-auto my-2 h-px border-0 bg-[#011d29] dark:bg-gray-700 xl:w-[1280px]" /> */}
    </header>
  )
}

export default Header
