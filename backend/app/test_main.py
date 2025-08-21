from fastapi.testclient import TestClient
import os, sys
from main import app

clientTest = TestClient(app)

def test_read_clients():
    response = clientTest.get("/clients/")
    assert response.status_code == 200   
    assert response.json() == [
        {
            "id": 1,
            "last_name": "Dupont",
            "first_name": "Louis",
            "email": "dupont@example.com"
        }
    ]

def test_read_client():
    clientId = 1
    response = clientTest.get(f"/clients/{clientId}")
    assert response.status_code == 200
    assert response.json() == { 
        'email': 'dupont@example.com',
        'first_name': 'Louis',
        'id': 1,
        'last_name': 'Dupont'
    }

def test_read_client_not_found():
    clientId = 0
    response = clientTest.get(f"/clients/{clientId}")
    assert response.status_code == 404
    assert response.json() == {
        "detail": "Client Not Found"
    }
