import { useCallback, useEffect, useState } from 'react'

interface FetchState<T> {
  data: T | null
  loading: boolean
  error: string | null
  refetch: () => void
}

/**
 * Generic async data hook.
 * @param fetcher  async function jo data return kare
 * @param deps     dependency array — badalne par dobara fetch hoga
 *
 * Example:
 *   const { data, loading, error } = useFetch(() => getStats(), [])
 */
export function useFetch<T>(
  fetcher: () => Promise<T>,
  deps: React.DependencyList = [],
): FetchState<T> {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // fetcher ko deps ke saath memoize karo
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const memoFetcher = useCallback(fetcher, deps)

  const run = useCallback(() => {
    let active = true
    setLoading(true)
    setError(null)

    memoFetcher()
      .then((res) => {
        if (active) setData(res)
      })
      .catch((err: Error) => {
        if (active) setError(err.message)
      })
      .finally(() => {
        if (active) setLoading(false)
      })

    return () => {
      active = false
    }
  }, [memoFetcher])

  useEffect(() => run(), [run])

  return { data, loading, error, refetch: run }
}
