from fastapi import FastAPI, HTTPException, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from services.video_service import download_video, get_video_info
from services.gemini_service import analyze_video
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Allow frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class VideoRequest(BaseModel):
    url: str

@app.get("/")
def read_root():
    return {"message": "Director's Cut API is running"}

@app.post("/api/analyze")
async def analyze_video_endpoint(request: VideoRequest):
    try:
        # 1. Get Video Info
        video_info = get_video_info(request.url)
        
        # 2. Download Video (if not already cached/handled)
        # For Gemini, we need the file. 
        video_path = download_video(request.url)
        
        if not video_path:
             raise HTTPException(status_code=400, detail="Failed to download video")

        # 3. Analyze with Gemini
        analysis_result = analyze_video(video_path, video_info['title'])
        
        return {
            "video_info": video_info,
            "analysis": analysis_result
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
