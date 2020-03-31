import React from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { Switch } from "react-router-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import HomePage from './pages/HomePage';
import CompanyPage from './pages/CompanyPage';
import CandidatesPage from './pages/CandidatesPage';
import NavBar from './pages/NavBar';


function App() {
  

  return (
    <Router>
      <div>
        <NavBar />
        <Switch>
          <Route path="/" exact>
            <HomePage />
          </Route>
          <Route path="/company">
            <CompanyPage />
          </Route>
          <Route path="/candidates">
            <CandidatesPage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
