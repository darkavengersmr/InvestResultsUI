import React from 'react';

import AppHeader from '../app-header';
import "./pages.css"

const RegistrationPage = () => {
  return (<div> 
      <AppHeader name="Мои.Инвестиции" />     
      <div className="form">
        <div className="form-string">
            Логин
            <input
                className="input"
                type="text"                
            />
        </div>
        <div className="form-string">
            E-mail
            <input
                className="input"
                type="text"                
            />
        </div>
        <div className="form-string">
            Пароль
            <input
                className="input"
                type="password"        
            />
        </div>
        <div className="form-string">
            Приглашение
            <input
                className="input"
                type="text"                
            />
        </div>
        <div className="form-string center">            
            <button className="btn btn-success button">Регистрация</button>
            <button className="btn btn-danger button">Демо-режим</button>
        </div>
    </div>      
  </div>
)};

export default RegistrationPage;