export default function Hero() {
  return (
    <section className="py-16 text-center relative">
      <h1 className="text-4xl md:text-6xl font-bold">Kubex Ecosystem</h1>
      <p className="mt-4 text-lg text-neutral-300">
        An open-source ecosystem built for simplicity, modularity, and freedom.
      </p>
      <div className="mt-8 flex justify-center gap-3">
        <a href="https://github.com/kubex-ecosystem" className="btn btn-primary">Explore Projects</a>
        <a href="https://kubex.world/docs" className="btn">Get Started</a>
      </div>
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,rgba(0,231,255,.08),transparent_60%),radial-gradient(ellipse_at_bottom,rgba(168,85,247,.06),transparent_60%)]" />
    </section>
  )
}
