import { NavLink, Outlet } from 'react-router-dom'

const links = [
  { to: '/', label: 'Dashboard', end: true },
  { to: '/data', label: 'Data Explorer' },
  { to: '/chart', label: 'Chart' },
  { to: '/option-chain', label: 'Option Chain' },
]

const Layout = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="border-b border-slate-800 bg-slate-900/60 backdrop-blur">
        <nav className="mx-auto flex max-w-7xl items-center gap-6 px-6 py-4">
          <span className="text-lg font-semibold tracking-tight text-cyan-400">
            NFO&nbsp;Data
          </span>
          <div className="flex gap-1">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.end}
                className={({ isActive }) =>
                  `rounded-lg px-3 py-1.5 text-sm font-medium transition ${
                    isActive
                      ? 'bg-cyan-500/15 text-cyan-300'
                      : 'text-slate-400 hover:text-slate-100'
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
          </div>
        </nav>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-8">
        <Outlet />
      </main>
    </div>
  )
}

export default Layout
