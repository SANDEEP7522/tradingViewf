import { useEffect, useState } from 'react'
import { getSymbolSeries } from '@/services/nfoService'
import { useFetch } from '@/hooks/useFetch'
import { useNames } from '@/hooks/useNames'
import { useSymbols } from '@/hooks/useSymbols'
import CandleChart from '@/components/CandleChart'
import Loader from '@/components/Loader'
import ErrorBanner from '@/components/ErrorBanner'

const selectCls =
  'rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none focus:border-cyan-500'

const ChartPage = () => {
  const [name, setName] = useState('')
  const [symbol, setSymbol] = useState('')

  const { data: names } = useNames()
  const { data: symbols, loading: symLoading } = useSymbols(name || undefined)

  // name badle to symbol reset
  useEffect(() => {
    setSymbol('')
  }, [name])

  const { data, loading, error, refetch } = useFetch(
    () => (symbol ? getSymbolSeries(symbol, 500) : Promise.resolve(null)),
    [symbol],
  )

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold">Chart</h1>
        <p className="mt-1 text-slate-400">Symbol ki candlestick + volume</p>
      </div>

      {/* selectors */}
      <div className="flex flex-wrap gap-3">
        <select className={selectCls} value={name} onChange={(e) => setName(e.target.value)}>
          <option value="">Select Index</option>
          {names?.map((n) => (
            <option key={n.name} value={n.name}>
              {n.name}
            </option>
          ))}
        </select>

        <select
          className={selectCls}
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
          disabled={!name || symLoading}
        >
          <option value="">
            {!name ? 'Pehle index chuno' : symLoading ? 'Loading…' : 'Select Symbol'}
          </option>
          {symbols?.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      {/* chart area */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
        {!symbol && (
          <p className="py-16 text-center text-slate-500">
            Index aur symbol chuno — chart yahan aayega.
          </p>
        )}
        {symbol && loading && <Loader label="Candles load ho rahe hain…" />}
        {symbol && error && <ErrorBanner message={error} onRetry={refetch} />}
        {symbol && data && data.rows.length > 0 && (
          <>
            <p className="mb-3 text-sm text-slate-400">
              <span className="font-medium text-slate-200">{data.symbol}</span> ·{' '}
              {data.count} candles
            </p>
            <CandleChart candles={data.rows} />
          </>
        )}
        {symbol && data && data.rows.length === 0 && (
          <p className="py-16 text-center text-slate-500">Is symbol ka data nahi mila.</p>
        )}
      </div>
    </div>
  )
}

export default ChartPage
