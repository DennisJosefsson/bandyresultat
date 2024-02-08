import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { MenuContext, UserContext } from '../contexts/contexts'
import useScrollDirection from './utilitycomponents/functions/useScrollDirection'

const Header = () => {
  const { user } = useContext(UserContext)
  const { open, dispatch } = useContext(MenuContext)
  const scrollDirection = useScrollDirection()

  return (
    <header
      className={`sticky ${
        scrollDirection === 'down' ? '-top-[81px]' : 'top-0'
      } z-10000 font-poppins h-[81px] bg-[#f4f5f5] pt-6 text-[#011d29] transition-all duration-500`}
    >
      <section className="mx-auto flex max-w-7xl items-center justify-between">
        <h1 className="pl-4 text-base font-bold uppercase tracking-[0.2rem] md:text-2xl lg:text-4xl xl:pl-0 ">
          <Link to="/">Bandyresultat</Link>
        </h1>
        <div>
          <nav>
            <div className="lg:hidden">
              <div
                className="cursor-pointer pr-4"
                onClick={() => dispatch({ type: 'TOGGLE' })}
              >
                <svg viewBox="0 0 24 24" width="24" height="24">
                  <rect width="24" height="4" rx="2" />
                  <rect y="8" width="24" height="4" rx="2" />
                  <rect y="16" width="24" height="4" rx="2" />
                </svg>
              </div>
              <div className={open ? 'showMenuNav' : 'hideMenuNav'}>
                <div
                  className="absolute right-0 top-0 cursor-pointer px-3 py-4"
                  onClick={() => dispatch({ type: 'CLOSE' })}
                >
                  <svg
                    className="h-8 w-8 text-[#011d29]"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </div>
                <ul className="header flex min-h-[250px] flex-col items-center justify-between">
                  <li onClick={() => dispatch({ type: 'CLOSE' })}>
                    <Link to="/seasons" className="hover:opacity-90">
                      Säsonger
                    </Link>
                  </li>
                  <li onClick={() => dispatch({ type: 'CLOSE' })}>
                    <Link to="/teams" className="hover:opacity-90">
                      Lag
                    </Link>
                  </li>
                  <li onClick={() => dispatch({ type: 'CLOSE' })}>
                    <Link to="/search" className="hover:opacity-90">
                      Sök
                    </Link>
                  </li>
                  <li onClick={() => dispatch({ type: 'CLOSE' })}>
                    <Link to="/tables" className="hover:opacity-90">
                      Maratontabeller
                    </Link>
                  </li>
                  {user && (
                    <li onClick={() => dispatch({ type: 'CLOSE' })}>
                      <Link to="/dashboard" className="hover:opacity-90">
                        Dashboard
                      </Link>
                    </li>
                  )}
                  <li onClick={() => dispatch({ type: 'CLOSE' })}>
                    <Link to="/about" className="hover:opacity-90">
                      Om sidan
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="lg: hidden space-x-8 pr-2 text-xl font-bold lg:block xl:pr-0">
              <Link to="/seasons" className="hover:opacity-90">
                Säsonger
              </Link>
              <Link to="/teams" className="hover:opacity-90">
                Lag
              </Link>
              <Link to="/search" className="hover:opacity-90">
                Sök
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
            </div>
          </nav>
        </div>
      </section>

      <hr className="mx-auto my-2 h-px border-0 bg-[#011d29] xl:w-[1280px] dark:bg-gray-700" />
    </header>
  )
}

export default Header
