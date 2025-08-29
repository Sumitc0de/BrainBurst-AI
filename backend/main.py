from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from pydantic import BaseModel
import os, requests

# Load .env for local development
load_dotenv()

app = FastAPI()

# ✅ Allow CORS (local + Vercel frontend)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:3000",
        "https://your-frontend.vercel.app"  # replace with actual Vercel URL
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ JSONBin config
JSONBIN_API_KEY = os.getenv("JSONBIN_API_KEY")
JSONBIN_BASE_URL = "https://api.jsonbin.io/v3"

# Data model
class AIContent(BaseModel):
    topic: str
    introduction: str
    detailedExplanation: str
    codeExamples: list[str]
    useCases: list[str]
    goodPractices: list[str]
    conclusion: str

# ✅ Save AI content (JSONBin: one bin per topic)
@app.post("/save/")
def save_content(data: AIContent):
    if not JSONBIN_API_KEY:
        raise HTTPException(status_code=500, detail="JSONBIN_API_KEY not set")

    headers = {
        "Content-Type": "application/json",
        "X-Master-Key": JSONBIN_API_KEY
    }

    # Use topic name as bin "id" (safe name)
    bin_id = data.topic.replace(" ", "_").lower()

    # Upsert: create or update
    url = f"{JSONBIN_BASE_URL}/b/{bin_id}"
    response = requests.put(url, json=data.dict(), headers=headers)

    if response.status_code not in (200, 201):
        raise HTTPException(status_code=response.status_code, detail=response.text)

    return {"message": "Content saved successfully!"}

# ✅ Read AI content
@app.get("/read/{topic}")
def read_content(topic: str):
    if not JSONBIN_API_KEY:
        raise HTTPException(status_code=500, detail="JSONBIN_API_KEY not set")

    headers = {"X-Master-Key": JSONBIN_API_KEY}
    bin_id = topic.replace(" ", "_").lower()
    url = f"{JSONBIN_BASE_URL}/b/{bin_id}/latest"

    response = requests.get(url, headers=headers)

    if response.status_code == 404:
        raise HTTPException(status_code=404, detail="Topic not found")

    if response.status_code != 200:
        raise HTTPException(status_code=response.status_code, detail=response.text)

    return response.json()["record"]
