import requests
from app.core.config import settings
import json

AUTH = (settings.HIBOUTIK_USER, settings.HIBOUTIK_KEY)
BASE = settings.HIBOUTIK_BASE_URL.rstrip('/')

# Retourne liste de clients si un nom est renseigne ou pas
def get_clients(name: str = None):
    url=f"{BASE}/customers/"
    res = requests.get(url, auth=AUTH)
    res.raise_for_status()
    clients = res.json()
    if name:
        clients = [c for c in clients if name.lower() in c.get("last_name", "").lower()]
    return clients

# Retourne liste de ventes d'un client
def get_sales(customer_id: int):
    url = f"{BASE}/customer/{customer_id}/sales"
    res = requests.get(url, auth=AUTH)
    res.raise_for_status()
    return res.json()


# worked but not optimize if many customers and sales
# def get_closed_sales():
#     sales_closed = {}
#     clients = get_clients();
#     for client in clients:
#         sales = get_sales(client.get("customers_id"))
#         for s in sales:
#             if int(s.get("date_z")) > 0:
#                 sales_closed[s.get("sale_id")] = s
#     return sales_closed


# Version en essayant une autre URL
# Recuperation des ventes cloturees
def get_closed_sales():
    sales_closed = []
    sales_id = 1
    l = []
    
    allSales = get_all_sales(sales_id, l)
    #print(len(allSales)) # taille 34

    for s in allSales:
        if int(s[0].get("date_z")) > 0:
            sales_closed.append(s[0])

    return sales_closed
    
            
# Recuperation d'une vente avec id `sales_id`
def get_sales_with_id(sales_id: int):
    url=f"{BASE}/sales/{sales_id}"
    res = requests.get(url, auth=AUTH)
    print(f"{sales_id} : {res.status_code}")
    
    if(res.status_code != 404):
        res.raise_for_status()
        return res.json()
    else:
        url=f"{BASE}/sales/{sales_id - 1}"
        res = requests.get(url, auth=AUTH)
        res.raise_for_status()
        return res.json()
        

# Recuperation de toutes les ventes
def get_all_sales(sales_id: int, allSales: list):
    url=f"{BASE}/sales/{sales_id}"
    res = requests.get(url, auth=AUTH)
    
    if(res.status_code != 404):
        res.raise_for_status()
        sales = res.json()
    else:
        sales = []


    if sales == []:
        allSales.insert(sales_id - 1, sales)
    else:
        allSales.insert(sales_id - 1, sales)
        get_all_sales(sales_id + 1, allSales)

    allSales = list(filter(None, allSales))
    return allSales