from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
import os, requests

# Load .env
load_dotenv()

app = FastAPI()

# Allow frontend (local + vercel)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",   # dev
        "http://localhost:3000",   # dev
        "https://brainburst-ai.vercel.app"  # prod
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



# ✅ JSONBin Config
JSONBIN_API_KEY = os.getenv("JSONBIN_API_KEY")
JSONBIN_BASE_URL = "https://api.jsonbin.io/v3"

if not JSONBIN_API_KEY:
    raise RuntimeError("❌ JSONBIN_API_KEY missing in .env")

HEADERS = {
    "Content-Type": "application/json",
    "X-Master-Key": JSONBIN_API_KEY
}

# Global var for index bin
INDEX_BIN_ID = os.getenv("JSONBIN_INDEX_BIN_ID")

# ✅ Ensure index bin exists
def ensure_index_bin():
    global INDEX_BIN_ID
    if INDEX_BIN_ID:
        return INDEX_BIN_ID

    # Try creating empty index bin {}
    res = requests.post(f"{JSONBIN_BASE_URL}/b", json={}, headers=HEADERS)
    if res.status_code not in (200, 201):
        raise RuntimeError(f"❌ Failed to create index bin: {res.text}")

    data = res.json()
    INDEX_BIN_ID = data["metadata"]["id"]
    print(f"✅ Created new index bin: {INDEX_BIN_ID}")
    return INDEX_BIN_ID

# ✅ Get current index mapping
def get_index():
    bin_id = ensure_index_bin()
    url = f"{JSONBIN_BASE_URL}/b/{bin_id}/latest"
    res = requests.get(url, headers=HEADERS)
    if res.status_code == 200:
        return res.json()["record"]
    return {}

# ✅ Update index mapping
def update_index(mapping: dict):
    bin_id = ensure_index_bin()
    url = f"{JSONBIN_BASE_URL}/b/{bin_id}"
    res = requests.put(url, json=mapping, headers=HEADERS)
    if res.status_code not in (200, 201):
        raise HTTPException(status_code=res.status_code, detail=res.text)

# ---------- Data Model ----------
class AIContent(BaseModel):
    topic: str
    introduction: str
    detailedExplanation: str
    codeExamples: list[str]
    useCases: list[str]
    goodPractices: list[str]
    conclusion: str

# ---------- Routes ----------

@app.get("/")
def root():
    return {"message": "✅ Backend running with JSONBin"}

@app.post("/save/")
def save_content(data: AIContent):
    index = get_index()
    topic_key = data.topic.replace(" ", "_").lower()

    # If topic already exists → update bin
    if topic_key in index:
        bin_id = index[topic_key]
        url = f"{JSONBIN_BASE_URL}/b/{bin_id}"
        res = requests.put(url, json=data.dict(), headers=HEADERS)
    else:
        # Create new bin for this topic
        res = requests.post(f"{JSONBIN_BASE_URL}/b", json=data.dict(), headers=HEADERS)
        if res.status_code in (200, 201):
            bin_id = res.json()["metadata"]["id"]
            index[topic_key] = bin_id
            update_index(index)

    if res.status_code not in (200, 201):
        raise HTTPException(status_code=res.status_code, detail=res.text)

    return {"message": f"✅ Content saved for {data.topic}"}

@app.get("/read/{topic}")
def read_content(topic: str):
    index = get_index()
    topic_key = topic.replace(" ", "_").lower()

    if topic_key not in index:
        raise HTTPException(status_code=404, detail="❌ Topic not found in index")

    bin_id = index[topic_key]
    url = f"{JSONBIN_BASE_URL}/b/{bin_id}/latest"
    res = requests.get(url, headers=HEADERS)

    if res.status_code != 200:
        raise HTTPException(status_code=res.status_code, detail=res.text)

    return res.json()["record"]
