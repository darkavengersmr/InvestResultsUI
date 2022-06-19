import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { useCookies } from 'react-cookie';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

import AppHeader from '../app-header';
import { tokenLoaded, tokenRequested, tokenError,
         profileLoaded, profileRequested } from "../../redux-store/actions"
import { ApiServiceContext } from "../invest-results-service-context";

const LoginPage = () => {

  const ApiService = useContext(ApiServiceContext);
  const dispatch = useDispatch();

  const [ username, setUsername ] = useState("");
  const [ password, setPassword ] = useState("");

  const profile = useSelector((state) => state.profile);

  const [, setCookie] = useCookies();

  const navigate = useNavigate();

  useEffect(() => {
    if (profile.token && profile.id) {
      navigate('/investments/');      
    }
  }, [ navigate, profile.token, profile.id, ])

  const handleClickRegister = () => {    
    navigate('/register');
  };

  const handleClickLogin = () => {    
    dispatch(tokenRequested());
    dispatch(profileRequested());
    
    ApiService.getToken({ username: username, password: password })
      .then((response) =>  dispatch(tokenLoaded(response.data.access_token)))
      .then((data) => { setCookie('investresults_token', data.payload);
                        return data;
      })
      .then((data) => ApiService.getUserProfile({ token: data.payload }))
      .then((response) =>  {
        dispatch(profileLoaded(response.data));
        setCookie('investresults_user_id', response.data.id);
        navigate('/investments/');
      })      
      .catch((error) =>  dispatch(tokenError(error))); 
    
  };

  const onLoginChange = (e) => {
    setUsername(e.target.value);    
  }

  const onPasswordChange = (e) => {
    setPassword(e.target.value);    
  }

  return (
      <>
      <AppHeader name="Мои.Инвестиции" />
      <Container sx={{ mt: "2rem", width: 320 }}>
      <TextField
                    autoFocus
                    margin="dense"                    
                    label="Логин"
                    type="text"
                    fullWidth
                    variant="standard"
                    onChange={onLoginChange}
                />
        <TextField
                    autoFocus
                    margin="dense"                    
                    label="Пароль"
                    type="password"
                    fullWidth
                    variant="standard"
                    onChange={onPasswordChange}
                />
        <Grid container                  
                  sx={{ mt: "2rem" }}
                  direction="column"                                 
                  >
            <Button variant='contained' onClick={handleClickLogin}>
                Вход
            </Button>
            <Button onClick={handleClickRegister} 
                    sx={{ mt: "1rem" }}
                    variant="outlined">
                Регистрация
            </Button>
        </Grid>    
    </Container>
  </>
)};

export default LoginPage;