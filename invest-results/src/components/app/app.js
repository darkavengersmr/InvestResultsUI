import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CookiesProvider } from 'react-cookie';
import CssBaseline from '@mui/material/CssBaseline';

import { LoginPage, 
         RegistrationPage, 
         InvestmentListPage,
         InvestmentDetailPage,
         CategoriesListPage,
         UserProfilePage,
         ReportsPage,
         SettingsPage,
         KeyRatesPage } from '../pages';

import HelpWelcomeInfo from '../help-welcomeinfo';

const darkTheme = createTheme({
  palette: {
    mode: 'dark', 
  },
});

const lightTheme = createTheme({
  palette: {
    mode: 'light', 
  },
});

const App = () => {

  const { theme } = useSelector((state) => state);

  return (    
       
    <ThemeProvider theme={ theme === 'dark' ? darkTheme : lightTheme}> 
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
            path="/reports/:id"
            element={<ReportsPage />} />  
          <Route 
            path="/reports/"
            element={<ReportsPage />} />  
          <Route 
            path="/settings"
            element={<SettingsPage />} />  
          <Route 
            path="/profile/"
            element={<UserProfilePage />} />
          <Route 
          path="/keyrates"
          element={<KeyRatesPage />} />            
          <Route 
          path="/help"
          element={<HelpWelcomeInfo />} />      
        </Routes>
        </div>
      </CookiesProvider>    
    </ThemeProvider>
  )
};

export default App;
