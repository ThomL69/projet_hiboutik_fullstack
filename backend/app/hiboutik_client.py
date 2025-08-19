import os
import requests
from dotenv import load_dotenv

load_dotenv()

BASE_URL = os.getenv("HIBOUTIK_BASE_URL")
USER = os.getenv("HIBOUTIK_USER")
KEY = os.getenv("HIBOUTIK_KEY")

AUTH = (USER, KEY)

def get_clients(name: str = None):
    url = f"{BASE_URL}/customers/"
    r = requests.get(url, auth=AUTH)
    r.raise_for_status()
    clients = r.json()
    if name:
        clients = [c for c in clients if name.lower() in c.get("customer_name", "").lower()]
    return clients


def get_sales(customer_id: int):
    url = f"{BASE_URL}/sales/?customer_id={customer_id}"
    r = requests.get(url, auth=AUTH)
    r.raise_for_status()
    return r.json()


def get_closed_sales():
    url = f"{BASE_URL}/sales/"
    r = requests.get(url, auth=AUTH)
    r.raise_for_status()
    sales = r.json()
    return [s for s in sales if s.get("sale_status") == "CLOSED"]