import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CookiesProvider } from 'react-cookie';
import CssBaseline from '@mui/material/CssBaseline';

import { LoginPage, 
         RegistrationPage, 
         InvestmentListPage,
         InvestmentDetailPage,
         CategoriesListPage,
         UserProfilePage } from '../pages';

const darkTheme = createTheme({
  palette: {
    mode: 'dark', 
  },
});

const App = () => {

  return (    
    <ThemeProvider theme={darkTheme}>  
      <CookiesProvider>
        <CssBaseline />
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
          <Route 
            path="/profile/"
            element={<UserProfilePage />} />      
        </Routes>
        </div>
      </CookiesProvider>    
    </ThemeProvider>
  )
};

export default App;
