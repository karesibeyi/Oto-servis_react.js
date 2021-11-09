import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import LoginPage from './Login/Login/LoginPage';
import { AuthProvider } from './Login/Extra/auth';
import PrivateRoute from './Login/Extra/privateRoute'
import Dashboard from './Dashboard/Dashboard';
import Invoice from './Invoice/Invoice';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div>
          <Route exact path='/' component={LoginPage}/>
          <PrivateRoute exact path='/dashboard' component={Dashboard}/>
          <Route path='/invoice' component={Invoice}/>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
