from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os, json

app = FastAPI()

# ✅ Allow CORS (for frontend on localhost + Vercel)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173", 
        "http://localhost:3000", 
        "https://your-frontend.vercel.app"  # replace with your Vercel URL after deploy
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ Persistent storage directory for Render
STORAGE_DIR = "/opt/render/project/src/storage"

# Data model for structured AI content
class AIContent(BaseModel):
    topic: str
    introduction: str
    detailedExplanation: str
    codeExamples: list[str]
    useCases: list[str]
    goodPractices: list[str]
    conclusion: str

# ✅ Save AI content (JSON) to file
@app.post("/save/")
def save_content(data: AIContent):
    os.makedirs(STORAGE_DIR, exist_ok=True)
    safe_topic = data.topic.replace(" ", "_").lower()
    filename = f"{STORAGE_DIR}/{safe_topic}.json"

    with open(filename, "w", encoding="utf-8") as f:
        json.dump(data.dict(), f, indent=4, ensure_ascii=False)

    return {"message": "Content saved successfully!", "file_path": filename}

# ✅ Read AI content (JSON) from file
@app.get("/read/{topic}")
def read_content(topic: str):
    safe_topic = topic.replace(" ", "_").lower()
    filename = f"{STORAGE_DIR}/{safe_topic}.json"

    if not os.path.exists(filename):
        raise HTTPException(status_code=404, detail="File not found")

    with open(filename, "r", encoding="utf-8") as f:
        content = json.load(f)

    return content
