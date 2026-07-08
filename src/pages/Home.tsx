import { getStats } from '@/services/nfoService'
import { useFetch } from '@/hooks/useFetch'
import { formatNumber, formatDateTime } from '@/utils/format'
import StatCard from '@/components/StatCard'
import Loader from '@/components/Loader'
import ErrorBanner from '@/components/ErrorBanner'

const Home = () => {
  const { data, loading, error, refetch } = useFetch(() => getStats(), [])

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold">Dashboard</h1>
        <p className="mt-1 text-slate-400">NFO index options & futures — overview</p>
      </div>

      {loading && <Loader label="Stats load ho rahe hain…" />}
      {error && <ErrorBanner message={error} onRetry={refetch} />}

      {data && (
        <>
          {/* top stat cards */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard label="Total Rows" value={formatNumber(data.total)} />
            <StatCard label="Indices" value={data.byName.length} />
            <StatCard label="Instrument Types" value={data.byType.length} />
            <StatCard
              label="Data Point"
              value={formatDateTime(data.range.start).split(',')[0]}
              hint={`${formatDateTime(data.range.start).split(', ')[1]} – ${formatDateTime(data.range.end).split(', ')[1]}`}
            />
          </div>

          {/* breakdowns */}
          <div className="grid gap-4 lg:grid-cols-2">
            {/* by name */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
              <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-400">
                Rows by Index
              </h2>
              <div className="space-y-3">
                {data.byName.map((n) => {
                  const pct = (n.rows / data.total) * 100
                  return (
                    <div key={n.name}>
                      <div className="mb-1 flex justify-between text-sm">
                        <span className="text-slate-200">{n.name}</span>
                        <span className="text-slate-400">
                          {formatNumber(n.rows)} ({pct.toFixed(1)}%)
                        </span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-slate-800">
                        <div
                          className="h-full rounded-full bg-cyan-500"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* by type */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
              <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-400">
                Rows by Instrument Type
              </h2>
              <div className="flex flex-wrap gap-3">
                {data.byType.map((t) => (
                  <div
                    key={t.type}
                    className="flex-1 rounded-xl border border-slate-800 bg-slate-950 p-4 text-center"
                  >
                    <p className="text-2xl font-semibold text-cyan-300">{t.type}</p>
                    <p className="mt-1 text-sm text-slate-400">
                      {formatNumber(t.rows)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default Home
