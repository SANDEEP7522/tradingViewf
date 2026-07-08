import { Routes, Route } from 'react-router-dom'
import Layout from '@/components/Layout'
import Placeholder from '@/components/Placeholder'
import Home from '@/pages/Home'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/data" element={<Placeholder title="Data Explorer" />} />
        <Route path="/chart" element={<Placeholder title="Chart" />} />
        <Route path="/option-chain" element={<Placeholder title="Option Chain" />} />
        <Route path="*" element={<Placeholder title="404 — Not Found" />} />
      </Route>
    </Routes>
  )
}

export default App
