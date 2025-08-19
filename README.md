# Fullstack Solution

This project is a fullstack application built with FastAPI for the backend and React.js for the frontend. It provides endpoints for retrieving client and sales data, implements pagination, ensures data persistence with a database, and includes security features. The application is also dockerized for easy deployment.

## Project Structure

```
fullstack-solution
├── backend
│   ├── app
│   │   ├── api
│   │   │   ├── endpoints
│   │   │   │   ├── clients.py
│   │   │   │   └── sales.py
│   │   │   └── __init__.py
│   │   ├── core
│   │   │   ├── config.py
│   │   │   └── security.py
│   │   ├── db
│   │   │   ├── base.py
│   │   │   ├── models
│   │   │   │   ├── client.py
│   │   │   │   └── sale.py
│   │   │   └── session.py
│   │   ├── main.py
│   │   └── tests
│   │       ├── test_clients.py
│   │       └── test_sales.py
│   ├── Dockerfile
│   ├── requirements.txt
│   └── README.md
├── frontend
│   ├── public
│   │   └── index.html
│   ├── src
│   │   ├── components
│   │   │   ├── ClientList.js
│   │   │   └── SalesList.js
│   │   ├── pages
│   │   │   ├── ClientsPage.js
│   │   │   └── SalesPage.js
│   │   ├── App.js
│   │   ├── index.js
│   │   └── services
│   │       ├── api.js
│   │       └── auth.js
│   ├── package.json
│   ├── Dockerfile
│   └── README.md
├── docker-compose.yml
└── README.md
```

## Backend

The backend is built using FastAPI and includes the following features:

- **API Endpoints**: 
  - `/api/clients`: Retrieve a list of clients based on a given name.
  - `/api/sales`: Retrieve sales data for a specific client.

- **Database**: 
  - Uses SQLAlchemy for ORM and supports data persistence.

- **Security**: 
  - Implements user authentication and password hashing.

- **Testing**: 
  - Includes unit tests for API endpoints.

## Frontend

The frontend is built using React.js and includes:

- **Components**: 
  - `ClientList`: Displays a list of clients.
  - `SalesList`: Displays sales data for a selected client.

- **Pages**: 
  - `ClientsPage`: Interface for searching clients by name.
  - `SalesPage`: Displays sales data for a selected client.

- **API Services**: 
  - Functions for making API calls to the backend.

## Docker

The project includes Dockerfiles for both the backend and frontend, allowing for easy containerization and deployment. A `docker-compose.yml` file is provided to manage the services.

## Getting Started

1. Clone the repository.
2. Navigate to the backend directory and install dependencies:
   ```
   cd backend
   pip install -r requirements.txt
   ```
3. Navigate to the frontend directory and install dependencies:
   ```
   cd frontend
   npm install
   ```
4. Run the application using Docker:
   ```
   docker-compose up --build
   ```

## Testing

To run the tests for the backend, navigate to the backend directory and execute:
```
pytest
```

## License

This project is licensed under the MIT License.