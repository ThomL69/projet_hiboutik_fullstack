import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ClientsPage from './pages/ClientsPage';
import SalesPage from './pages/SalesPage';

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/clients" component={ClientsPage} />
          <Route path="/sales" component={SalesPage} />
          <Route path="/" exact>
            <h1>Welcome to the Sales Management System</h1>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;