import { useMemo } from 'react'
import type { OptionChainRow } from '@/types/nfo'
import { formatNumber, formatPrice } from '@/utils/format'

const th =
  'px-3 py-2 text-xs font-semibold uppercase tracking-wider text-slate-500'
const td = 'px-3 py-2 text-sm whitespace-nowrap text-center'

const OptionChainTable = ({ rows }: { rows: OptionChainRow[] }) => {
  // ATM heuristic: jahan CE aur PE ki LTP sabse paas ho
  const atmStrike = useMemo(() => {
    let best: number | null = null
    let diff = Infinity
    for (const r of rows) {
      if (r.ce && r.pe) {
        const d = Math.abs(r.ce.ltp - r.pe.ltp)
        if (d < diff) {
          diff = d
          best = r.strike
        }
      }
    }
    return best
  }, [rows])

  if (!rows.length) {
    return (
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-10 text-center text-slate-400">
        Is expiry ke liye option chain data nahi mila.
      </div>
    )
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-800">
      <table className="min-w-full divide-y divide-slate-800">
        <thead className="bg-slate-900">
          <tr>
            <th className={th} colSpan={3}>
              <span className="text-emerald-400">CALLS (CE)</span>
            </th>
            <th className={th}>Strike</th>
            <th className={th} colSpan={3}>
              <span className="text-rose-400">PUTS (PE)</span>
            </th>
          </tr>
          <tr className="text-slate-500">
            <th className={th}>OI</th>
            <th className={th}>Volume</th>
            <th className={th}>LTP</th>
            <th className={th}></th>
            <th className={th}>LTP</th>
            <th className={th}>Volume</th>
            <th className={th}>OI</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800 bg-slate-950/40">
          {rows.map((r) => {
            const isAtm = r.strike === atmStrike
            return (
              <tr
                key={r.strike}
                className={isAtm ? 'bg-cyan-500/10' : 'hover:bg-slate-900/50'}
              >
                {/* CALL side (green tint) */}
                <td className={`${td} bg-emerald-500/5 text-slate-400`}>
                  {r.ce ? formatNumber(r.ce.oi) : '—'}
                </td>
                <td className={`${td} bg-emerald-500/5 text-slate-400`}>
                  {r.ce ? formatNumber(r.ce.volume) : '—'}
                </td>
                <td className={`${td} bg-emerald-500/5 font-medium text-emerald-300`}>
                  {r.ce ? formatPrice(r.ce.ltp) : '—'}
                </td>

                {/* Strike */}
                <td className={`${td} font-semibold ${isAtm ? 'text-cyan-300' : 'text-slate-100'}`}>
                  {formatPrice(r.strike)}
                  {isAtm && <span className="ml-1 text-[10px] text-cyan-400">ATM</span>}
                </td>

                {/* PUT side (red tint) */}
                <td className={`${td} bg-rose-500/5 font-medium text-rose-300`}>
                  {r.pe ? formatPrice(r.pe.ltp) : '—'}
                </td>
                <td className={`${td} bg-rose-500/5 text-slate-400`}>
                  {r.pe ? formatNumber(r.pe.volume) : '—'}
                </td>
                <td className={`${td} bg-rose-500/5 text-slate-400`}>
                  {r.pe ? formatNumber(r.pe.oi) : '—'}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default OptionChainTable
