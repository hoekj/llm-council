"""Configuration for the LLM Council."""

import os
from pathlib import Path
from dotenv import load_dotenv

# Project root is the parent of the backend/ package directory.
_PROJECT_ROOT = Path(__file__).resolve().parent.parent

# Load .env.local first (developer-specific secrets), then .env as a fallback.
# load_dotenv does not override already-set variables, so .env.local wins.
load_dotenv(_PROJECT_ROOT / ".env.local")
load_dotenv(_PROJECT_ROOT / ".env")

# OpenRouter API key
OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")

# Council members - list of OpenRouter model identifiers
COUNCIL_MODELS = [
    "openai/gpt-5.5",
    "google/gemini-3.1-pro-preview",
    "anthropic/claude-opus-4.8",
    "x-ai/grok-4.3",
]

# Chairman model - synthesizes final response
CHAIRMAN_MODEL = "anthropic/claude-opus-4.8"

# OpenRouter API endpoint
OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions"

# Data directory for conversation storage
DATA_DIR = "data/conversations"
