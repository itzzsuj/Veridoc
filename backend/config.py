import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    # Firebase Firestore (no Storage needed)
    FIREBASE_CREDENTIALS = os.getenv("FIREBASE_CREDENTIALS", "firebase-key.json")
    
    # Cache settings
    CACHE_DIR = "cache/"
    MAX_CACHE_SIZE_MB = 500
    
    # OCR settings
    OCR_LANGUAGES = ['en', 'ta', 'hi', 'kn', 'te']
    
    # Preprocessing settings
    PDF_DPI = 300
    MAX_FILE_SIZE_MB = 20
    
    # Server settings
    HOST = os.getenv("HOST", "0.0.0.0")
    PORT = int(os.getenv("PORT", 8000))
    
    # CORS
    ALLOWED_ORIGINS = [
        "http://localhost:3000",
        "http://localhost:3001",
        "http://127.0.0.1:3000",
    ]

# Create a single instance to import
config = Config()