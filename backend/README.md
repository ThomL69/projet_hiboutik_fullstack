# Backend API for Fullstack Solution

This is the backend part of the Fullstack Solution project, built using FastAPI. It provides endpoints for managing clients and sales data, ensuring data persistence with a database, and implementing security features.

## Project Structure

- **app**: Contains the main application code.
  - **core**: Contains configuration settings.
  - Manages database models and sessions inside **main**.
  - Contains unit tests for the application **test_main**.
- **sqlite**: Contains the sqlite db : **hiboutik.db**
- **Dockerfile**: Instructions for building the Docker image for the backend.
- **requirements.txt**: Lists the dependencies required for the backend application.

## Features

- **Client Management**: Retrieve a list of registered clients based on a given name or not.
- **Sales Data**: Retrieve sales data for a specific client.
- **Pagination**: Implement pagination for client and sales data retrieval.
- **Security**: User authentication and password hashing.
- **Testing**: Unit tests for data persistence to ensure functionality.
<!-- - **Testing**: Unit tests for all endpoints to ensure functionality. -->


## Getting Started

1. **Clone the repository**:
   ```
   git clone <repository-url>
   cd fullstack-solution/backend
   ```

2. **Install dependencies**:
   ```
   pip install -r requirements.txt
   ```

3. **Run the application**:
   ```
   uvicorn app.main:app --reload
   ```

4. **Access the API**: Open your browser and navigate to `http://localhost:8000/docs` to view the API documentation.

## Docker

To build and run the backend application using Docker:

1. **Build the Docker image**:
   ```
   docker build -t backend .
   ```

2. **Run the Docker container**:
   ```
   docker run -d -p 8000:8000 backend
   ```

## Testing

To run the unit tests, execute the following command:
```
pytest 
```

## License

This project is licensed under the MIT License. See the LICENSE file for details.