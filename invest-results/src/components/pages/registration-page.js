import React, { useCallback, useState, useContext } from 'react';
import { useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom";
import { useCookies } from 'react-cookie';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

import AppHeader from '../app-header';
import { tokenLoaded, tokenRequested, 
    profileLoaded, setNotification } from "../../redux-store/actions"
import { ApiServiceContext } from "../app-contexts";

const RegistrationPage = () => {

    const ApiService = useContext(ApiServiceContext);
    const dispatch = useDispatch();

    const [, setCookie] = useCookies();
  
    const navigate = useNavigate();

    const [ username, setUsername ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ invite, setInvite ] = useState("");

    const onLoginChange = useCallback((e) => {
        setUsername(e.target.value);    
      }, []);
    
    const onPasswordChange = useCallback((e) => {
    setPassword(e.target.value);    
    }, []);

    const onEmailChange = useCallback((e) => {
        setEmail(e.target.value);    
        }, []);

    const onInviteChange = useCallback((e) => {
        console.log(e.target.value)
        setInvite(e.target.value);    
        }, []);

    const handleClickRegister = useCallback(() => {    
        dispatch(tokenRequested());
        ApiService.registerUser({ username,
                                  email, 
                                  password,                                   
                                  invite, 
                                  is_active: true })        
        .then(() => ApiService.getToken({ username: username, password: password })
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
        .catch((error) => {
          if (error.response.status === 401) {            
            dispatch(setNotification({
              text: "Ошибка регистрации",
              type: "error"
            }))
          }       
        })
        )
    
    }, [ApiService, dispatch, navigate, setCookie, email, invite, password, username]);

    const handleClickDemo = useCallback(() => {    
        dispatch(profileLoaded({username: 'demo'}));
        navigate('/login');
    }, [dispatch, navigate]);

    
    return (<> 
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
                        label="Email"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={onEmailChange}
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
            <TextField
                        autoFocus
                        margin="dense"                    
                        label="Приглашение"
                        type="password"
                        fullWidth
                        variant="standard"
                        onChange={onInviteChange}
                    />
    
            <Grid container                  
                    sx={{ mt: "2rem" }}
                    direction="column"                                 
                    >
                <Button variant='contained' onClick={handleClickRegister} >
                    Регистрация
                </Button>
                <Button onClick={handleClickDemo} 
                        sx={{ mt: "1rem" }}
                        variant="outlined">
                    Демо-режим
                </Button>
            </Grid>    
        </Container>
        </>
)};

export default RegistrationPage;