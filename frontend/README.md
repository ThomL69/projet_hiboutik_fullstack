# Frontend Documentation

This is the frontend part of the fullstack solution built with React. It interacts with the FastAPI backend to provide a user interface for managing clients and sales data.

## Project Structure

- **public/**: Contains static files.
  - **index.html**: The main HTML file for the React application.

- **src/**: Contains the source code for the React application.
  - **components/**: Contains reusable React components.
    - **ClientList.js**: Displays a list of clients.
    - **SalesList.js**: Displays a list of sales for a selected client.
  - **pages/**: Contains page components.
    - **ClientsPage.js**: Interface for searching clients by name.
    - **SalesPage.js**: Displays sales data for a selected client.
  - **services/**: Contains service files for API calls and authentication.
    - **api.js**: Functions for making API calls to the backend.
    - **auth.js**: Handles user authentication.
  - **App.js**: The main component that sets up routing.
  - **index.js**: The entry point of the React application.

## Getting Started

1. **Installation**: 
   - Ensure you have Node.js installed.
   - Navigate to the `frontend` directory and run:
     ```
     npm install
     ```

2. **Running the Application**:
   - Start the development server:
     ```
     npm start
     ```
   - The application will be available at `http://localhost:3000`.

## API Integration

The frontend communicates with the backend API to fetch client and sales data. Ensure the backend is running and accessible for the frontend to function correctly.

## Testing

To run tests for the frontend, use:
```
npm test
```

## Docker

To build and run the frontend application in a Docker container, use the provided Dockerfile. Ensure Docker is installed and running, then execute:
```
docker build -t frontend .
docker run -p 3000:3000 frontend
```

## Security

Ensure that any sensitive information, such as API keys or authentication tokens, is managed securely and not hard-coded in the application.

## Contributing

Contributions are welcome! Please submit a pull request or open an issue for any enhancements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for details.