import requests
from app.core.config import settings

AUTH = (settings.HIBOUTIK_USER, settings.HIBOUTIK_KEY)
BASE = settings.HIBOUTIK_BASE_URL.rstrip('/')

# AUTH=(USER, KEY)

def get_clients(name: str = None):
    url=f"{BASE}/customers/"
    res = requests.get(url, auth=AUTH)
    res.raise_for_status()
    clients = res.json()
    if name:
        clients = [c for c in clients if name.lower() in c.get("last_name", "").lower()]
    return clients


def get_sales(customer_id: int):
    url = f"{BASE}/customer/{customer_id}/sales"
    res = requests.get(url, auth=AUTH)
    res.raise_for_status()
    return res.json()


def get_closed_sales():
    sales_closed = {}
    clients = get_clients();
    for client in clients:
        sales = get_sales(client.get("customers_id"))
        for s in sales:
            if s.get("completed_at") != "0000-00-00 00:00:00":
                sales_closed[s.get("sale_id")] = s
    return sales_closed

# def _get(path: str, params: dict | None = None):
#     url = f"{BASE}/{path.lstrip('/')}"
#     res = requests.get(url, auth=AUTH, params=params, timeout=20)
#     res.raise_for_status()
#     return res.json()


# --- Resources ---
# def list_customers() -> list[dict]:
#     return _get("customers/")

# def list_sales(params: dict | None = None) -> list[dict]:
#     return _get("sales/", params=params)