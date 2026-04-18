import hashlib
import json
import os
from datetime import datetime
from typing import Optional, Dict, Any

class CacheManager:
    def __init__(self, cache_dir: str = "cache/"):
        self.cache_dir = cache_dir
        os.makedirs(cache_dir, exist_ok=True)
        os.makedirs(os.path.join(cache_dir, "metadata"), exist_ok=True)
        os.makedirs(os.path.join(cache_dir, "images"), exist_ok=True)
    
    def calculate_hash(self, file_bytes: bytes) -> str:
        """Calculate SHA-256 hash of file bytes"""
        return hashlib.sha256(file_bytes).hexdigest()
    
    def get_cached_result(self, file_hash: str) -> Optional[Dict[str, Any]]:
        """Check if result exists in cache"""
        metadata_path = os.path.join(self.cache_dir, "metadata", f"{file_hash}.json")
        
        if os.path.exists(metadata_path):
            with open(metadata_path, 'r') as f:
                return json.load(f)
        return None
    
    def save_to_cache(self, file_hash: str, result: Dict[str, Any]) -> None:
        """Save preprocessing result to local cache"""
        metadata_path = os.path.join(self.cache_dir, "metadata", f"{file_hash}.json")
        
        result['cached_at'] = datetime.now().isoformat()
        
        with open(metadata_path, 'w') as f:
            json.dump(result, f, indent=2)
    
    def save_image_to_cache(self, file_hash: str, image_name: str, image_bytes: bytes) -> str:
        """Save image to cache and return path"""
        image_path = os.path.join(self.cache_dir, "images", f"{file_hash}_{image_name}")
        
        with open(image_path, 'wb') as f:
            f.write(image_bytes)
        
        return image_path
    
    def get_image_from_cache(self, file_hash: str, image_name: str) -> Optional[bytes]:
        """Retrieve image from cache"""
        image_path = os.path.join(self.cache_dir, "images", f"{file_hash}_{image_name}")
        
        if os.path.exists(image_path):
            with open(image_path, 'rb') as f:
                return f.read()
        return None
    
    def clear_old_cache(self, max_age_days: int = 7) -> None:
        """Clear cache files older than max_age_days"""
        import time
        current_time = time.time()
        
        for folder in ['metadata', 'images']:
            folder_path = os.path.join(self.cache_dir, folder)
            for filename in os.listdir(folder_path):
                file_path = os.path.join(folder_path, filename)
                if os.path.getmtime(file_path) < current_time - (max_age_days * 86400):
                    os.remove(file_path)