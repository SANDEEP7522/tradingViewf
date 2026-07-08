import { Routes, Route } from 'react-router-dom'
import Layout from '@/components/Layout'
import Dashboard from '@/pages/Dashboard'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        {/* saare routes ek hi single-page Dashboard render karte hain —
            URL badalta hai (route kaam karta hai) par page same rehta hai */}
        <Route path="/" element={<Dashboard />} />
        <Route path="/data" element={<Dashboard />} />
        <Route path="/chart" element={<Dashboard />} />
        <Route path="/option-chain" element={<Dashboard />} />
        <Route path="*" element={<Dashboard />} />
      </Route>
    </Routes>
  )
}

export default App
