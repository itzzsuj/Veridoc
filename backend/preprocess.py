import io
import fitz  # PyMuPDF
import cv2
import numpy as np
from PIL import Image, ImageChops, ImageEnhance
import easyocr
from langdetect import detect
from typing import Dict, Any, List
import os

from cache import CacheManager
from config import config


class DocumentPreprocessor:
    def __init__(self):
        """Initialize preprocessor with OCR and cache"""
        print("🔄 Initializing Document Preprocessor...")
        
        # Initialize EasyOCR with English first (always works)
        try:
            self.reader = easyocr.Reader(['en'], gpu=False)
            print("✅ EasyOCR initialized with English")
            self.supported_langs = ['en']
        except Exception as e:
            print(f"⚠️ EasyOCR initialization error: {e}")
            self.reader = None
            self.supported_langs = []
        
        # Initialize cache
        self.cache = CacheManager(config.CACHE_DIR)
        print("✅ Cache initialized")
    
    def process(self, file_bytes: bytes, filename: str) -> Dict[str, Any]:
        """Main preprocessing pipeline"""
        
        # Step 1: Calculate hash
        file_hash = self.cache.calculate_hash(file_bytes)
        print(f"📊 File hash: {file_hash[:16]}...")
        
        # Step 2: Check cache
        cached = self.cache.get_cached_result(file_hash)
        if cached:
            print("✅ Cache hit! Returning cached result")
            cached['cached'] = True
            return cached
        
        print("🔄 Cache miss. Processing document...")
        
        # Step 3: Convert to PNG
        if filename.lower().endswith('.pdf'):
            png_bytes = self._pdf_to_png(file_bytes)
        else:
            png_bytes = file_bytes
        
        # Save raw image to cache
        raw_image_path = self.cache.save_image_to_cache(file_hash, "raw.png", png_bytes)
        
        # Convert to PIL Image for processing
        image = Image.open(io.BytesIO(png_bytes))
        
        # Step 4: Generate edge map
        edge_map_bytes = self._generate_edge_map(image)
        edge_map_path = self.cache.save_image_to_cache(file_hash, "edge_map.png", edge_map_bytes)
        
        # Step 5: Generate ELA diff
        ela_bytes = self._generate_ela(image)
        ela_path = self.cache.save_image_to_cache(file_hash, "ela_diff.png", ela_bytes)
        
        # Step 6: Extract text with OCR
        ocr_text = ""
        ocr_confidence = 0.0
        
        if self.reader is not None:
            try:
                ocr_results = self._extract_text(png_bytes)
                if ocr_results:
                    ocr_text = " ".join([item[1] for item in ocr_results])
                    confidences = [item[2] for item in ocr_results if len(item) > 2]
                    ocr_confidence = sum(confidences) / len(confidences) if confidences else 0.0
            except Exception as e:
                print(f"⚠️ OCR extraction failed: {e}")
                ocr_text = "[OCR extraction failed]"
        else:
            ocr_text = "[OCR not available]"
        
        # Step 7: Detect language
        detected_language = self._detect_language(ocr_text)
        
        # Step 8: Build result
        result = {
            'case_id': file_hash,
            'file_hash': file_hash,
            'filename': filename,
            'cached': False,
            'detected_language': detected_language,
            'ocr_text': ocr_text[:1000] + "..." if len(ocr_text) > 1000 else ocr_text,
            'full_ocr_text': ocr_text,
            'ocr_confidence': ocr_confidence,
            'status': 'preprocessing_complete',
            'artifacts': {
                'raw_image_path': raw_image_path,
                'edge_map_path': edge_map_path,
                'ela_diff_path': ela_path
            }
        }
        
        # Save to cache
        self.cache.save_to_cache(file_hash, result)
        print("✅ Preprocessing complete. Result cached.")
        
        return result
    
    def _pdf_to_png(self, pdf_bytes: bytes, dpi: int = 300) -> bytes:
        """Convert PDF first page to PNG"""
        pdf_document = fitz.open(stream=pdf_bytes, filetype="pdf")
        page = pdf_document[0]
        
        # Calculate zoom for DPI
        zoom = dpi / 72
        mat = fitz.Matrix(zoom, zoom)
        
        # Render to pixmap
        pix = page.get_pixmap(matrix=mat)
        img_bytes = pix.tobytes("png")
        
        pdf_document.close()
        return img_bytes
    
    def _generate_edge_map(self, image: Image.Image) -> bytes:
        """Generate Canny edge detection map"""
        # Convert PIL to OpenCV
        img_array = np.array(image.convert('RGB'))
        img_bgr = cv2.cvtColor(img_array, cv2.COLOR_RGB2BGR)
        gray = cv2.cvtColor(img_bgr, cv2.COLOR_BGR2GRAY)
        
        # Apply Gaussian blur to reduce noise
        blurred = cv2.GaussianBlur(gray, (5, 5), 0)
        
        # Canny edge detection
        edges = cv2.Canny(blurred, 50, 150)
        
        # Convert back to bytes
        success, buffer = cv2.imencode('.png', edges)
        return buffer.tobytes()
    
    def _generate_ela(self, image: Image.Image, quality: int = 90) -> bytes:
        """Generate Error Level Analysis image"""
        # Save image at specified quality
        temp_buffer = io.BytesIO()
        
        # Convert to RGB if necessary
        if image.mode != 'RGB':
            image = image.convert('RGB')
            
        image.save(temp_buffer, format='JPEG', quality=quality)
        temp_buffer.seek(0)
        
        # Reload compressed image
        compressed = Image.open(temp_buffer)
        
        # Calculate difference
        diff = ImageChops.difference(image, compressed)
        
        # Enhance difference for visibility
        extrema = diff.getextrema()
        if extrema:
            max_diff = max([ex[1] for ex in extrema if ex[1] is not None]) if extrema else 1
        else:
            max_diff = 1
        scale = 255.0 / max_diff if max_diff != 0 else 1
        
        # Apply scaling to make differences more visible
        diff = ImageEnhance.Brightness(diff).enhance(scale)
        
        # Convert to bytes
        output_buffer = io.BytesIO()
        diff.save(output_buffer, format='PNG')
        return output_buffer.getvalue()
    
    def _extract_text(self, image_bytes: bytes) -> List:
        """Extract text using EasyOCR"""
        if self.reader is None:
            return []
        
        # Convert bytes to numpy array
        nparr = np.frombuffer(image_bytes, np.uint8)
        img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
        
        # Perform OCR
        results = self.reader.readtext(img)
        return results
    
    def _detect_language(self, text: str) -> str:
        """Detect language from text sample"""
        if not text or len(text) < 10:
            return 'en'
        
        # Common Hindi characters for fallback detection
        hindi_chars = set('ऀँंःअआइईउऊऋऌऍऎएऐऑऒओऔकखगघङचछजझञटठडढणतथदधनपफबभमयरलळवशषसह')
        tamil_chars = set('அஆஇஈஉஊஎஏஐஒஓஔகஙசஜஞடணதநனபமயரறலளழவஷஸஹ')
        kannada_chars = set('ಅಆಇಈಉಊಋಎಏಐಒಓಔಕಖಗಘಙಚಛಜಝಞಟಠಡಢಣತಥದಧನಪಫಬಭಮಯರಱಲಳವಶಷಸಹ')
        telugu_chars = set('అఆఇఈఉఊఋఌఎఏఐఒఓఔకఖగఘఙచఛజఝఞటఠడఢణతథదధనపఫబభమయరఱలళవశషసహ')
        
        text_sample = text[:500]
        
        # Check for Indian scripts first
        if any(c in hindi_chars for c in text_sample):
            return 'hi'
        if any(c in tamil_chars for c in text_sample):
            return 'ta'
        if any(c in kannada_chars for c in text_sample):
            return 'kn'
        if any(c in telugu_chars for c in text_sample):
            return 'te'
        
        # Fallback to langdetect
        try:
            sample = text[:200] if len(text) > 200 else text
            lang = detect(sample)
            
            # Map to supported languages
            supported = {'ta': 'ta', 'hi': 'hi', 'kn': 'kn', 'te': 'te', 'en': 'en'}
            return supported.get(lang, 'en')
        except:
            return 'en'
    
    def get_cache_stats(self) -> Dict[str, Any]:
        """Get cache statistics"""
        metadata_dir = os.path.join(config.CACHE_DIR, "metadata")
        images_dir = os.path.join(config.CACHE_DIR, "images")
        
        metadata_count = len([f for f in os.listdir(metadata_dir) if f.endswith('.json')]) if os.path.exists(metadata_dir) else 0
        images_count = len([f for f in os.listdir(images_dir) if f.endswith('.png')]) if os.path.exists(images_dir) else 0
        
        return {
            'cached_documents': metadata_count,
            'cached_images': images_count,
            'cache_dir': config.CACHE_DIR
        }