from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware

from PIL import Image
import numpy as np
import cv2
import io

from ai.detector import detect_face, get_face_shape
from ai.recommender import recommend

app = FastAPI(title="TrimAI")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home():
    return {
        "status": "Backend Running"
    }


@app.post("/analyze")
async def analyze(file: UploadFile = File(...)):

    try:
        image_bytes = await file.read()

        image = Image.open(io.BytesIO(image_bytes)).convert("RGB")

        image = np.array(image)

        image = cv2.cvtColor(image, cv2.COLOR_RGB2BGR)

        print("Image Loaded")

        face = detect_face(image)

        print("Face Object:", face)

        if face is None:
            print("No Face Detected")
            return {
                "success": False,
                "message": "No face detected"
            }

        face_shape = get_face_shape(face)

        print("Face Shape:", face_shape)

        result = recommend(face_shape)

        print("Recommendation:", result)

        response = {
            "success": True,
            "faceShape": face_shape,
            "bestHaircut": result["best"],
            "recommendations": result["recommendations"]
        }

        print("Response:", response)

        return response

    except Exception as e:
        print("ERROR:", str(e))
        return {
            "success": False,
            "message": str(e)
        }


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(
        "app:app",
        host="127.0.0.1",
        port=8000,
        reload=True
    )