import os
from openai import OpenAI

API_KEY = os.getenv("OPENROUTER_API_KEY")

client = OpenAI(
    base_url="https://openrouter.ai/api/v1",
    api_key=API_KEY
)

MODEL_NAME = "mistralai/mistral-7b-instruct"  
# fast, cheap, good for projects

print("Using OpenRouter model:", MODEL_NAME)
