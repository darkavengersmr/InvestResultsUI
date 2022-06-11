import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { LoginPage, 
         RegistrationPage, 
         InvestmentListPage,
         InvestmentDetailPage,
         CategoriesListPage } from '../pages';
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
      <Route 
        path="/register"         
        element={<RegistrationPage />} />
      <Route 
        path="/investments/"
        element={<InvestmentListPage />} />
      <Route 
        path="/investments/:id"
        element={<InvestmentDetailPage />} />        
      <Route 
        path="/categories/"
        element={<CategoriesListPage />} />      
    </Routes>
    </div>
  )
};

export default App;
