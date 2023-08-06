import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { UserContext } from '../contexts/contexts'

const Header = () => {
  const { user } = useContext(UserContext)
  return (
    <header className="py-6 z-10 font-poppins">
      <section className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-base font-bold uppercase pl-2 md:text-4xl md:tracking-[0.4rem] lg:text-4xl lg:tracking-[0.4rem]">
          <Link to="/">Bandyresultat</Link>
        </h1>
        <div>
          <nav
            className="hidden md:hidden lg:block space-x-8 text-xl font-bold"
            aria-label="main"
          >
            <Link to="/seasons" className="hover:opacity-90">
              Säsonger
            </Link>
            <Link to="/teams" className="hover:opacity-90">
              Lag
            </Link>
            <Link to="/tables" className="hover:opacity-90">
              Maratontabeller
            </Link>
            {user && (
              <Link to="/dashboard" className="hover:opacity-90">
                Dashboard
              </Link>
            )}
            <Link to="/about" className="hover:opacity-90">
              Om sidan
            </Link>
          </nav>
        </div>
      </section>
      <hr className="w-[1280px] mx-auto h-px my-2 bg-[#011d29] border-0 dark:bg-gray-700" />
    </header>
  )
}

export default Header
