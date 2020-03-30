import React, { useState ,useEffect } from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { Switch } from "react-router-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import HomePage from './pages/HomePage';
import CompanyPage from './pages/CompanyPage';
import Candidates from './pages/Candidates';
import NavBar from './pages/NavBar';


function App() {

  useEffect(() => {
    const fetchCandidates = (async () => {
      const resp = await fetch('http://localhost:3001/candidates');
      const respJson = await resp.json();
      console.log('khanh', respJson);
      console.log('resp', resp)
      fetchCandidates();
    }
    )

  }, [])


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
            <Candidates />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
