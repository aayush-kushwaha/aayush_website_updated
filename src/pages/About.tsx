import { useEffect, useState } from "react"

export default function About() {
  const [showInfraNotes, setShowInfraNotes] = useState(false)

  useEffect(() => {
    const rootFlag = document.documentElement.getAttribute("data-geek") === "true"
    const storedFlag =
      localStorage.getItem("geek-mode") === "true" || localStorage.getItem("geekMode") === "true"
    const queryFlag = new URLSearchParams(window.location.search).get("geek")
    const isOn = rootFlag || storedFlag || queryFlag === "1" || queryFlag === "true"
    setShowInfraNotes(isOn)
  }, [])

  const primaryCard =
    "group relative rounded-xl border border-white/15 bg-white/6 p-5 sm:p-6 shadow-[0_10px_28px_rgba(0,0,0,0.25)] backdrop-blur-sm transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-white/25 hover:shadow-[0_14px_30px_rgba(0,0,0,0.28)] motion-reduce:transition-none motion-reduce:hover:transform-none"
  const supportingCard =
    "group relative rounded-lg border border-white/10 bg-white/3 p-4 sm:p-4 shadow-[0_8px_18px_rgba(0,0,0,0.18)] backdrop-blur-sm transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-white/20 motion-reduce:transition-none motion-reduce:hover:transform-none"
  const impactCard =
    "group relative rounded-xl border border-white/20 bg-white/6 p-4 sm:p-5 shadow-[0_12px_28px_rgba(0,0,0,0.3)] backdrop-blur-sm transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-white/30 motion-reduce:transition-none motion-reduce:hover:transform-none"
  const chipClass =
    "rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70 transition duration-200 ease-out hover:border-white/25 hover:text-white/90 motion-reduce:transition-none"

  return (
    <section id="about" data-section="about" className="container-default scroll-mt-20 py-10 sm:py-12">
      <div className="mx-auto max-w-6xl">
        <header className="rounded-2xl bg-white/6 p-6 sm:p-7 shadow-[0_14px_34px_rgba(0,0,0,0.3)] backdrop-blur-sm">
          <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">About Me</h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/80 sm:text-base">
            Backend-focused engineer building reliable systems with clear boundaries, deliberate data flow, and
            practical AI-assisted automation.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {["Engineering-first", "Backend", "Infrastructure-minded"].map((item) => (
              <span key={item} className={chipClass}>
                {item}
              </span>
            ))}
          </div>
          <div className="mt-5 border-t border-white/10 pt-4">
            <div className="grid gap-3 sm:grid-cols-3">
              {[
                { stat: "3+ years", label: "Professional + internship experience" },
                { stat: "Sub-second APIs", label: "Latency reduced via profiling" },
                { stat: "Production systems", label: "Automation + data platforms" },
              ].map((item) => (
                <div
                  key={item.stat}
                  className="flex items-center justify-between gap-3 rounded-lg border border-white/10 bg-white/5 px-3 py-2"
                >
                  <span className="text-sm font-semibold text-white">{item.stat}</span>
                  <span className="text-xs text-white/60">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </header>

        <div className="mt-6 grid gap-5 lg:grid-cols-2">
          <section className={primaryCard}>
            <h2 className="text-base font-semibold text-white">Who I Am</h2>
            <p className="mt-3 max-w-prose text-sm leading-relaxed text-white/70">
              I am Aayush Kushwaha, an MS in Computer Science student at the University of Alabama at Birmingham.
            </p>
            <p className="mt-3 max-w-prose text-sm leading-relaxed text-white/70">
              My focus is backend development, databases, and distributed systems, with a calm preference for systems
              that stay reliable under pressure.
            </p>
            <div className="mt-4 border-t border-white/10 pt-3 text-xs text-white/55">
              Focus: performance, reliability, scalability
            </div>
          </section>

          <section className={primaryCard}>
            <h2 className="text-base font-semibold text-white">How I Think as an Engineer</h2>
            <ul className="mt-3 grid gap-3 text-sm text-white/70">
              {[
                { title: "Data flow first", detail: "Model constraints, ownership, and backpressure early." },
                { title: "Simple to operate", detail: "Clear boundaries, predictable behavior, fewer surprises." },
                { title: "Observable by default", detail: "Metrics, traces, and logs guide decisions." },
                { title: "AI when it helps", detail: "Automation that reduces toil, not complexity." },
              ].map((item) => (
                <li key={item.title} className="flex gap-3 border-b border-white/10 pb-3 last:border-0 last:pb-0">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-400/70" />
                  <div>
                    <p className="text-sm font-semibold text-white">{item.title}</p>
                    <p className="text-xs text-white/60">{item.detail}</p>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          <section className={supportingCard}>
            <h2 className="text-base font-semibold text-white">What I Work With</h2>

            <p className="mt-3 max-w-prose text-sm leading-relaxed text-white/70">
              I am comfortable with Python, FastAPI, Flask, PostgreSQL, Elasticsearch, Redis, and RabbitMQ. I also work
              across Docker, Linux, Nginx, deployment pipelines, and the infrastructure fundamentals that keep services
              observable and resilient.
            </p>
            <div className="mt-5 grid gap-4">
              <div>
                <p className="text-xs uppercase tracking-wide text-white/40">Backend</p>
                <p className="mt-1 text-xs text-white/55">APIs, queues, and service composition.</p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {["Python", "FastAPI", "Flask", "RabbitMQ"].map((item) => (
                    <span key={item} className={chipClass}>
                      {item}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-white/40">Data</p>
                <p className="mt-1 text-xs text-white/55">Query design, indexing, and search.</p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {["PostgreSQL", "Elasticsearch", "Redis"].map((item) => (
                    <span key={item} className={chipClass}>
                      {item}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-white/40">Infrastructure</p>
                <p className="mt-1 text-xs text-white/55">Shipping, runtime, and reliability basics.</p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {["Docker", "Linux", "Nginx", "CI/CD", "Observability"].map((item) => (
                    <span key={item} className={chipClass}>
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className={supportingCard}>
            <h2 className="text-base font-semibold text-white">Currently</h2>
            <div className="mt-3 grid gap-2.5">
              <div className="rounded-lg border border-white/10 bg-white/3 p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
                <p className="text-xs uppercase tracking-wide text-white/50">Focus</p>
                <p className="mt-1 text-sm text-white/70">
                  Backend systems, database performance, reliability patterns, and distributed workflows.
                </p>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/3 p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
                <p className="text-xs uppercase tracking-wide text-white/50">What I care about</p>
                <div className="mt-2 grid gap-1.5 text-sm text-white/70">
                  {[
                    "Latency budgets, profiling, caching.",
                    "Failure modes: timeouts, retries, idempotency.",
                    "Observability: logs, metrics, traces.",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-2">
                      <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-emerald-400/70" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/3 p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
                <p className="text-xs uppercase tracking-wide text-white/50">Open to</p>
                <p className="mt-1 text-sm text-white/70">
                  Backend roles and projects where performance and reliability matter.
                </p>
              </div>
            </div>
          </section>

          <div className="lg:col-span-2">
            <div className="mb-4 flex items-center gap-3">
              <div className="h-px flex-1 bg-white/10" />
              <span className="text-xs uppercase tracking-[0.24em] text-white/50"></span>
              <div className="h-px flex-1 bg-white/10" />
            </div>
            <section className={primaryCard}>
              <h2 className="text-base font-semibold text-white">Impact Highlights</h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {[
                {
                  stat: "3+ years",
                  label: "Experience",
                  detail: "Professional and internship roles across backend and distributed systems.",
                  highlight: true,
                },
                {
                  stat: "45s → <1s",
                  label: "Latency",
                  detail: "API response time reduced through profiling and caching strategy.",
                },
                {
                  stat: "92% → 98%",
                  label: "Reliability",
                  detail: "Improved stability with failure-aware design and retries.",
                },
                {
                  stat: "100+ stations",
                  label: "Scale",
                  detail: "Automation systems supporting real-world operations.",
                },
              ].map((item) => (
                <div
                  key={item.stat}
                  className={`${impactCard} ${item.highlight ? "sm:col-span-2" : ""}`}
                >
                  <p
                    className={`font-semibold text-white ${item.highlight ? "text-2xl sm:text-3xl" : "text-xl sm:text-2xl"}`}
                  >
                    {item.stat}
                  </p>
                  <p className="mt-1 text-xs uppercase tracking-wide text-white/50">{item.label}</p>
                  <p className="mt-2 text-xs leading-relaxed text-white/65">{item.detail}</p>
                </div>
              ))}
              </div>
            </section>
          </div>

          <section className={`${supportingCard} lg:col-span-2`}>
            <h2 className="text-base font-semibold text-white">Beyond Code</h2>
            <div className="mt-3 grid gap-3 text-sm text-white/70 sm:grid-cols-2">
              <div className="rounded-md border border-white/10 bg-white/5 p-3">
                <p className="text-xs uppercase tracking-wide text-white/50">Fitness + Motivation</p>
                <p className="mt-1 text-sm text-white/70">
                  Training keeps me consistent and focused on solving real-world problems.
                </p>
              </div>
              <div className="rounded-md border border-white/10 bg-white/5 p-3">
                <p className="text-xs uppercase tracking-wide text-white/50">Continuous learning</p>
                <p className="mt-1 text-sm text-white/70">Exploring systems, tools, and engineering practices.</p>
              </div>
            </div>
          </section>

          {showInfraNotes && (
            <section className={`${supportingCard} lg:col-span-2`}>
              <h2 className="text-base font-semibold text-white">Infra Notes</h2>
              <div className="mt-3 grid gap-3 text-sm text-white/70 sm:grid-cols-2">
                {[
                  "Observability: logs, metrics, traces.",
                  "Failure modes, retries, idempotency.",
                  "Latency budgets and profiling.",
                  "Queues, backpressure, async workflows.",
                ].map((item) => (
                  <div key={item} className="rounded-lg border border-white/10 bg-white/5 p-3">
                    <p className="text-xs text-white/70">{item}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </section>
  )
}
