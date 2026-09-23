import { Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing.jsx'
import Apply from './pages/Apply.jsx'
import Reveal from './pages/Reveal.jsx'
import Dashboard from './pages/Dashboard.jsx'

export default function App() {
  return (
    <Routes>
      {/* The "convincing" pages a target would see */}
      <Route path="/" element={<Landing />} />
      <Route path="/apply" element={<Apply />} />

      {/* The educational payload: shown right after they submit */}
      <Route path="/reveal" element={<Reveal />} />

      {/* Instructor view: who got caught */}
      <Route path="/dashboard" element={<Dashboard />} />

      {/* Anything else falls back to the landing page */}
      <Route path="*" element={<Landing />} />
    </Routes>

    
    
  )
}
