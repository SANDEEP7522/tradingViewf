// Backend (/api/nfo) ke response types

export type InstrumentType = 'CE' | 'PE' | 'FUT'

// nfo_data table ki ek row
export interface NfoRow {
  date: string
  open: number
  high: number
  low: number
  close: number
  volume: number
  oi: number
  symbol: string
  name: string
  expiry: string
  strike: number
  instrument_type: InstrumentType
}

// GET /nfo — paginated response
export interface PagedData {
  total: number
  count: number
  limit: number
  offset: number
  rows: NfoRow[]
}

// GET /nfo query filters
export interface DataFilters {
  name?: string
  symbol?: string
  type?: InstrumentType
  expiry?: string
  strike?: number | string
  from?: string
  to?: string
  limit?: number
  offset?: number
}

// GET /nfo/names
export interface NameCount {
  name: string
  rows: number
}

// GET /nfo/stats
export interface Stats {
  total: number
  range: { start: string; end: string }
  byName: NameCount[]
  byType: { type: InstrumentType; rows: number }[]
}

// GET /nfo/symbol/:symbol — ek candle
export interface Candle {
  date: string
  open: number
  high: number
  low: number
  close: number
  volume: number
  oi: number
}

export interface SymbolSeries {
  symbol: string
  count: number
  rows: Candle[]
}

// GET /nfo/option-chain
export interface OptionLeg {
  symbol: string
  ltp: number
  open: number
  high: number
  low: number
  volume: number
  oi: number
  date: string
}

export interface OptionChainRow {
  strike: number
  ce: OptionLeg | null
  pe: OptionLeg | null
}

export interface OptionChain {
  name: string
  expiry: string
  snapshot: string
  strikes: OptionChainRow[]
}
