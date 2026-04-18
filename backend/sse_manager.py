import asyncio
import json
from typing import Dict, Any, List
from datetime import datetime

class SSEManager:
    def __init__(self):
        self.active_connections: Dict[str, List[asyncio.Queue]] = {}
    
    def register_connection(self, case_id: str) -> asyncio.Queue:
        """Register new SSE connection for a case"""
        if case_id not in self.active_connections:
            self.active_connections[case_id] = []
        
        queue = asyncio.Queue()
        self.active_connections[case_id].append(queue)
        return queue
    
    def unregister_connection(self, case_id: str, queue: asyncio.Queue):
        """Remove SSE connection"""
        if case_id in self.active_connections:
            if queue in self.active_connections[case_id]:
                self.active_connections[case_id].remove(queue)
            
            if not self.active_connections[case_id]:
                del self.active_connections[case_id]
    
    async def send_event(self, case_id: str, event_type: str, data: Dict[str, Any]):
        """Send event to all connections for a case"""
        if case_id not in self.active_connections:
            return
        
        event_data = {
            'event': event_type,
            'data': json.dumps({
                **data,
                'timestamp': datetime.now().isoformat()
            })
        }
        
        dead_queues = []
        for queue in self.active_connections[case_id]:
            try:
                await queue.put(event_data)
            except:
                dead_queues.append(queue)
        
        # Clean up dead connections
        for queue in dead_queues:
            self.unregister_connection(case_id, queue)
    
    async def send_progress(self, case_id: str, step: str, progress: int, message: str = ""):
        """Send progress update"""
        await self.send_event(case_id, 'progress', {
            'step': step,
            'progress': progress,
            'message': message
        })
    
    async def send_agent_result(self, case_id: str, agent_name: str, result: Dict[str, Any]):
        """Send individual agent result"""
        await self.send_event(case_id, 'agent_complete', {
            'agent': agent_name,
            'result': result
        })
    
    async def send_complete(self, case_id: str, verdict: str, confidence: float):
        """Send final completion event"""
        await self.send_event(case_id, 'complete', {
            'verdict': verdict,
            'confidence': confidence
        })

# Global SSE manager instance
sse_manager = SSEManager()