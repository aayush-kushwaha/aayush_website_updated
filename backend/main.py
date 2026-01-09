import logging
import os
from typing import List, Literal

import httpx
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

logger = logging.getLogger("yoosh")

DEEPSEEK_API_URL = "https://api.deepseek.com/chat/completions"
SYSTEM_PROMPT = (
    "You are Yoosh, a helpful, concise assistant embedded on Aayush Kushwaha's "
    "portfolio website. Help with projects, backend engineering, resumes, and "
    "interview prep. Keep responses friendly and practical."
)


class ChatMessage(BaseModel):
    role: Literal["user", "assistant", "system"]
    content: str


class ChatRequest(BaseModel):
    messages: List[ChatMessage]


class ChatResponse(BaseModel):
    reply: str


app = FastAPI()


@app.post("/api/yoosh/chat", response_model=ChatResponse)
async def yoosh_chat(payload: ChatRequest) -> ChatResponse:
    if not payload.messages:
        raise HTTPException(status_code=400, detail="messages must be a non-empty list")

    api_key = os.getenv("DEEPSEEK_API_KEY")
    if not api_key:
        logger.error("DEEPSEEK_API_KEY is not set")
        raise HTTPException(status_code=500, detail="Yoosh is not configured")

    messages = [{"role": "system", "content": SYSTEM_PROMPT}]
    messages.extend([message.dict() for message in payload.messages])

    body = {
        "model": "deepseek-chat",
        "messages": messages,
        "temperature": 0.7,
    }
    headers = {"Authorization": f"Bearer {api_key}"}

    try:
        async with httpx.AsyncClient(timeout=20.0) as client:
            response = await client.post(DEEPSEEK_API_URL, json=body, headers=headers)
        if response.status_code != 200:
            logger.error("DeepSeek error %s: %s", response.status_code, response.text)
            raise HTTPException(
                status_code=502,
                detail="Yoosh is unavailable right now. Try again soon.",
            )
        data = response.json()
    except httpx.TimeoutException:
        raise HTTPException(
            status_code=504, detail="Yoosh took too long to respond. Try again."
        )
    except HTTPException:
        raise
    except Exception:
        logger.exception("DeepSeek request failed")
        raise HTTPException(
            status_code=502,
            detail="Yoosh is unavailable right now. Try again soon.",
        )

    try:
        reply = data["choices"][0]["message"]["content"]
    except (KeyError, IndexError, TypeError):
        logger.error("Unexpected DeepSeek response shape: %s", data)
        raise HTTPException(
            status_code=502,
            detail="Yoosh had trouble responding. Try again.",
        )

    return ChatResponse(reply=reply)
