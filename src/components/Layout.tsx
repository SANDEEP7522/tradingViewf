import { useEffect, useRef } from 'react'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'

const links = [
  { id: 'dashboard', path: '/', label: 'Dashboard' },
  { id: 'data', path: '/data', label: 'Data Explorer' },
  { id: 'chart', path: '/chart', label: 'Chart' },
  { id: 'option-chain', path: '/option-chain', label: 'Option Chain' },
]

const pathToId: Record<string, string> = Object.fromEntries(
  links.map((l) => [l.path, l.id]),
)
const idToPath: Record<string, string> = Object.fromEntries(
  links.map((l) => [l.id, l.path]),
)

const Layout = () => {
  const { pathname } = useLocation()
  const navigate = useNavigate()

  const activeId = pathToId[pathname] ?? 'dashboard'

  // scroll-driven URL update ko route-driven scroll se alag rakhne ke liye guard
  const suppressScroll = useRef(false)
  const pathRef = useRef(pathname)
  pathRef.current = pathname

  // route badla (nav click / direct URL) → us section par scroll
  useEffect(() => {
    if (suppressScroll.current) {
      suppressScroll.current = false
      return
    }
    const id = pathToId[pathname] ?? 'dashboard'
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }, [pathname])

  // scrollspy → scroll karte waqt URL sync karo (bina dobara scroll trigger kiye)
  useEffect(() => {
    const sections = links
      .map((l) => document.getElementById(l.id))
      .filter((el): el is HTMLElement => el !== null)

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const path = idToPath[entry.target.id]
            if (path && path !== pathRef.current) {
              suppressScroll.current = true
              navigate(path, { replace: true })
            }
          }
        }
      },
      { rootMargin: '-20% 0px -70% 0px' },
    )

    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [navigate])

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="sticky top-0 z-20 border-b border-slate-800 bg-slate-900/80 backdrop-blur">
        <nav className="mx-auto flex max-w-7xl items-center gap-6 px-6 py-4">
          <Link to="/" className="text-lg font-semibold tracking-tight text-cyan-400">
            NFO&nbsp;Data
          </Link>
          <div className="flex gap-1">
            {links.map((l) => (
              <Link
                key={l.id}
                to={l.path}
                className={`rounded-lg px-3 py-1.5 text-sm font-medium transition ${
                  activeId === l.id
                    ? 'bg-cyan-500/15 text-cyan-300'
                    : 'text-slate-400 hover:text-slate-100'
                }`}
              >
                {l.label}
              </Link>
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
