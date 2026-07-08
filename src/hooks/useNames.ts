import { getNames } from '@/services/nfoService'
import { useFetch } from './useFetch'

// dropdowns ke liye index names + counts
export function useNames() {
  return useFetch(() => getNames(), [])
}
