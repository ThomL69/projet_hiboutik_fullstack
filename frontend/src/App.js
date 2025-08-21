// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
    
//     <div className="App">
      
//       <header className="App-header">TOTO
//         <img src={logo} className="App-logo" alt="logo" />
//         <p className="Myap">My div</p>
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>

//     </div>
//   );
// }


// export default App;

// import './App.css';
// import React from 'react';
// // import { BrowserRouter as Router, Route, Switch, Routes } from 'react-router-dom';
// import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
// import ClientsPage from './pages/ClientsPage';
// import SalesPage from './pages/SalesPage'; 

// function App() {
//   return (
//     <div className="App">
//         <h1>Welcome to the Sales Management System</h1>
//       <Router>
//         <nav>
//           <Link to="/">Home</Link> |{" "}
//           <Link to="/clients">ClientsPage</Link> |{" "}
//           <Link to="/sales">SalesPage</Link>
//         </nav>
//         <Routes>
//           <Route path="/clients" element={<ClientsPage />} />
//           <Route path="/sales" element={<SalesPage />} />
//         </Routes>
//       </Router>
//     </div>
    
    
//   );
// }

// export default App;

import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ClientsPage from './pages/ClientsPage';
import SalesPage from './pages/SalesPage';
import ClosedSalesPage from './pages/ClosedSalesPage';
import Login from './pages/Login';
import Home from './pages/Home';
import { Navigate } from 'react-router-dom';


function PrivateRoute({ children }) {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
}

function handlelogout() {
    localStorage.removeItem("token");
    console.log("logged out");
    window.location.reload(); // refresh to disappear the "Disconnect" button
    <Navigate to="/login" />;
  }

function App() {
  // const [name, setName] = useState('');
  // const [clients, setClients] = useState([]);
  // const [currentPage, setCurrentPage] = useState(1);
  // const [dataPerPage] = useState(5);

  // // Liste des clients
  // const searchClients = async () => {
  //   const response = await fetch(`http://localhost:8000/clients/?nom=${name}`);
  //   const data = await response.json();
  //   setClients(data);
  // };

  // // Pagination
  // const indexOfLastData = currentPage * dataPerPage;
  // const indexOfFirstData = indexOfLastData - dataPerPage;
  // const currentClients = clients.slice(indexOfFirstData , indexOfLastData);

  // const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Liste des sales en cliquant sur un client

  return (
    <div>
      <h2>
        Gestion des Clients & Ventes
      </h2>
      <Router>
        <nav className="MyMnu">
          <Link className="MyMnuItem1" to="/">Home</Link> {" "}
          <Link className="MyMnuItem2" to="/clients">List customers</Link> {" "}
          <Link className="MyMnuItem3"to="/closed_sales">Closed Sales</Link> {" "}
          {localStorage.getItem("token") ? (
            <>
              <button className="MyBtnDis" onClick={handlelogout} type="submit">Disconnect</button> 
            </>
            
          ) : ''}
          
        </nav>
       
        <Routes>
          <Route path="/" element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route path="/login" element={<Login />}>
          </Route>
          <Route path="/clients" element={
              <PrivateRoute>
                <ClientsPage /> 
              </PrivateRoute>
            }
          />
          <Route path="clients/sales/:clientId" element={
              <PrivateRoute>
                <SalesPage />
              </PrivateRoute>
            } 
          />
          <Route path="/closed_sales" element={
            <PrivateRoute>
              <ClosedSalesPage />
            </PrivateRoute>
            } 
          />
        </Routes>
      </Router>

      {/* <ClientsPage onSelect={setSelectedClient} /> */}
    </div>
  );
}

export default App;