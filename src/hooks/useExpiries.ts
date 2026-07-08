import { getExpiries } from '@/services/nfoService'
import { useFetch } from './useFetch'

// kisi name ki expiry dates (name badalne par refetch)
export function useExpiries(name?: string) {
  return useFetch(() => getExpiries(name), [name])
}
