export default function Home() {
  return (
    <section id="home" data-section="home" className="container-default scroll-mt-20 py-16 sm:py-24">
      <div className="grid items-center gap-10 md:grid-cols-2">
        <div>
          <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">Hi, I’m Aayush Kushwaha 👋</h1>
          <p className="mb-8 text-lg text-gray-700 dark:text-gray-300">Backend Developer | MSCS Student at University of Alabama at Birmingham</p>
          <div className="flex flex-wrap gap-3">
            <a className="btn" href="/resume.pdf" target="_blank" rel="noreferrer">Resume PDF</a>
            <a className="btn-outline" href="https://github.com/aayush-kushwaha" target="_blank" rel="noreferrer">GitHub</a>
            <a className="btn-outline" href="https://linkedin.com/in/aayushkushwaha" target="_blank" rel="noreferrer">LinkedIn</a>
            <a className="btn-outline" href="mailto:kushwaha@uab.edu">Email</a>
          </div>
        </div>
        <div className="order-first md:order-last">
          <div className="card">
            <p className="text-gray-700 dark:text-gray-300">Clean, reliable backends. APIs, data, and infrastructure that scale.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
