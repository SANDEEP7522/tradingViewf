interface Props {
  message: string
  onRetry?: () => void
}

const ErrorBanner = ({ message, onRetry }: Props) => (
  <div className="flex items-center justify-between gap-4 rounded-lg border border-red-900/60 bg-red-950/40 px-4 py-3 text-sm text-red-300">
    <span>⚠️ {message}</span>
    {onRetry && (
      <button
        onClick={onRetry}
        className="rounded-md border border-red-800 px-3 py-1 text-red-200 transition hover:bg-red-900/40"
      >
        Retry
      </button>
    )}
  </div>
)

export default ErrorBanner
