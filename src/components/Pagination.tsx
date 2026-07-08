import { formatNumber } from '@/utils/format'

interface Props {
  total: number
  limit: number
  offset: number
  count: number
  onPageChange: (offset: number) => void
}

const Pagination = ({ total, limit, offset, count, onPageChange }: Props) => {
  const page = Math.floor(offset / limit) + 1
  const totalPages = Math.max(1, Math.ceil(total / limit))
  const start = total === 0 ? 0 : offset + 1
  const end = offset + count

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-slate-400">
      <span>
        {formatNumber(start)}–{formatNumber(end)} of {formatNumber(total)}
      </span>

      <div className="flex items-center gap-2">
        <button
          disabled={offset === 0}
          onClick={() => onPageChange(Math.max(0, offset - limit))}
          className="rounded-lg border border-slate-700 px-3 py-1.5 transition enabled:hover:bg-slate-800 disabled:opacity-40"
        >
          ← Prev
        </button>
        <span className="text-slate-300">
          Page {page} / {totalPages}
        </span>
        <button
          disabled={offset + limit >= total}
          onClick={() => onPageChange(offset + limit)}
          className="rounded-lg border border-slate-700 px-3 py-1.5 transition enabled:hover:bg-slate-800 disabled:opacity-40"
        >
          Next →
        </button>
      </div>
    </div>
  )
}

export default Pagination
