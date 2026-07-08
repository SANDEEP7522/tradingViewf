import { useEffect, useState } from 'react'
import { getOptionChain } from '@/services/nfoService'
import { useFetch } from '@/hooks/useFetch'
import { useNames } from '@/hooks/useNames'
import { useExpiries } from '@/hooks/useExpiries'
import OptionChainTable from '@/components/OptionChainTable'
import Loader from '@/components/Loader'
import ErrorBanner from '@/components/ErrorBanner'

const selectCls =
  'rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none focus:border-cyan-500'

const OptionChainPage = () => {
  const [name, setName] = useState('')
  const [expiry, setExpiry] = useState('')
  const [time, setTime] = useState('')

  const { data: names } = useNames()
  const { data: expiries } = useExpiries(name || undefined)

  // name badle to expiry reset
  useEffect(() => {
    setExpiry('')
  }, [name])

  // default: pehla index auto-select
  useEffect(() => {
    if (!name && names?.length) setName(names[0].name)
  }, [names, name])

  // default: expiries load hote hi pehli expiry select
  useEffect(() => {
    if (!expiry && expiries?.length) setExpiry(expiries[0])
  }, [expiries, expiry])

  const ready = Boolean(name && expiry)

  const { data, loading, error, refetch } = useFetch(
    () =>
      ready
        ? getOptionChain(name, expiry, time || undefined)
        : Promise.resolve(null),
    [name, expiry, time],
  )

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold">Option Chain</h1>
        <p className="mt-1 text-slate-400">Strike-wise CE / PE snapshot</p>
      </div>

      {/* controls */}
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
          value={expiry}
          onChange={(e) => setExpiry(e.target.value)}
          disabled={!name}
        >
          <option value="">{!name ? 'Pehle index chuno' : 'Select Expiry'}</option>
          {expiries?.map((ex) => (
            <option key={ex} value={ex}>
              {ex}
            </option>
          ))}
        </select>

        <input
          className={selectCls}
          type="text"
          placeholder="Time (optional): 2026-06-19 09:30"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
      </div>

      {!ready && (
        <p className="py-16 text-center text-slate-500">
          Index aur expiry chuno — option chain yahan aayegi.
        </p>
      )}
      {ready && loading && <Loader label="Option chain load ho rahi hai…" />}
      {ready && error && <ErrorBanner message={error} onRetry={refetch} />}
      {ready && data && (
        <>
          <p className="text-sm text-slate-400">
            <span className="font-medium text-slate-200">{data.name}</span> ·{' '}
            {data.expiry} · snapshot:{' '}
            <span className="text-cyan-300">{data.snapshot}</span> ·{' '}
            {data.strikes.length} strikes
          </p>
          <OptionChainTable rows={data.strikes} />
        </>
      )}
    </div>
  )
}

export default OptionChainPage
