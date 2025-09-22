import { useEffect, useRef, useState } from 'react'

type Props = {
  text: string
  speed?: number // ms per character
  delay?: number // ms before start
  className?: string
  showCaret?: boolean
}

export default function Typewriter({
  text,
  speed = 30,
  delay = 0,
  className,
  showCaret = true,
}: Props) {
  const [count, setCount] = useState(0)
  const timerRef = useRef<number | null>(null)

  useEffect(() => {
    let startTimeout: number | null = null

    const start = () => {
      timerRef.current = window.setInterval(() => {
        setCount((c) => {
          if (c >= text.length) {
            if (timerRef.current) window.clearInterval(timerRef.current)
            timerRef.current = null
            return c
          }
          return c + 1
        })
      }, Math.max(10, speed))
    }

    if (delay > 0) {
      startTimeout = window.setTimeout(start, delay)
    } else {
      start()
    }

    return () => {
      if (startTimeout) window.clearTimeout(startTimeout)
      if (timerRef.current) window.clearInterval(timerRef.current)
    }
  }, [text, speed, delay])

  const shown = text.slice(0, count)

  return (
    <p className={className} aria-label={text}>
      <span>{shown}</span>
      {showCaret && (
        <span className="typewriter-caret" aria-hidden="true" />
      )}
    </p>
  )}

