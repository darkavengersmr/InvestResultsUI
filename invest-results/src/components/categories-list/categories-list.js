import React, { useCallback, useState, useEffect } from "react";
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { useDispatch } from 'react-redux'
import { setContextMenu } from "../../redux-store/actions"

import CategoriesListItem from "../categories-list-item"

const CategoriesList = ({ categories, onAddCategory, onDelCategory }) => {

    const [ open, setOpen ] = useState(false);
    const [ newCategory, setNewCategory ] = useState("");    

    const handleClose = useCallback(() => {
        setOpen(false);
    }, []);

    const handleAdd = useCallback(() => {
        onAddCategory(newCategory)
        setOpen(false);
    }, [onAddCategory, newCategory]);

    const dispatch = useDispatch();

    useEffect(() => { 
        dispatch(setContextMenu([
            {
                description: "Новая категория",
                action: () => {
                    setOpen(true);
                }
            }
        ])); 
    }, [dispatch])

    const onEnter = (e) => {
        if (e.key === "Enter") {handleAdd()}
    }

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

        <Dialog open={open} 
                onClose={handleClose}
                >
            <DialogTitle>Добавить категорию</DialogTitle>
            <DialogContent>
            <DialogContentText>
                Введите категорию инвестиций, например "Ценные бумаги", "Недвижимость" или "Криптовалюты"
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
                onKeyPress={onEnter}
            />
            </DialogContent>
            <DialogActions>
            <Button onClick={handleClose}>Отмена</Button>
            <Button onClick={handleAdd} onKeyPress={onEnter}>Добавить</Button>
            </DialogActions>
        </Dialog>
        </>
    );
    
}

export default CategoriesList;
