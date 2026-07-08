import type { ReactNode } from 'react'
import Home from './Home'
import DataExplorer from './DataExplorer'
import ChartPage from './ChartPage'
import OptionChainPage from './OptionChainPage'

// scroll-mt-20 → sticky header ke neeche na chhupe
const Section = ({ id, children }: { id: string; children: ReactNode }) => (
  <section id={id} className="scroll-mt-24">
    {children}
  </section>
)

const Dashboard = () => (
  <div className="space-y-16">
    <Section id="dashboard">
      <Home />
    </Section>
    <Section id="data">
      <DataExplorer />
    </Section>
    <Section id="chart">
      <ChartPage />
    </Section>
    <Section id="option-chain">
      <OptionChainPage />
    </Section>
  </div>
)

export default Dashboard
