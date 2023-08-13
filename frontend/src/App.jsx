import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'
import { useContext } from 'react'
import Home from './components/Home'
import Header from './components/Header'
import Footer from './components/Footer'

import Team from './components/Team/Team'
import Teams from './components/Team/Teams'
import Table from './components/Table/Table'
import Season from './components/Season/Season'
import Seasons from './components/Season/Seasons'
import Games from './components/Game/Games'
import Compare from './components/Compare/Compare'
import Dashboard from './components/Dashboard/Dashboard'
import About from './components/About/About'
import Link from './components/Link/Link'

import { UserContext } from './contexts/contexts'

const ProtectedRoute = ({ user, children }) => {
  if (!user) {
    return <Navigate to="/" replace />
  }

  return children
}

const App = () => {
  const { user } = useContext(UserContext)
  return (
    <Router>
      <div className="flex flex-col bg-[#f4f5f5] text-[#011d29] lg:min-h-screen">
        <Header />
        <main className="mb-4">
          <Routes>
            <Route path="/teams/:teamId" element={<Team />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/season/:seasonId" element={<Season />} />
            <Route path="/seasons" element={<Seasons />} />
            <Route path="/tables/:seasonId" element={<Table />} />
            <Route path="/tables" element={<Table />} />
            <Route path="/games/:seasonId" element={<Games />} />
            <Route path="/link/:linkName" element={<Link />} />
            <Route path="/compare" element={<Compare />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute user={user}>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
