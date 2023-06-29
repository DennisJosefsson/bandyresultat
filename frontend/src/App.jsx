import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Home from './components/Home'
import Header from './components/Header'
import Footer from './components/Footer'

import Team from './components/Team/Team'
import Teams from './components/Team/Teams'
import Table from './components/Table/Table'
import Season from './components/Season/Season'
import Seasons from './components/Season/Seasons'
import Games from './components/Game/Games'

const App = () => {
  return (
    <Router>
      <div className="bg-[#dceff5] text-[#011d29]">
        <Header />
        <main>
          <Routes>
            <Route path="/teams/:teamId" element={<Team />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/season/:seasonId" element={<Season />} />
            <Route path="/seasons" element={<Seasons />} />
            <Route path="/tables/:seasonId" element={<Table />} />
            <Route path="/tables" element={<Table />} />
            <Route path="/games/:seasonId" element={<Games />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
