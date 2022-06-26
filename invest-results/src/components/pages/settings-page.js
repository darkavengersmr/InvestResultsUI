import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useCookies } from 'react-cookie';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Switch from '@mui/material/Switch';

import { setOnlyActiveVisible, setTheme } from "../../redux-store/actions"
import AppHeader from "../app-header"

const SettingsPage = () => {

    const [, setCookie] = useCookies();
    const dispatch = useDispatch();

    const { theme, only_active_visible } = useSelector((state) => state);    

    let checkedTheme;
    theme === 'dark' ? checkedTheme = true : checkedTheme = false;    

    const handleChangeTheme = () => {        
        if (theme === 'light') {
            dispatch(setTheme('dark'));
            setCookie('investresults_theme', 'dark');
        } else {
            dispatch(setTheme('light'));
            setCookie('investresults_theme', 'light')
        }        
    }

    const handleChangeOnlyActive = () => {
        if (only_active_visible) {
            dispatch(setOnlyActiveVisible(false));
            setCookie('investresults_only_active_visible', false);
        } else {
            dispatch(setOnlyActiveVisible(true));
            setCookie('investresults_only_active_visible', true);
        } 
    }

    return (
        <div>
            <AppHeader name="Настройки"/>
            <Container sx={{ mt: "2rem", width: 360 }}>
                <Grid container sx={{ mt: "1rem" }}>
                    <Grid sx={{ width: 240 }} >
                        <Typography variant="body" 
                                    component="div" 
                                    sx={{ mt: "8px", ml: "8px" }}
                        >
                        Темная тема
                        </Typography>
                    </Grid>
                    <Grid sx={{ width: 60 }}>
                        <Switch sx={{ ml: "20px" }} 
                                checked={checkedTheme} 
                                onChange={handleChangeTheme} 
                        />
                    </Grid>                    
                </Grid>
                <Grid container sx={{ mt: "1rem" }}>
                    <Grid sx={{ width: 240 }} >
                        <Typography variant="body" 
                                    component="div" 
                                    sx={{ mt: "8px", ml: "8px" }}
                        >
                        Показывать только активные
                        </Typography>
                    </Grid>
                    <Grid sx={{ width: 60 }}>
                        <Switch sx={{ ml: "20px" }} 
                                checked={only_active_visible} 
                                onChange={handleChangeOnlyActive} 
                        />
                    </Grid>                    
                </Grid>
            </Container>
        </div>
    )
};

export default SettingsPage;
