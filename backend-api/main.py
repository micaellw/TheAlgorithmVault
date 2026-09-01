from fastapi import FastAPI, HTTPException
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
import os
import urllib.parse

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DOWNLOAD_DIR = os.path.join(BASE_DIR, "FileForDownload")

@app.get("/download")
def download_file(file: str):
    # ✅ decode URL
    file = urllib.parse.unquote(file)

    file_path = os.path.join(DOWNLOAD_DIR, file)

    print("BASE_DIR =", BASE_DIR)
    print("DOWNLOAD_DIR =", DOWNLOAD_DIR)
    print("FILES =", os.listdir(DOWNLOAD_DIR))

    if not os.path.exists(file_path):
        raise HTTPException(status_code=404, detail="File not found")

    return FileResponse(
        path=file_path,
        filename=file,
        media_type="application/octet-stream"
    )
print("All folders here:", os.listdir(BASE_DIR))
