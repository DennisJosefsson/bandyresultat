import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'

import Home from './components/Home'
import Header from './components/Header'
import Footer from './components/Footer'

import Teams from './components/Team/Teams'
import Season from './components/Season/Season'
import Seasons from './components/Season/Seasons'

import Dashboard from './components/Dashboard/Dashboard'
import About from './components/About/About'
import Link from './components/Link/Link'
import Search from './components/Search/Search'

import Maraton from './components/Maraton/Maraton'
import useUserContext from './hooks/contextHooks/useUserContext'
import { ReactNode } from 'react'

const ProtectedRoute = ({
  user,
  children,
}: {
  user: boolean
  children: ReactNode
}) => {
  if (!user) {
    return <Navigate to="/" replace />
  }

  return children
}

const App = () => {
  const { user } = useUserContext()
  return (
    <Router>
      <div className="flex flex-col bg-muted/65 text-foreground lg:min-h-screen">
        <Header />
        <main className="mb-4">
          <Routes>
            <Route path="/teams/:teamId" element={<Teams />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/season/:seasonId" element={<Season />} />
            <Route path="/seasons" element={<Seasons />} />
            <Route path="/tables" element={<Maraton />} />
            <Route path="/link/:linkName" element={<Link />} />

            <Route path="/search" element={<Search />} />
            <Route path="/search/:linkName" element={<Search />} />
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