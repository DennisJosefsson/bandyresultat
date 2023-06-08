import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header className="bg-sky-400 text-white sticky top-0 z-10">
      <section className="max-w-4xl mx-auto p-4 flex justify-between items-center">
        <h1 className="text-3xl font-medium">Bandyresultat</h1>
        <div>
          <button
            id="mobile-open-button"
            className="text-3xl sm:hidden focus:outline-none"
          >
            &#9776;
          </button>
          <nav className="hidden sm:block space-x-8 text-xl" aria-label="main">
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
              Tabeller
            </Link>
            <Link to="/metadataform" className="hover:opacity-90">
              Metadataformulär
            </Link>
          </nav>
        </div>
      </section>
    </header>
  )
}

export default Header
