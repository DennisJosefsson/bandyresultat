import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Home from './components/Home'
import Header from './components/Header'

import Team from './components/Team/Team'
import Teams from './components/Team/Teams'
import Table from './components/Table/Table'
import Season from './components/Season/Season'
import Seasons from './components/Season/Seasons'
import MetadataForm from './components/Metadata/MetadataForm2'

const App = () => {
  return (
    <Router>
      <div className="min-h-screen radial-blue">
        <Header />
        <main className="max-w-4xl mx-auto bg-slate-50 rounded-xl">
          <section className="flex flex-col-reverse justify-center sm:flex-row p-6 items-center gap-8 mb-12 mt-6 scroll-mt-40">
            <Routes>
              <Route path="/teams/:teamId" element={<Team />} />
              <Route path="/teams" element={<Teams />} />
              <Route path="/season/:seasonId" element={<Season />} />
              <Route path="/seasons" element={<Seasons />} />
              <Route path="/tables/:seasonId" element={<Table />} />
              <Route path="/tables" element={<Table />} />
              <Route path="/metadataform" element={<MetadataForm />} />
              <Route path="*" element={<Home />} />
            </Routes>
          </section>
        </main>
      </div>
    </Router>
  )
}

export default App
