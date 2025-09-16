import { projects } from '../data/projects'
export default function ProjectsGrid() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-10">
      <h2 className="text-2xl font-semibold mb-6">Open Source Modules</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map(p => (
          <a key={p.name} href={p.repo} className="card p-5 hover:border-[var(--primary)] transition">
            <div className="text-xl font-medium">{p.name}</div>
            <p className="mt-2 text-sm text-neutral-300">{p.tagline}</p>
            {p.badges?.length ? (
              <div className="mt-3 flex flex-wrap gap-2">{p.badges.map(b =>
                <span key={b} className="text-xs px-2 py-1 rounded bg-black/30 border border-[var(--border)]">{b}</span>
              )}</div>
            ) : null}
          </a>
        ))}
      </div>
    </section>
  )
}
