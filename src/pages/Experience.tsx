export default function Experience() {
  const primaryCard =
    "group relative rounded-2xl border border-white/15 bg-white/6 p-5 sm:p-6 shadow-[0_12px_30px_rgba(0,0,0,0.28)] backdrop-blur-sm transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-white/25 hover:shadow-[0_16px_34px_rgba(0,0,0,0.32)] motion-reduce:transition-none motion-reduce:hover:transform-none"
  const secondaryCard =
    "group relative rounded-xl border border-white/10 bg-white/4 p-4 sm:p-5 shadow-[0_10px_24px_rgba(0,0,0,0.22)] backdrop-blur-sm transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-white/20 motion-reduce:transition-none motion-reduce:hover:transform-none"
  const chipClass =
    "rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70 transition duration-200 ease-out hover:border-white/25 hover:text-white/90 motion-reduce:transition-none"
  const metricClass =
    "rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/70"

  return (
    <section id="experience" data-section="experience" className="container-default scroll-mt-20 py-10 sm:py-12">
      <div className="mx-auto max-w-6xl">
        <header className="rounded-2xl bg-white/6 p-6 sm:p-7 shadow-[0_14px_34px_rgba(0,0,0,0.3)] backdrop-blur-sm">
          <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">Experience</h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/80 sm:text-base">
            Backend and infrastructure-focused engineer delivering reliable systems and measurable performance gains.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {["Backend", "Distributed Systems", "Performance", "Reliability"].map((item) => (
              <span key={item} className={chipClass}>
                {item}
              </span>
            ))}
          </div>
        </header>

        <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_280px]">
          <div className="relative pl-6">
            <div className="absolute left-3 top-0 h-full w-px bg-white/10" aria-hidden="true" />

            <section className={primaryCard}>
              <div className="absolute left-3 top-6 h-2 w-2 rounded-full bg-emerald-400/80" aria-hidden="true" />
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-wide text-white/50">Software Engineer</p>
                  <h2 className="mt-1 text-lg font-semibold text-white">DigitalPetro Private Limited, Bangalore (India)</h2>
                </div>
                <span className="text-sm text-white/60">2022-2025</span>
              </div>

              <div className="mt-4 border-t border-white/10 pt-4">
                <h3 className="text-xs uppercase tracking-wide text-white/50">Highlights</h3>
                <ul className="mt-3 grid gap-2 text-sm text-white/70">
                  {[
                    "Built and optimized backend APIs for fuel station automation (IOCL + IOML).",
                    "Reduced dashboard API response time from ~45s to <1s (about 98% improvement).",
                    "Monitored 100+ fuel stations; reduced customer support tickets by about 40%.",
                    "Implemented RabbitMQ workflows for data credibility and concurrent processing.",
                    "Contributed to alert systems and interlock safety functionality.",
                  ].map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-emerald-400/70" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-4 border-t border-white/10 pt-4">
                <h3 className="text-xs uppercase tracking-wide text-white/50">Impact</h3>
                <div className="mt-3 grid gap-2 sm:grid-cols-2">
                  {[
                    "45s -> <1s latency",
                    "100+ stations",
                    "92% -> 98% reliability",
                    "40% fewer tickets",
                  ].map((item) => (
                    <div key={item} className={metricClass}>
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 border-t border-white/10 pt-4">
                <h3 className="text-xs uppercase tracking-wide text-white/50">Stack</h3>
                <div className="mt-2 flex flex-wrap gap-2">
                  {[
                    "Python",
                    "FastAPI",
                    "Flask",
                    "PostgreSQL",
                    "Redis",
                    "RabbitMQ",
                    "Elasticsearch",
                    "Linux",
                    "Docker",
                  ].map((item) => (
                    <span key={item} className={chipClass}>
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </section>

            <section className={`${secondaryCard} mt-6`}>
              <div className="absolute left-3 top-6 h-2 w-2 rounded-full bg-white/30" aria-hidden="true" />
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-wide text-white/50">Engineer Intern</p>
                  <h2 className="mt-1 text-lg font-semibold text-white">DigiNirman Engineering Private Limited (Nepal)</h2>
                </div>
                <span className="text-sm text-white/60">2021-2022</span>
              </div>

              <div className="mt-4 border-t border-white/10 pt-4">
                <h3 className="text-xs uppercase tracking-wide text-white/50">Highlights</h3>
                <ul className="mt-3 grid gap-2 text-sm text-white/70">
                  {[
                    "Partitioned video datasets and created training/test splits for AI Robo Traffic.",
                    "Worked with CVAT annotation workflows; automated prep scripts in Python.",
                    "Supported model training using existing ML code.",
                    "Built a small CRUD system to manage data.",
                  ].map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-white/40" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-4 border-t border-white/10 pt-4">
                <h3 className="text-xs uppercase tracking-wide text-white/50">Stack</h3>
                <div className="mt-2 flex flex-wrap gap-2">
                  {["Python", "CVAT", "ML tooling"].map((item) => (
                    <span key={item} className={chipClass}>
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </section>
          </div>

          <aside className="h-fit rounded-xl border border-white/10 bg-white/4 p-4 shadow-[0_10px_22px_rgba(0,0,0,0.2)] backdrop-blur-sm">
            <h2 className="text-sm font-semibold text-white">Quick Summary</h2>
            <div className="mt-3 grid gap-2 text-sm text-white/70">
              <div className="rounded-lg border border-white/10 bg-white/5 px-3 py-2">3+ years total</div>
              <div className="rounded-lg border border-white/10 bg-white/5 px-3 py-2">
                Backend + distributed systems
              </div>
              <div className="rounded-lg border border-white/10 bg-white/5 px-3 py-2">
                Performance + reliability focus
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}
