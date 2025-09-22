import Typewriter from '../components/Typewriter'

export default function Home() {
  return (
    <section id="home" data-section="home" className="relative scroll-mt-20 min-h-[70vh] sm:min-h-[80vh] pt-24 pb-16 sm:pb-24 flex items-center">
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
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/10"></div>
      </div>

      <div className="container-default">
        <div className="grid items-center justify-items-start gap-10 md:grid-cols-12">
          <div className="text-white max-w-2xl lg:max-w-lg md:col-span-5">
            <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl drop-shadow">Hi, I’m Aayush Kushwaha 👋</h1>
            <Typewriter
              text="Backend Developer | MSCS Student at University of Alabama at Birmingham (UAB)"
              speed={18}
              className="mb-8 text-lg text-gray-100/90 drop-shadow"
            />
            <div className="flex flex-wrap gap-3">
              <a className="btn" href="/resume.pdf" target="_blank" rel="noreferrer">Resume PDF</a>
              <a className="btn-outline-white backdrop-blur" href="https://github.com/aayush-kushwaha" target="_blank" rel="noreferrer">GitHub</a>
              <a className="btn-outline-white backdrop-blur" href="https://linkedin.com/in/aayushkushwaha" target="_blank" rel="noreferrer">LinkedIn</a>
              <a className="btn-outline-white backdrop-blur" href="mailto:kushwaha@uab.edu">Email</a>
              <a className="btn-outline-white backdrop-blur" href="/projects">See Projects</a>
            </div>
          </div>
          <div className="hidden md:block md:col-span-7" />
        </div>
      </div>
    </section>
  )
}
