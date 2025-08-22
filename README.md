# Fullstack Solution

This project is a fullstack application built with FastAPI for the backend and React.js for the frontend. It provides endpoints for retrieving client and sales data, implements pagination, ensures data persistence with a database, and includes security features. The application is also dockerized for easy deployment.

## Project Structure

```
fullstack-solution
├── backend
│   ├── app
│   │   ├── core
│   │   │   ├── config.py
│   │   ├── main.py
│   │   └── test_main.py
│   ├── sqlite
│   │   ├── hiboutik.db
│   ├── .gitignore
│   ├── Dockerfile
│   ├── requirements.txt
│   └── README.md
├── frontend
│   ├── public
│   │   └── index.html
│   ├── src
│   │   ├── components
│   │   │   ├── Pagination.js
│   │   ├── pages
│   │   │   ├── ClientsPage.js
│   │   │   ├── ClosedSalesPage.js
│   │   │   ├── Home.js
│   │   │   ├── Login.js
│   │   │   └── SalesPage.js
│   │   ├── App.js
│   │   ├── App.css
│   │   ├── index.js
│   │   ├── logo.svg.js
│   ├── package.json
│   ├── .gitignore
│   ├── Dockerfile
│   └── README.md
├── docker-compose.yml
└── README.md
```

## Backend

The backend is built using FastAPI and includes the following features:

- **API Endpoints**: 
  - `/customers/`: Retrieve a list of clients based on a given name.
  - `/customer/{customer_id}/sales`: Retrieve sales data for a specific client.
  - `/closed_sales`: Retrieve a list of closed sales

- **Database**: 
  - Uses SQLAlchemy for ORM and supports data persistence.

- **Security**: 
  - Implements user authentication and password hashing with OAuth2.

- **Testing**: 
  - Includes unit tests for data persistence.

## Frontend

The frontend is built using React.js and includes:

- **Components**: 
  - `Pagination`: Manage the pagination if many elements.

- **Pages**: 
  - `Home`: Just the home page when the application start
  - `Login`: Mandatory authentification to access the application
  - `ClientsPage`: Interface for searching clients by name.
  - `SalesPage`: Displays sales data for a selected client.
  - `ClosedSalesPage`: Displays closed sales data.

- **API Services**: 
  - Functions for making API calls to the backend.

## Docker

The project includes Dockerfiles for both the backend and frontend, allowing for easy containerization and deployment. A `docker-compose.yml` file is provided to manage the services.

Unfortunately , when this part is not functional because of this error below:

```bash
{
  root@XXX:/opt/fullstack-solution-latest# docker-compose -f docker-compose.yml up -d --force-recreate
  Recreating eddf218c60f2_fullstack-solution-latest_db_1 ...

  ERROR: for eddf218c60f2_fullstack-solution-latest_db_1  'ContainerConfig'

  ERROR: for db  'ContainerConfig'
}
```

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
4. Run the application using Docker **(Not Working)**: 
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
