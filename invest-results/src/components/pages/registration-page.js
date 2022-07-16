import React, { useCallback, useContext } from 'react';
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
import { useInput } from '../../hooks';

const RegistrationPage = () => {

    const ApiService = useContext(ApiServiceContext);
    const dispatch = useDispatch();

    const [, setCookie] = useCookies();
  
    const navigate = useNavigate();

    const username = useInput('')
    const password = useInput('')
    const email = useInput('')
    const invite = useInput('')

    const handleClickRegister = useCallback(() => {
        if (!username.value || !email.value || !password.value || !invite.value) {            
            dispatch(setNotification({
              text: "не заполнены обязательные поля",
              type: "error"
            }))
          } 
        else {
            dispatch(tokenRequested());
            ApiService.registerUser({ username: username.value,
                                    email: email.value, 
                                    password: password.value,                                   
                                    invite: invite.value, 
                                    is_active: true })        
            .then(() => ApiService.getToken({ username: username.value, password: password.value })
            .then((response) =>  dispatch(tokenLoaded(response.data.access_token)))
            .then((data) => { setCookie('investresults_token', data.payload);
                            return data;
            }))
            .then((data) => ApiService.getUserProfile({ token: data.payload }))
            .then((response) =>  {
                dispatch(profileLoaded(response.data));
                setCookie('investresults_user_id', response.data.id);
                navigate('/help');
            })      
            .catch((error) => {
                console.log(`Ошибка регистрации ${error.response.status}`)            
                dispatch(setNotification({
                text: `Ошибка регистрации ${error.response.status}`,
                type: "error"
                }))            
            })
        }
        
    
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
                            {...username}
                        />
            <TextField
                        autoFocus
                        margin="dense"                    
                        label="Email"
                        type="text"
                        fullWidth
                        variant="standard"
                        {...email}
                    />
            <TextField
                        autoFocus
                        margin="dense"                    
                        label="Пароль"
                        type="password"
                        fullWidth
                        variant="standard"
                        {...password}
                    />
            <TextField
                        autoFocus
                        margin="dense"                    
                        label="Приглашение"
                        type="password"
                        fullWidth
                        variant="standard"
                        {...invite}
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