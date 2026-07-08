import { useState } from 'react'
import type { DataFilters } from '@/types/nfo'
import { getData } from '@/services/nfoService'
import { useFetch } from '@/hooks/useFetch'
import FilterBar from '@/components/FilterBar'
import DataTable from '@/components/DataTable'
import Pagination from '@/components/Pagination'
import Loader from '@/components/Loader'
import ErrorBanner from '@/components/ErrorBanner'

const DataExplorer = () => {
  const [filters, setFilters] = useState<DataFilters>({ limit: 50, offset: 0 })

  const { data, loading, error, refetch } = useFetch(
    () => getData(filters),
    [JSON.stringify(filters)],
  )

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold">Data Explorer</h1>
        <p className="mt-1 text-slate-400">Filter aur browse — 4.18 lakh rows</p>
      </div>

      <FilterBar onApply={(f) => setFilters(f)} />

      {loading && <Loader label="Rows load ho rahe hain…" />}
      {error && <ErrorBanner message={error} onRetry={refetch} />}

      {data && !loading && (
        <>
          <DataTable rows={data.rows} />
          <Pagination
            total={data.total}
            limit={data.limit}
            offset={data.offset}
            count={data.count}
            onPageChange={(offset) => setFilters((f) => ({ ...f, offset }))}
          />
        </>
      )}
    </div>
  )
}

export default DataExplorer
