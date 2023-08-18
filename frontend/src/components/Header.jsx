import { Link } from 'react-router-dom'
import { useContext, useState } from 'react'
import { UserContext } from '../contexts/contexts'

const Header = () => {
  const { user } = useContext(UserContext)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  return (
    <header className="pt-6 z-10 font-poppins text-[#011d29]">
      <section className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-base font-bold uppercase pl-4 xl:pl-0 tracking-[0.2rem] md:text-2xl lg:text-4xl ">
          <Link to="/">Bandyresultat</Link>
        </h1>
        <div>
          <nav>
            <div className="lg:hidden">
              <div
                className="pr-4"
                onClick={() => setIsMenuOpen((current) => !current)}
              >
                <svg viewBox="0 0 24 24" width="24" height="24">
                  <rect width="24" height="4" rx="2" />
                  <rect y="8" width="24" height="4" rx="2" />
                  <rect y="16" width="24" height="4" rx="2" />
                </svg>
              </div>
              <div className={isMenuOpen ? 'showMenuNav' : 'hideMenuNav'}>
                <div
                  className="absolute top-0 right-0 px-3 py-4"
                  onClick={() => setIsMenuOpen(false)}
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
                <ul className="flex flex-col items-center justify-between min-h-[250px]">
                  <li
                    className="border-b border-gray-400 my-8 uppercase font-bold tracking-widest"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Link to="/seasons" className="hover:opacity-90">
                      Säsonger
                    </Link>
                  </li>
                  <li
                    className="border-b border-gray-400 my-8 uppercase font-bold tracking-widest"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Link to="/teams" className="hover:opacity-90">
                      Lag
                    </Link>
                  </li>
                  <li
                    className="border-b border-gray-400 my-8 uppercase font-bold tracking-widest"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Link to="/tables" className="hover:opacity-90">
                      Maratontabeller
                    </Link>
                  </li>
                  {user && (
                    <li
                      className="border-b border-gray-400 my-8 uppercase font-bold tracking-widest"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Link to="/dashboard" className="hover:opacity-90">
                        Dashboard
                      </Link>
                    </li>
                  )}
                  <li
                    className="border-b border-gray-400 my-8 uppercase font-bold tracking-widest"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Link to="/about" className="hover:opacity-90">
                      Om sidan
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="hidden lg:block lg: pr-2 xl:pr-0 space-x-8 text-xl font-bold">
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
            </div>
          </nav>
        </div>
      </section>
      <style>{`
      .hideMenuNav {
        display: none;
      }
      .showMenuNav {
        display: block;
        position: absolute;
        width: 100%;
        height: 100vh;
        top: 0;
        left: 0;
        background: #f4f5f5;
        z-index: 10;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
      }
    `}</style>
      <hr className="xl:w-[1280px] mx-auto h-px my-2 bg-[#011d29] border-0 dark:bg-gray-700" />
    </header>
  )
}

export default Header
