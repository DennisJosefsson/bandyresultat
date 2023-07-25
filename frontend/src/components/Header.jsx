import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header className="py-6 z-10 font-poppins">
      <section className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-4xl font-bold tracking-[0.4rem] uppercase">
          Bandyresultat
        </h1>
        <div>
          <button
            id="mobile-open-button"
            className="text-3xl sm:hidden focus:outline-none"
          >
            &#9776;
          </button>
          <nav
            className="hidden sm:block space-x-8 text-xl font-bold"
            aria-label="main"
          >
            <Link to="/" className="hover:opacity-90">
              Hem
            </Link>
            <Link to="/seasons" className="hover:opacity-90">
              Säsonger
            </Link>
            <Link to="/teams" className="hover:opacity-90">
              Lag
            </Link>
            <Link to="/tables" className="hover:opacity-90">
              Maratontabeller
            </Link>
          </nav>
        </div>
      </section>
      <hr className="w-[1280px] mx-auto h-px my-2 bg-[#011d29] border-0 dark:bg-gray-700" />
    </header>
  )
}

export default Header
