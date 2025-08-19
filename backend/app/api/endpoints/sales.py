from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.db.models.sale import Sale
from typing import List

router = APIRouter()

@router.get("/sales/{client_id}", response_model=List[Sale])
def get_sales_by_client_id(client_id: int, db: Session = Depends(get_db)):
    sales = db.query(Sale).filter(Sale.client_id == client_id).all()
    if not sales:
        raise HTTPException(status_code=404, detail="Sales not found for this client")
    return sales