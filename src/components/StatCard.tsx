interface Props {
  label: string
  value: string | number
  hint?: string
}

const StatCard = ({ label, value, hint }: Props) => (
  <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
    <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
      {label}
    </p>
    <p className="mt-2 text-2xl font-semibold text-slate-100">{value}</p>
    {hint && <p className="mt-1 text-xs text-slate-500">{hint}</p>}
  </div>
)

export default StatCard
