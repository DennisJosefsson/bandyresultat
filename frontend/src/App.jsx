import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Team from './components/Team/Team'
import Teams from './components/Team/Teams'
import Table from './components/Table'
import Season from './components/Season/Season'
import Seasons from './components/Season/Seasons'
import Home from './components/Home'

const App = () => {
  return (
    <Router>
      <div>
        <Link to="/">home</Link>
        <Link to="/seasons">seasons</Link>
        <Link to="/teams">teams</Link>
        <Link to="/tables">tables</Link>
      </div>

      <Routes>
        <Route path="/teams/:teamId" element={<Team />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/seasons/:seasonId" element={<Season />} />
        <Route path="/seasons" element={<Seasons />} />
        <Route path="/tables/:tableId" element={<Table />} />
        <Route path="/" element={<Home />} />
      </Routes>

      <div>
        <i>Bandyresultat</i>
      </div>
    </Router>
  )
}

export default App
