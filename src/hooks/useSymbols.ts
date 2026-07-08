import { getSymbols } from '@/services/nfoService'
import { useFetch } from './useFetch'

// kisi name ke symbols (name badalne par refetch)
export function useSymbols(name?: string, limit = 500) {
  return useFetch(() => getSymbols(name, limit), [name, limit])
}
