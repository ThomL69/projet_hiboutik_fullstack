from fastapi import FastAPI
from fastapi.testclient import TestClient
from app.api.endpoints.clients import get_clients_by_name
from app.db.models.client import Client
from app.db.session import get_db
from sqlalchemy.orm import Session
from unittest import mock

app = FastAPI()

@app.get("/clients/{name}")
def read_clients(name: str, db: Session = next(get_db())):
    return get_clients_by_name(name, db)

client = TestClient(app)

def test_get_clients_by_name():
    mock_db = mock.Mock()
    mock_client = Client(id=1, name="John Doe", email="john@example.com")
    mock_db.query.return_value.filter.return_value.all.return_value = [mock_client]

    with mock.patch('app.db.session.get_db', return_value=mock_db):
        response = client.get("/clients/John")
        assert response.status_code == 200
        assert response.json() == [{"id": 1, "name": "John Doe", "email": "john@example.com"}]

def test_get_clients_by_name_not_found():
    mock_db = mock.Mock()
    mock_db.query.return_value.filter.return_value.all.return_value = []

    with mock.patch('app.db.session.get_db', return_value=mock_db):
        response = client.get("/clients/Unknown")
        assert response.status_code == 200
        assert response.json() == []