// Number ko Indian-style commas ke saath (e.g. 4,18,573)
export function formatNumber(n: number): string {
  return n.toLocaleString('en-IN')
}

// Price — 2 decimals tak, trailing zeros hata ke
export function formatPrice(n: number): string {
  return n.toLocaleString('en-IN', { maximumFractionDigits: 2 })
}

// "2026-06-19 09:15:00+05:30" → "19 Jun 2026, 09:15"
export function formatDateTime(s: string): string {
  const d = new Date(s)
  if (isNaN(d.getTime())) return s
  return d.toLocaleString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}
