import { Routes, Route } from 'react-router-dom'
import Layout from '@/components/Layout'
import Placeholder from '@/components/Placeholder'
import Home from '@/pages/Home'
import DataExplorer from '@/pages/DataExplorer'
import ChartPage from '@/pages/ChartPage'
import OptionChainPage from '@/pages/OptionChainPage'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/data" element={<DataExplorer />} />
        <Route path="/chart" element={<ChartPage />} />
        <Route path="/option-chain" element={<OptionChainPage />} />
        <Route path="*" element={<Placeholder title="404 — Not Found" />} />
      </Route>
    </Routes>
  )
}

export default App
