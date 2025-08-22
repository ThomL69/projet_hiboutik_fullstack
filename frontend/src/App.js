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

import './App.css';
import logo from './logo.svg';
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
  return (
    <div>
      <img src={logo} className="App-logo" alt="logo" />
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

    </div>
  );
}

export default App;