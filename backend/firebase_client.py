import firebase_admin
from firebase_admin import credentials, firestore
from typing import Dict, Any, Optional
from datetime import datetime

class FirebaseClient:
    def __init__(self, credentials_path: str = "firebase-key.json"):
        self.db = None
        self.initialize_firebase(credentials_path)
    
    def initialize_firebase(self, credentials_path: str) -> None:
        """Initialize Firebase Admin SDK"""
        try:
            cred = credentials.Certificate(credentials_path)
            firebase_admin.initialize_app(cred)
            self.db = firestore.client()
            print("✅ Firebase initialized successfully")
        except Exception as e:
            print(f"⚠️ Firebase initialization failed: {e}")
            print("⚠️ Running in offline mode (local cache only)")
            self.db = None
    
    def get_case(self, case_id: str) -> Optional[Dict[str, Any]]:
        """Retrieve case from Firestore"""
        if not self.db:
            return None
        
        try:
            doc_ref = self.db.collection('cases').document(case_id)
            doc = doc_ref.get()
            if doc.exists:
                return doc.to_dict()
            return None
        except Exception as e:
            print(f"Error getting case: {e}")
            return None
    
    def save_case(self, case_id: str, data: Dict[str, Any]) -> bool:
        """Save case to Firestore"""
        if not self.db:
            return False
        
        try:
            data['updated_at'] = datetime.now()
            doc_ref = self.db.collection('cases').document(case_id)
            doc_ref.set(data, merge=True)
            print(f"✅ Case {case_id[:8]} saved to Firestore")
            return True
        except Exception as e:
            print(f"Error saving case: {e}")
            return False
    
    def update_verdict(self, case_id: str, verdict: str, confidence: float) -> bool:
        """Update case with final verdict"""
        if not self.db:
            return False
        
        try:
            doc_ref = self.db.collection('cases').document(case_id)
            doc_ref.update({
                'verdict': verdict,
                'confidence': confidence,
                'completed_at': datetime.now(),
                'status': 'completed'
            })
            return True
        except Exception as e:
            print(f"Error updating verdict: {e}")
            return False
    
    def save_agent_result(self, case_id: str, agent_name: str, result: Dict[str, Any]) -> bool:
        """Save individual agent result"""
        if not self.db:
            return False
        
        try:
            doc_ref = self.db.collection('cases').document(case_id)
            doc_ref.update({
                f'agent_results.{agent_name}': result,
                f'agent_results.{agent_name}_completed_at': datetime.now()
            })
            return True
        except Exception as e:
            print(f"Error saving agent result: {e}")
            return False