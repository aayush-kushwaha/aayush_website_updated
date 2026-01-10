const express = require('express')
const dotenv = require('dotenv')

dotenv.config()

const app = express()
app.use(express.json())

const SYSTEM_PROMPT =
  "You are Yoosh, a helpful assistant on Aayush Kushwaha's portfolio website. Be friendly, concise, and practical. Help with backend engineering, projects, resumes, and interview prep."

const MAX_MESSAGES = 20
const MAX_CONTENT_LENGTH = 2000
const REQUEST_TIMEOUT_MS = 15000
const MAX_TOKENS = Number.parseInt(process.env.DEEPSEEK_MAX_TOKENS || '512', 10)
const RATE_LIMIT_WINDOW_MS = Number.parseInt(process.env.RATE_LIMIT_WINDOW_MS || '60000', 10)
const RATE_LIMIT_MAX_REQUESTS = Number.parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '20', 10)

app.set('trust proxy', true)

const rateBuckets = new Map()

const PROFILE_SUMMARY =
  "Aayush Kushwaha is a backend-focused software engineer with strengths in scalable systems, API performance, and data pipelines. Experience: Software Engineer at DigitalPetro (Sep 2022-Mar 2025, Bengaluru) on IoT security/inventory systems using FastAPI, Redis, RabbitMQ; Student Mentor at JSpiders (Jul-Sep 2022) mentoring 200+ students on Python/db/frameworks and interview prep; Engineer Intern at DigiNirman (Aug 2021-Jun 2022, Nepal) on AI Robo Traffic, data annotation, automation scripts, and CRUD tools. Education: MS CS at University of Alabama at Birmingham (Aug 2025-Aug 2027); BTech CSSE at KIIT (Aug 2017-Aug 2021)."

const PROFILE_ANSWERS = [
  {
    keywords: ['experience', 'work', 'job', 'digitalpetro', 'jspiders', 'diginirman', 'intern'],
    reply:
      "Aayush has 2+ years as a Software Engineer at DigitalPetro (IoT security/inventory, FastAPI, Redis, RabbitMQ), mentored 200+ students at JSpiders, and interned at DigiNirman on AI Robo Traffic, data annotation, automation scripts, and CRUD tooling.",
  },
  {
    keywords: ['education', 'study', 'university', 'degree', 'btech', 'ms', 'uab', 'kiit'],
    reply:
      "Education: MS in Computer Science at the University of Alabama at Birmingham (Aug 2025-Aug 2027) and BTech in Computer Science and Systems Engineering at KIIT (Aug 2017-Aug 2021).",
  },
  {
    keywords: ['about', 'who are you', 'who is aayush', 'summary', 'profile', 'bio'],
    reply:
      "Aayush is a backend-focused software engineer known for scalable systems, API performance, and clean, reliable architectures, with a strong emphasis on practical problem-solving and collaboration.",
  },
]

function normalize(text) {
  return String(text || '')
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim()
}

function getLastUserMessage(messages) {
  for (let i = messages.length - 1; i >= 0; i -= 1) {
    if (messages[i]?.role === 'user') return messages[i].content
  }
  return ''
}

function answerFromProfile(question) {
  const normalized = normalize(question)
  if (!normalized) return null
  for (const entry of PROFILE_ANSWERS) {
    if (entry.keywords.some((keyword) => normalized.includes(keyword))) {
      return entry.reply
    }
  }
  return null
}

function rateLimit(req, res, next) {
  const now = Date.now()
  const ip = req.ip || 'unknown'
  const entry = rateBuckets.get(ip) || { count: 0, resetAt: now + RATE_LIMIT_WINDOW_MS }

  if (now > entry.resetAt) {
    entry.count = 0
    entry.resetAt = now + RATE_LIMIT_WINDOW_MS
  }

  entry.count += 1
  rateBuckets.set(ip, entry)

  if (entry.count > RATE_LIMIT_MAX_REQUESTS) {
    return res.status(429).json({ error: 'Too many requests' })
  }

  return next()
}

app.post('/api/yoosh/chat', rateLimit, async (req, res) => {
  if (!process.env.DEEPSEEK_API_KEY) {
    return res.status(500).json({ error: 'Server misconfigured' })
  }

  const { messages } = req.body || {}
  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: 'messages must be a non-empty array' })
  }
  if (messages.length > MAX_MESSAGES) {
    return res.status(400).json({ error: 'messages exceeds max length' })
  }

  for (const message of messages) {
    if (
      !message ||
      (message.role !== 'user' && message.role !== 'assistant') ||
      typeof message.content !== 'string'
    ) {
      return res.status(400).json({ error: 'invalid message format' })
    }
    if (message.content.length > MAX_CONTENT_LENGTH) {
      return res.status(400).json({ error: 'message content too long' })
    }
  }

  const lastUserMessage = getLastUserMessage(messages)
  const localReply = answerFromProfile(lastUserMessage)
  if (localReply) {
    return res.json({ reply: localReply })
  }

  const needsProfileContext = /aayush|about|experience|education|resume|background|bio/.test(
    normalize(lastUserMessage)
  )

  const outboundMessages = [
    { role: 'system', content: SYSTEM_PROMPT },
    ...(needsProfileContext ? [{ role: 'system', content: PROFILE_SUMMARY }] : []),
    ...messages,
  ]

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS)

  try {
    const response = await fetch('https://api.deepseek.com/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.DEEPSEEK_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: outboundMessages,
        temperature: 0.7,
        max_tokens: Number.isFinite(MAX_TOKENS) ? MAX_TOKENS : 512,
      }),
      signal: controller.signal,
    })

    if (!response.ok) {
      throw new Error(`DeepSeek error: ${response.status}`)
    }

    const data = await response.json()
    const reply = data?.choices?.[0]?.message?.content
    if (!reply) {
      throw new Error('Missing assistant response')
    }

    return res.json({ reply })
  } catch (error) {
    if (error && error.name === 'AbortError') {
      return res.status(504).json({ error: 'Upstream timeout' })
    }
    return res.status(502).json({ error: 'Upstream error' })
  } finally {
    clearTimeout(timeout)
  }
})

const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 5055
app.listen(port, () => {
  console.log(`Yoosh API listening on port ${port}`)
})
