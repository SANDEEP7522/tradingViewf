const Home = () => {
  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-10 shadow-2xl shadow-slate-950/40">
      <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">
        Phase 0 Complete
      </p>
      <h1 className="text-4xl font-semibold sm:text-5xl">NFO Data Dashboard</h1>
      <p className="mt-4 max-w-2xl text-lg text-slate-300">
        Foundation ready — API client, types, routing aur layout set ho gaye hain.
        Dashboard stats Phase 2 me yahan aayenge.
      </p>
      <div className="mt-6 flex flex-wrap gap-3 text-sm text-slate-400">
        <span className="rounded-lg border border-slate-800 bg-slate-950 px-3 py-1.5">
          API: {import.meta.env.VITE_API_URL ?? 'http://localhost:5000/api'}
        </span>
      </div>
    </section>
  )
}

export default Home
