from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse, StreamingResponse
from sse_starlette.sse import EventSourceResponse
import asyncio
import json
from typing import Optional

from preprocess import DocumentPreprocessor
from firebase_client import FirebaseClient
from sse_manager import sse_manager
from config import config

# Initialize FastAPI
app = FastAPI(title="VeriDoc AI - Layer 1 Intake Agent")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=config.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize services
preprocessor = DocumentPreprocessor()
firebase = FirebaseClient(config.FIREBASE_CREDENTIALS)

@app.get("/")
async def root():
    return {
        "service": "VeriDoc AI - Layer 1 Intake Agent",
        "status": "running",
        "version": "1.0.0"
    }

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

@app.post("/upload")
async def upload_document(
    file: UploadFile = File(...),
    language: str = Form("auto")
):
    """
    Upload document for preprocessing.
    Returns case_id and triggers background agents.
    """
    
    # Validate file size
    file_bytes = await file.read()
    if len(file_bytes) > config.MAX_FILE_SIZE_MB * 1024 * 1024:
        return JSONResponse(
            status_code=400,
            content={"error": f"File size exceeds {config.MAX_FILE_SIZE_MB}MB limit"}
        )
    
    # Send initial progress
    await sse_manager.send_progress(
        "pending", 
        "upload_received", 
        5, 
        f"Received {file.filename}"
    )
    
    # Process document
    result = preprocessor.process(file_bytes, file.filename)
    case_id = result['case_id']
    
    # Send preprocessing progress
    await sse_manager.send_progress(
        case_id,
        "preprocessing_complete",
        100,
        f"Document preprocessed. Language: {result['detected_language']}"
    )
    
    # Save to Firebase (if available)
    firebase.save_case(case_id, {
        'filename': result['filename'],
        'detected_language': result['detected_language'],
        'ocr_text': result['full_ocr_text'],
        'status': 'preprocessing_complete',
        'artifacts': result['artifacts']
    })
    
    # Trigger forensic agents in background
    asyncio.create_task(trigger_forensic_agents(case_id, result))
    
    return JSONResponse(content={
        'case_id': case_id,
        'file_hash': result['file_hash'],
        'filename': result['filename'],
        'cached': result['cached'],
        'detected_language': result['detected_language'],
        'ocr_text_preview': result['ocr_text'][:200] + "..." if len(result['ocr_text']) > 200 else result['ocr_text'],
        'status': 'processing_started',
        'next_agents': ['structural', 'visual', 'stamp_cnn', 'vision_llm', 'embeddings']
    })

@app.get("/stream/{case_id}")
async def stream_events(case_id: str):
    """SSE endpoint for real-time updates"""
    
    async def event_generator():
        queue = sse_manager.register_connection(case_id)
        
        try:
            # Send initial connection message
            yield {
                "event": "connected",
                "data": json.dumps({
                    "case_id": case_id,
                    "message": "Stream connected"
                })
            }
            
            # Keep connection alive and send queued events
            while True:
                try:
                    # Wait for event with timeout
                    event = await asyncio.wait_for(queue.get(), timeout=30.0)
                    yield event
                except asyncio.TimeoutError:
                    # Send heartbeat
                    yield {
                        "event": "heartbeat",
                        "data": json.dumps({"timestamp": "alive"})
                    }
                    
        except asyncio.CancelledError:
            pass
        finally:
            sse_manager.unregister_connection(case_id, queue)
    
    return EventSourceResponse(event_generator())

async def trigger_forensic_agents(case_id: str, preprocess_result: dict):
    """
    Trigger all 5 forensic agents in parallel.
    (Week 2-4 implementation)
    """
    
    await sse_manager.send_progress(
        case_id,
        "agents_starting",
        0,
        "Starting 5 forensic agents..."
    )
    
    # Week 2-4: Replace with actual agent calls
    agents = [
        "structural_agent",
        "visual_agent", 
        "stamp_cnn_agent",
        "vision_llm_agent",
        "embedding_agent"
    ]
    
    for agent in agents:
        await asyncio.sleep(0.5)  # Simulate work
        await sse_manager.send_progress(
            case_id,
            f"{agent}_complete",
            20,
            f"{agent} completed (placeholder)"
        )
    
    await sse_manager.send_complete(case_id, "pending_review", 0.65)

@app.get("/case/{case_id}")
async def get_case(case_id: str):
    """Retrieve case details"""
    
    # Check local cache first
    cached = preprocessor.cache.get_cached_result(case_id)
    if cached:
        return cached
    
    # Check Firebase
    firebase_result = firebase.get_case(case_id)
    if firebase_result:
        return firebase_result
    
    return JSONResponse(
        status_code=404,
        content={"error": "Case not found"}
    )

@app.get("/image/{case_id}/{image_type}")
async def get_image(case_id: str, image_type: str):
    """Retrieve cached image (raw, edge_map, ela_diff)"""
    
    image_bytes = preprocessor.cache.get_image_from_cache(case_id, f"{image_type}.png")
    
    if image_bytes:
        from fastapi.responses import Response
        return Response(content=image_bytes, media_type="image/png")
    
    return JSONResponse(
        status_code=404,
        content={"error": "Image not found"}
    )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "main:app",
        host=config.HOST,
        port=config.PORT,
        reload=True
    )