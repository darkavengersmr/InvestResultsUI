import React, { memo } from "react";
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

const UserProfile = memo(({ profile, logOut }) => {
            
    return (                        
        <Container sx={{ mt: "1rem", width: "100%" }} maxWidth="sm">
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
    
})

export default UserProfile;
