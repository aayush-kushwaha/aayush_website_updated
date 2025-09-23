import { NavLink, useLocation } from 'react-router-dom'
import ThemeToggle from './ThemeToggle'
import { useEffect, useState } from 'react'

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/projects', label: 'Projects' },
  { to: '/experience', label: 'Experience' },
  { to: '/skills', label: 'Skills' },
  { to: '/resume', label: 'Resume' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const location = useLocation()
  const [activeSection, setActiveSection] = useState<string | null>(null)

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>('section[data-section]'))
    if (sections.length === 0) return
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible[0]) {
          const id = (visible[0].target as HTMLElement).id
          setActiveSection(id)
        }
      },
      { threshold: [0.5, 0.6, 0.7] }
    )

    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [location.pathname])

  return (
    <header className="sticky top-0 z-40 w-full border-b border-gray-200 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:border-gray-800 dark:bg-gray-950/70">
      <div className="container-default flex h-16 items-center justify-between">
        <NavLink to="/" className="flex items-center gap-2 text-lg font-semibold">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-accent font-bold text-white">AK</span>
          <span className="hidden sm:inline">Aayush Kushwaha</span>
        </NavLink>
        <nav className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => {
                const sectionMatch = activeSection === item.label.toLowerCase()
                const active = isActive || sectionMatch
                return `text-sm font-medium ${active ? 'text-accent' : 'text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white'}`
              }}
              end={item.to === '/'}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          {/* Geek mode button (desktop) */}
          <a
            href="https://aayush-kushwaha.github.io/terminal_website/"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex items-center gap-2 rounded-md border border-emerald-400 bg-black/80 px-3 py-2 font-mono text-sm text-emerald-300 shadow-[0_0_10px_rgba(16,185,129,0.5)] transition-colors hover:bg-black hover:text-emerald-200"
            aria-label="Open Geek mode"
          >
            {/* Terminal icon */}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 7l4 4-4 4M12 17h8" />
            </svg>
            Geek mode
          </a>
          <ThemeToggle />
          <MobileMenu />
        </div>
      </div>
    </header>
  )
}

function MobileMenu() {
  const [open, setOpen] = useState(false)
  return (
    <div className="md:hidden">
      <button
        aria-label="Open menu"
        className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 bg-white hover:bg-gray-50 dark:border-gray-800 dark:bg-gray-900 dark:hover:bg-gray-800"
        onClick={() => setOpen((o) => !o)}
      >
        {/* Hamburger */}
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
          <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>
      {open && (
        <div className="absolute left-0 right-0 top-16 border-b border-gray-200 bg-white pb-4 dark:border-gray-800 dark:bg-gray-950">
          <div className="container-default grid gap-2">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `rounded-md px-3 py-2 text-sm font-medium ${isActive ? 'bg-accent/10 text-accent' : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-900'}`
                }
                end={item.to === '/'}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </NavLink>
            ))}
            {/* Geek mode button (mobile menu) */}
            <a
              href="https://aayush-kushwaha.github.io/terminal_website/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 inline-flex items-center gap-2 rounded-md border border-emerald-400 bg-black px-3 py-2 font-mono text-sm text-emerald-300 shadow-[0_0_10px_rgba(16,185,129,.5)] hover:bg-gray-900"
              onClick={() => setOpen(false)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 7l4 4-4 4M12 17h8" />
              </svg>
              Geek mode
            </a>
          </div>
        </div>
      )}
    </div>
  )
}
