const Home = () => {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-6 text-white">
      <section className="w-full max-w-2xl rounded-2xl border border-slate-800 bg-slate-900/80 p-10 shadow-2xl shadow-slate-950/40">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">
          Frontend Setup
        </p>
        <h1 className="text-4xl font-semibold sm:text-5xl">
          Project Setup Complete
        </h1>
        <p className="mt-4 text-lg text-slate-300">
          Vite, React, TypeScript, Tailwind CSS, routing, and the project
          structure are ready for future development.
        </p>
      </section>
    </main>
  )
}

export default Home
