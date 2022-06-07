import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { LoginPage, InvestmentListPage } from '../pages';
import './app.css';


const App = () => {
  return (
    <div className="myapp">
    <Routes>
      <Route 
        path="/" 
        exact
        element={<InvestmentListPage />} />
      <Route 
        path="/login"         
        element={<LoginPage />} />
    </Routes>
    </div>
  )
};

export default App;
