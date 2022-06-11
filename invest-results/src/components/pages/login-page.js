import React from 'react';
import { Link } from 'react-router-dom';

import AppHeader from '../app-header';
import "./pages.css"

const LoginPage = () => {
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
            Пароль
            <input
                className="input"
                type="password"        
            />
        </div>
        <div className="form-string center">
            <button className="btn btn-primary button">Вход</button>
            <Link className="btn btn-success button" role="button" to="/register">
                Регистрация
            </Link>
        </div>
    </div>      
  </div>
)};

export default LoginPage;