from fastapi.testclient import TestClient
from app.main import app
from app.db.session import get_db
from app.db.models.sale import Sale
from app.db.models.client import Client

client = TestClient(app)

def test_get_sales_by_client_id(mocker):
    mock_client = Client(id=1, name="Test Client", email="test@example.com")
    mock_sale = Sale(id=1, client_id=1, amount=100.0, date="2023-01-01")
    
    mocker.patch("app.db.session.get_db", return_value=[mock_client, mock_sale])
    
    response = client.get("/sales/client/1")
    
    assert response.status_code == 200
    assert response.json() == {
        "client_id": 1,
        "sales": [
            {
                "id": 1,
                "client_id": 1,
                "amount": 100.0,
                "date": "2023-01-01"
            }
        ]
    }

def test_get_sales_by_client_id_not_found():
    response = client.get("/sales/client/999")
    
    assert response.status_code == 404
    assert response.json() == {"detail": "Client not found"}