import React from 'react';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import AppHeader from '../app-header';

const RegistrationPage = () => {

  const handleClickDemo = () => {    
    
    };

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
                    />
        <TextField
                    autoFocus
                    margin="dense"                    
                    label="Email"
                    type="text"
                    fullWidth
                    variant="standard"
                />
        <TextField
                    autoFocus
                    margin="dense"                    
                    label="Пароль"
                    type="password"
                    fullWidth
                    variant="standard"
                />
        <TextField
                    autoFocus
                    margin="dense"                    
                    label="Приглашение"
                    type="password"
                    fullWidth
                    variant="standard"
                />
  
        <Grid container                  
                  sx={{ mt: "2rem" }}
                  direction="column"                                 
                  >
            <Button variant='contained'>
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