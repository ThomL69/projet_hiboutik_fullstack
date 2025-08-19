from fastapi import APIRouter, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List

from app.db.models.client import Client
from app.db.session import get_db

myquery = ""
router = APIRouter()

@router.get("/clients/", response_model=List[Client])
def get_clients_by_name(name: str = Query(..., min_length=1), db: Session = next(get_db())):
    clients = db.query(Client).filter(Client.name.ilike(f"%{name}%")).all()
    if not clients:
        raise HTTPException(status_code=404, detail="Clients not found")
    return clients