import React, { useState } from "react";
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import CategoriesListItem from "../categories-list-item"

const CategoriesList = ({ categories, onAddCategory, onDelCategory }) => {

    const [ open, setOpen ] = useState(false);
    const [ newCategory, setNewCategory ] = useState("");    

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const handleAdd = () => {
        onAddCategory(newCategory)
        setOpen(false);
    };

    return (
        <>
        <Container sx={{ mt: "1rem", width: 360 }}>
        <TableContainer component={Paper}>
            <Table aria-label="simple table">
                <TableBody>
                            {                
                            categories.map((category) => {
                                return (
                                        <CategoriesListItem 
                                            key={category.id} 
                                            category_item={category}
                                            id={category.id} 
                                            onDelCategory={onDelCategory} />
                                )
                            })
                        }            
                </TableBody>           
            </Table>
        </TableContainer>
        </Container>
        <Grid container                  
                sx={{ mt: "2rem" }}
                direction="column"
                alignItems="center"                  
                >
            <Button onClick={handleClickOpen}>
                Добавить категорию
            </Button>
        </Grid>

        <Dialog open={open} 
                onClose={handleClose}
                >
            <DialogTitle>Добавить категорию</DialogTitle>
            <DialogContent>
            <DialogContentText>
                Введите категорию инвестиций, например "Брокерский счет", "Недвижимость" или "Криптовалюты"
            </DialogContentText>
            <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Введите категорию"
                type="text"
                fullWidth
                variant="standard"
                onChange={(e) => setNewCategory(e.target.value) }
            />
            </DialogContent>
            <DialogActions>
            <Button onClick={handleClose}>Отмена</Button>
            <Button onClick={handleAdd}>Добавить</Button>
            </DialogActions>
        </Dialog>
        </>
    );
    
}

export default CategoriesList;
