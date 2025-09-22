export default function Home() {
  return (
    <section id="home" data-section="home" className="relative scroll-mt-20 min-h-[70vh] sm:min-h-[80vh] py-16 sm:py-24 flex items-center">
      {/* Background image + overlay */}
      <div className="absolute inset-0 -z-10">
        <img
          src="/hero.jpg"
          alt="Aayush background"
          loading="eager"
          fetchpriority="high"
          className="h-full w-full object-cover"
          style={{ objectPosition: 'center 30%' }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/10"></div>
      </div>

      <div className="container-default">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div className="text-white">
            <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl drop-shadow">Hi, I’m Aayush Kushwaha 👋</h1>
            <p className="mb-8 text-lg text-gray-100/90 drop-shadow">
              Backend Developer | MSCS Student at University of Alabama at Birmingham
            </p>
            <div className="flex flex-wrap gap-3">
              <a className="btn" href="/resume.pdf" target="_blank" rel="noreferrer">Resume PDF</a>
              <a className="btn-outline-white backdrop-blur" href="https://github.com/aayush-kushwaha" target="_blank" rel="noreferrer">GitHub</a>
              <a className="btn-outline-white backdrop-blur" href="https://linkedin.com/in/aayushkushwaha" target="_blank" rel="noreferrer">LinkedIn</a>
              <a className="btn-outline-white backdrop-blur" href="mailto:kushwaha@uab.edu">Email</a>
            </div>
          </div>
          <div className="order-first md:order-last">
            <div className="card bg-white/90">
              <p className="text-gray-800">Clean, reliable backends. APIs, data, and infrastructure that scale.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
