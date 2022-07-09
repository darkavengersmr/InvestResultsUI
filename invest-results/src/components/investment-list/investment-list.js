import React, { useCallback, useState, useEffect } from "react";
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import InvestmentListItem from "../investment-list-item"
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useDispatch } from 'react-redux'
import { setContextMenu } from "../../redux-store/actions"

const InvestmentList = ({ investments, categories, addInvestment }) => {

    const [ open, setOpen ] = useState(false);
    const [ newInvestment, setNewInvestment ] = useState("");
    const [ selectedCategoryId, selectCategoryId ] = useState("");

    const handleClose = useCallback(() => {
        setOpen(false);
    }, []);

    const handleAdd = useCallback(() => {      
        addInvestment({ description: newInvestment, category_id: selectedCategoryId });  
        setOpen(false);
    }, [addInvestment, newInvestment, selectedCategoryId]);
    
    const handleChangeCategoryId = useCallback((event) => {
        selectCategoryId(event.target.value);        
    }, []);

    const dispatch = useDispatch();

    useEffect(() => { 
        dispatch(setContextMenu([
            {
                description: "Новая инвестиция",
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
        <Container sx={{ width: 360 }}>
            {
            investments.map((investment) => {
                return <InvestmentListItem key={investment.id} investment={investment} />
                })
            }
        </Container>

        <Dialog open={open} 
                onClose={handleClose}
                >
            <DialogTitle>Добавить инвестицию</DialogTitle>
            <DialogContent>
            <DialogContentText>
                Введите название инвестиции и укажите ее категорию
            </DialogContentText>
            <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Название"
                type="text"
                fullWidth
                variant="standard"
                onChange={(e) => setNewInvestment(e.target.value) }
                onKeyPress={onEnter}
            />
            <FormControl fullWidth sx={{ mt: "1rem" }}>
                <InputLabel id="demo-simple-select-label">Категория</InputLabel>
                <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selectedCategoryId}
                onChange={handleChangeCategoryId}
                >
                    {
                    categories.map((item) => {
                    return <MenuItem key={item.id} value={item.id}>{item.category}</MenuItem>
                    })
                    }    
                </Select>
            </FormControl>
            </DialogContent>
            <DialogActions>
            <Button onClick={handleClose}>Отмена</Button>
            <Button onClick={handleAdd} onKeyPress={onEnter}>Добавить</Button>
            </DialogActions>
        </Dialog>
        </>
    );
}

export default InvestmentList;
