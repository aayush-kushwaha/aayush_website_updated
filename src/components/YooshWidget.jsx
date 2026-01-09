import { useEffect, useRef, useState } from 'react'

const STORAGE_KEY = 'yoosh_chat_history'

export default function YooshWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [hasLoaded, setHasLoaded] = useState(false)
  const messagesRef = useRef(null)

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored)
        if (Array.isArray(parsed)) {
          setMessages(parsed)
        }
      }
    } catch {
      // Ignore localStorage errors.
    }
    setHasLoaded(true)
  }, [])

  useEffect(() => {
    if (!hasLoaded) return
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages))
    } catch {
      // Ignore localStorage errors.
    }
  }, [messages, hasLoaded])

  useEffect(() => {
    if (!isOpen || !messagesRef.current) return
    messagesRef.current.scrollTop = messagesRef.current.scrollHeight
  }, [messages, isOpen])

  const handleSend = async () => {
    if (isLoading) return
    const trimmed = input.trim()
    if (!trimmed) return

    const newMessages = [...messages, { role: 'user', content: trimmed }]
    setMessages(newMessages)
    setInput('')
    setError('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/yoosh/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
      })

      if (!response.ok) {
        throw new Error(`Request failed: ${response.status}`)
      }

      const data = await response.json()
      if (!data || typeof data.reply !== 'string') {
        throw new Error('Invalid response payload')
      }

      setMessages((prev) => [...prev, { role: 'assistant', content: data.reply }])
    } catch {
      setError('Sorry, Yoosh is unavailable right now.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      handleSend()
    }
  }

  return (
    <>
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 flex w-[min(90vw,360px)] flex-col overflow-hidden rounded-2xl border border-gray-700/70 bg-gray-900/95 text-gray-100 shadow-2xl backdrop-blur">
          <div className="flex items-center justify-between border-b border-gray-800 px-4 py-3">
            <div className="text-sm font-semibold tracking-wide">Yoosh</div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="rounded-full p-1 text-gray-300 transition hover:bg-white/10 hover:text-white"
              aria-label="Close Yoosh chat"
            >
              x
            </button>
          </div>
          <div
            ref={messagesRef}
            className="flex max-h-[50vh] flex-1 flex-col gap-3 overflow-y-auto px-4 py-3 text-sm"
          >
            {messages.length === 0 && !isLoading && (
              <div className="text-gray-400">Say hi to Yoosh whenever you need a hand.</div>
            )}
            {messages.map((message, index) => {
              const isUser = message.role === 'user'
              return (
                <div key={`${message.role}-${index}`} className={isUser ? 'flex justify-end' : 'flex'}>
                  <div
                    className={`max-w-[85%] rounded-2xl px-3 py-2 leading-relaxed ${
                      isUser
                        ? 'bg-accent text-white'
                        : 'bg-gray-800 text-gray-100'
                    }`}
                  >
                    <div className="whitespace-pre-wrap">{message.content}</div>
                  </div>
                </div>
              )
            })}
            {isLoading && (
              <div className="text-gray-400 animate-pulse">Yoosh is typing...</div>
            )}
          </div>
          <div className="border-t border-gray-800 px-4 py-3">
            <textarea
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask Yoosh..."
              rows={2}
              className="w-full resize-none rounded-xl border border-gray-700 bg-gray-900/80 px-3 py-2 text-sm text-gray-100 placeholder:text-gray-500 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30"
              disabled={isLoading}
            />
            <div className="mt-2 flex items-center justify-between text-xs text-gray-400">
              <span>{error}</span>
              <button
                type="button"
                onClick={handleSend}
                className="rounded-lg bg-accent px-3 py-1.5 text-xs font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                disabled={isLoading || input.trim().length === 0}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="fixed bottom-6 right-6 z-50 flex h-[60px] w-[60px] items-center justify-center rounded-full bg-gray-900 shadow-lg shadow-black/40 ring-1 ring-white/10 transition-transform hover:scale-105"
        aria-label="Open Yoosh chat"
      >
        <img src="/yoosh.png" alt="Yoosh" className="h-9 w-9 object-contain" />
      </button>
    </>
  )
}
