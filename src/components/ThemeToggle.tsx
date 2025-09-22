import { useEffect, useState } from 'react'

function setThemeClass(isDark: boolean) {
  const root = document.documentElement
  if (isDark) root.classList.add('dark')
  else root.classList.remove('dark')
}

export default function ThemeToggle() {
  const [dark, setDark] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('theme')
      if (saved) return saved === 'dark'
      return window.matchMedia('(prefers-color-scheme: dark)').matches
    } catch {
      return false
    }
  })

  useEffect(() => {
    setThemeClass(dark)
    try {
      localStorage.setItem('theme', dark ? 'dark' : 'light')
    } catch {}
  }, [dark])

  return (
    <button
      aria-label="Toggle dark mode"
      className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 bg-white hover:bg-gray-50 dark:border-gray-800 dark:bg-gray-900 dark:hover:bg-gray-800"
      onClick={() => setDark((d) => !d)}
    >
      {dark ? (
        // Sun icon
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
          <path d="M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12ZM12 2a1 1 0 0 1 1 1v1a1 1 0 1 1-2 0V3a1 1 0 0 1 1-1Zm0 18a1 1 0 0 1 1 1v1a1 1 0 1 1-2 0v-1a1 1 0 0 1 1-1Zm10-9a1 1 0 0 1-1 1h-1a1 1 0 1 1 0-2h1a1 1 0 0 1 1 1ZM4 12a1 1 0 0 1-1 1H2a1 1 0 1 1 0-2h1a1 1 0 0 1 1 1Zm14.95 6.364a1 1 0 0 1-1.414 0l-.707-.707a1 1 0 0 1 1.414-1.414l.707.707a1 1 0 0 1 0 1.414Zm-12.02-12.02a1 1 0 0 1-1.414 0l-.707-.707A1 1 0 1 1 5.92 4.515l.707.707a1 1 0 0 1 0 1.414Zm12.02 0a1 1 0 0 1 0-1.414l.707-.707A1 1 0 1 1 21.08 5.92l-.707.707a1 1 0 0 1-1.414 0ZM5.222 19.778a1 1 0 0 1 0-1.414l.707-.707A1 1 0 0 1 7.343 19.07l-.707.707a1 1 0 0 1-1.414 0Z"/>
        </svg>
      ) : (
        // Moon icon
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
          <path d="M21.64 13a9 9 0 1 1-10.63-10.6 1 1 0 0 1 1.11 1.44A7 7 0 1 0 20.2 11.9a1 1 0 0 1 1.44 1.11Z"/>
        </svg>
      )}
    </button>
  )}

