import { useState } from 'react'
import type { DataFilters, InstrumentType } from '@/types/nfo'
import { useNames } from '@/hooks/useNames'
import { useExpiries } from '@/hooks/useExpiries'

interface Props {
  onApply: (filters: DataFilters) => void
}

const TYPES: InstrumentType[] = ['CE', 'PE', 'FUT']
const LIMITS = [25, 50, 100, 200]

const inputCls =
  'rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none focus:border-cyan-500'

const FilterBar = ({ onApply }: Props) => {
  const [name, setName] = useState('')
  const [type, setType] = useState('')
  const [expiry, setExpiry] = useState('')
  const [strike, setStrike] = useState('')
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [limit, setLimit] = useState(50)

  const { data: names } = useNames()
  const { data: expiries } = useExpiries(name || undefined)

  const apply = () => {
    onApply({
      name: name || undefined,
      type: (type as InstrumentType) || undefined,
      expiry: expiry || undefined,
      strike: strike || undefined,
      from: from || undefined,
      to: to || undefined,
      limit,
      offset: 0,
    })
  }

  const reset = () => {
    setName('')
    setType('')
    setExpiry('')
    setStrike('')
    setFrom('')
    setTo('')
    setLimit(50)
    onApply({ limit: 50, offset: 0 })
  }

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {/* name */}
        <select
          className={inputCls}
          value={name}
          onChange={(e) => {
            setName(e.target.value)
            setExpiry('')
          }}
        >
          <option value="">All Indices</option>
          {names?.map((n) => (
            <option key={n.name} value={n.name}>
              {n.name}
            </option>
          ))}
        </select>

        {/* type */}
        <select className={inputCls} value={type} onChange={(e) => setType(e.target.value)}>
          <option value="">All Types</option>
          {TYPES.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>

        {/* expiry */}
        <select
          className={inputCls}
          value={expiry}
          onChange={(e) => setExpiry(e.target.value)}
        >
          <option value="">All Expiries</option>
          {expiries?.map((ex) => (
            <option key={ex} value={ex}>
              {ex}
            </option>
          ))}
        </select>

        {/* strike */}
        <input
          className={inputCls}
          type="number"
          placeholder="Strike (e.g. 49500)"
          value={strike}
          onChange={(e) => setStrike(e.target.value)}
        />

        {/* from */}
        <input
          className={inputCls}
          type="text"
          placeholder="From: 2026-06-19 09:15:00"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
        />

        {/* to */}
        <input
          className={inputCls}
          type="text"
          placeholder="To: 2026-06-19 10:00:00"
          value={to}
          onChange={(e) => setTo(e.target.value)}
        />

        {/* limit */}
        <select
          className={inputCls}
          value={limit}
          onChange={(e) => setLimit(Number(e.target.value))}
        >
          {LIMITS.map((l) => (
            <option key={l} value={l}>
              {l} rows / page
            </option>
          ))}
        </select>

        {/* buttons */}
        <div className="flex gap-2">
          <button
            onClick={apply}
            className="flex-1 rounded-lg bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
          >
            Apply
          </button>
          <button
            onClick={reset}
            className="rounded-lg border border-slate-700 px-4 py-2 text-sm text-slate-300 transition hover:bg-slate-800"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  )
}

export default FilterBar
