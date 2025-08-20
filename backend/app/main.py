from fastapi import FastAPI, HTTPException, Query
import app.hiboutik_client as hibou
import os

print(">>> BASE_URL:", os.getenv("HIBOUTIK_BASE_URL"))

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
        # return ventes;
        # Pagination par tranche avec decoupage sequence
        start = (page - 1) * limit
        end = start + limit
        return ventes[start:end]
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
@app.get("/ventes_cloturees")
def ventes_cloturees():
    try:
        return hibou.get_closed_sales()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))