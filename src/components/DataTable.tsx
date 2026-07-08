import type { NfoRow } from '@/types/nfo'
import { formatNumber, formatPrice, formatDateTime } from '@/utils/format'

const th = 'px-3 py-2 text-left text-xs font-semibold uppercase tracking-wider text-slate-500'
const td = 'px-3 py-2 text-sm whitespace-nowrap'

const typeColor: Record<string, string> = {
  CE: 'text-emerald-400',
  PE: 'text-rose-400',
  FUT: 'text-amber-400',
}

const DataTable = ({ rows }: { rows: NfoRow[] }) => {
  if (!rows.length) {
    return (
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-10 text-center text-slate-400">
        Koi data nahi mila. Filters change karke try karo.
      </div>
    )
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-800">
      <table className="min-w-full divide-y divide-slate-800">
        <thead className="bg-slate-900">
          <tr>
            <th className={th}>Date</th>
            <th className={th}>Symbol</th>
            <th className={th}>Type</th>
            <th className={th}>Strike</th>
            <th className={th}>Open</th>
            <th className={th}>High</th>
            <th className={th}>Low</th>
            <th className={th}>Close</th>
            <th className={th}>Volume</th>
            <th className={th}>OI</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800 bg-slate-950/40">
          {rows.map((r, i) => (
            <tr key={`${r.symbol}-${r.date}-${i}`} className="hover:bg-slate-900/60">
              <td className={`${td} text-slate-400`}>{formatDateTime(r.date)}</td>
              <td className={`${td} font-medium text-slate-200`}>{r.symbol}</td>
              <td className={`${td} font-semibold ${typeColor[r.instrument_type] ?? ''}`}>
                {r.instrument_type}
              </td>
              <td className={`${td} text-slate-300`}>
                {r.strike ? formatPrice(r.strike) : '—'}
              </td>
              <td className={`${td} text-slate-300`}>{formatPrice(r.open)}</td>
              <td className={`${td} text-slate-300`}>{formatPrice(r.high)}</td>
              <td className={`${td} text-slate-300`}>{formatPrice(r.low)}</td>
              <td className={`${td} font-medium text-slate-100`}>{formatPrice(r.close)}</td>
              <td className={`${td} text-slate-400`}>{formatNumber(r.volume)}</td>
              <td className={`${td} text-slate-400`}>{formatNumber(r.oi)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default DataTable
