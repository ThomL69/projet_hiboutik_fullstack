from fastapi import APIRouter

router = APIRouter()

from .endpoints import clients, sales

router.include_router(clients.router, prefix="/clients", tags=["clients"])
router.include_router(sales.router, prefix="/sales", tags=["sales"])