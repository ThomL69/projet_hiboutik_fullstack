# from fastapi import FastAPI
# from fastapi.middleware.cors import CORSMiddleware
# from app.api.endpoints import clients, sales
# from app.core.config import settings

# app = FastAPI()

# # CORS middleware
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],  # Adjust this as needed for production
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# # Include API routes
# app.include_router(clients.router, prefix="/clients", tags=["clients"])
# app.include_router(sales.router, prefix="/sales", tags=["sales"])

# @app.get("/")
# def read_root():
#     return {"message": "Welcome to the FastAPI application!"}

from fastapi import FastAPI, HTTPException, Query
import app.hiboutik_client as hibou

app = FastAPI(title="Hiboutik Proxy API")


@app.get("/clients/")
def list_clients(nom: str | None = Query(default=None)):
    try:
        return hibou.get_clients(nom)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/clients/{client_id}/ventes")
def ventes_client(client_id: int, page: int = 1, limit: int = 5):
    try:
        ventes = hibou.get_sales(client_id)
        start = (page - 1) * limit
        end = start + limit
        return ventes[start:end]
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/ventes/cloturees")
def ventes_cloturees():
    try:
        return hibou.get_closed_sales()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))