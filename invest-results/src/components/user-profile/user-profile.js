import React from "react";
import { useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom";
import { useCookies } from 'react-cookie';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

import { userLogOut } from "../../redux-store/actions";

const UserProfile = ({ profile }) => {
    
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const [, , removeCookie] = useCookies();

    const logOut = () => {
        dispatch(userLogOut());
        removeCookie('investresults_token');
        removeCookie('investresults_user_id');
        navigate('/login');         
    }
        
    return (                        
        <Container sx={{ mt: "1rem", width: 360 }}>
        <TableContainer component={Paper}>
            <Table aria-label="simple table">
                <TableBody>
                    <TableRow>            
                        <TableCell>Логин</TableCell>
                        <TableCell align="right">{profile.username}</TableCell>
                    </TableRow>
                    <TableRow>            
                        <TableCell>Email</TableCell>
                        <TableCell align="right">{profile.email}</TableCell>
                    </TableRow>
                </TableBody>           
            </Table>
        </TableContainer>
        <Grid container                  
                sx={{ mt: "1rem" }}
                direction="column"                                 
                >
            <Button variant="outlined" onClick={logOut}>
                Выйти
            </Button>
        </Grid>
        </Container>            
    );
    
}

export default UserProfile;
