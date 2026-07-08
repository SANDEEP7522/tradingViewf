import api from './api'
import type {
  Stats,
  NameCount,
  PagedData,
  DataFilters,
  SymbolSeries,
  OptionChain,
} from '@/types/nfo'

// GET /nfo/stats — dataset overview
export async function getStats(): Promise<Stats> {
  const { data } = await api.get<Stats>('/nfo/stats')
  return data
}

// GET /nfo/names — unique index names + counts
export async function getNames(): Promise<NameCount[]> {
  const { data } = await api.get<NameCount[]>('/nfo/names')
  return data
}

// GET /nfo/symbols?name=&limit=
export async function getSymbols(
  name?: string,
  limit?: number,
): Promise<string[]> {
  const { data } = await api.get<string[]>('/nfo/symbols', {
    params: { name, limit },
  })
  return data
}

// GET /nfo/expiries?name=
export async function getExpiries(name?: string): Promise<string[]> {
  const { data } = await api.get<string[]>('/nfo/expiries', {
    params: { name },
  })
  return data
}

// GET /nfo — filtered + paginated rows
export async function getData(filters: DataFilters = {}): Promise<PagedData> {
  const { data } = await api.get<PagedData>('/nfo', { params: filters })
  return data
}

// GET /nfo/symbol/:symbol — ek symbol ki time-series
export async function getSymbolSeries(
  symbol: string,
  limit?: number,
): Promise<SymbolSeries> {
  const { data } = await api.get<SymbolSeries>(
    `/nfo/symbol/${encodeURIComponent(symbol)}`,
    { params: { limit } },
  )
  return data
}

// GET /nfo/option-chain?name=&expiry=&time=
export async function getOptionChain(
  name: string,
  expiry: string,
  time?: string,
): Promise<OptionChain> {
  const { data } = await api.get<OptionChain>('/nfo/option-chain', {
    params: { name, expiry, time },
  })
  return data
}
