import { useEffect, useRef, useState } from 'react'

type ChatMessage = {
  role: 'user' | 'assistant'
  content: string
}

const STORAGE_KEY = 'yoosh_chat_history'
const GREETING = "Hey, I'm Yoosh. What are you working on?"

export default function YooshChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const hasGreetedRef = useRef(false)
  const listRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (!stored) return
      const parsed: unknown = JSON.parse(stored)

      if (Array.isArray(parsed)) {
        const safeParsed: ChatMessage[] = parsed
          .filter(
            (m): m is { role: unknown; content: unknown } =>
              typeof m === 'object' && m !== null && 'role' in m && 'content' in m
          )
          .map((m) => ({
            role: m.role === 'user' || m.role === 'assistant' ? m.role : 'assistant',
            content: typeof m.content === 'string' ? m.content : String(m.content),
          }))

        setMessages(safeParsed)
        if (safeParsed.length > 0) hasGreetedRef.current = true
      }
    } catch (err) {
      console.warn('Failed to load Yoosh chat history', err)
    }
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages))
    } catch (err) {
      console.warn('Failed to save Yoosh chat history', err)
    }
  }, [messages])

  useEffect(() => {
    if (!isOpen) return
    if (messages.length === 0 && !hasGreetedRef.current) {
      hasGreetedRef.current = true
      setMessages([{ role: 'assistant', content: GREETING }])
    }
  }, [isOpen, messages.length])

  useEffect(() => {
    if (!isOpen) return
    const list = listRef.current
    if (list) list.scrollTop = list.scrollHeight
  }, [isOpen, messages, isLoading])

  async function sendMessage() {
    const content = input.trim()
    if (!content || isLoading) return

    const nextMessages: ChatMessage[] = [...messages, { role: 'user', content }]
    setMessages(nextMessages)

    setInput('')
    setError('')
    setIsLoading(true)

    try {
      const res = await fetch('/api/yoosh/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: nextMessages }),
      })
      if (!res.ok) throw new Error('Request failed')

      const data: unknown = await res.json()
      const reply =
        typeof (data as any)?.reply === 'string' ? (data as any).reply : String((data as any)?.reply ?? '')

      if (!reply) throw new Error('Invalid response')

      setMessages([...nextMessages, { role: 'assistant', content: reply }])
    } catch (err) {
      console.error('Yoosh chat failed', err)
      setError('Yoosh is unavailable right now. Try again soon.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      {isOpen && (
        <div className="fixed bottom-[92px] right-5 z-50 h-[440px] max-h-[70vh] w-[360px] max-w-[calc(100vw-32px)] rounded-2xl border border-gray-800 bg-gray-950/95 shadow-2xl backdrop-blur sm:h-[480px]">
          <div className="flex items-center justify-between border-b border-gray-800 px-4 py-3">
            <span className="text-sm font-semibold text-gray-100">Yoosh</span>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="rounded-md p-1 text-gray-400 transition hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-accent/40"
              aria-label="Close Yoosh chat"
            >
              ✕
            </button>
          </div>

          <div className="flex h-full flex-col">
            <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-3 text-sm">
              {messages.map((message, index) => (
                <div
                  key={`${message.role}-${index}`}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-3 py-2 leading-relaxed ${
                      message.role === 'user' ? 'bg-accent text-white' : 'bg-gray-800 text-gray-100'
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="rounded-2xl bg-gray-800 px-3 py-2 text-gray-200">Thinking...</div>
                </div>
              )}
            </div>

            {error && (
              <div className="px-4 pb-2 text-xs text-red-400" role="status">
                {error}
              </div>
            )}

            <div className="border-t border-gray-800 px-3 py-3">
              <div className="flex items-end gap-2">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault()
                      sendMessage()
                    }
                  }}
                  rows={2}
                  placeholder="Type a message"
                  className="flex-1 resize-none rounded-lg border border-gray-700 bg-gray-900 px-3 py-2 text-sm text-gray-100 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-accent/40"
                />
                <button
                  type="button"
                  onClick={sendMessage}
                  disabled={isLoading}
                  className="btn h-10 px-4 text-sm disabled:cursor-not-allowed disabled:opacity-60"
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gray-900 shadow-xl transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-accent/40"
        aria-label="Open Yoosh chat"
      >
        <img src="/yoosh.png" alt="Yoosh" className="h-9 w-9" />
      </button>
    </>
  )
}

