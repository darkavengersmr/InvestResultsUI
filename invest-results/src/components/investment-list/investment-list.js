import React, { useState } from "react";
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
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

const InvestmentList = ({ investments, categories, addInvestment }) => {

    const [ open, setOpen ] = useState(false);
    const [ newInvestment, setNewInvestment ] = useState("");
    const [ selectedCategoryId, selectCategoryId ] = useState("");

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const handleAdd = () => {      
        addInvestment({ description: newInvestment, category_id: selectedCategoryId });  
        setOpen(false);
    };
    
    const handleChangeCategoryId = (event) => {
        selectCategoryId(event.target.value);        
    };

    return (
        <>
        <Container sx={{ width: 360 }}>
            {
            investments.map((investment) => {
                return <InvestmentListItem key={investment.id} investment={investment} />
                })
            }
        </Container>

        <Grid container      
                sx={{ mt: "2rem", mb: "2rem" }}
                direction="column"
                alignItems="center"                  
                >
            <Button variant='contained' onClick={handleClickOpen}>
                Добавить инвестицию
            </Button>
        </Grid>

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
            <Button onClick={handleAdd}>Добавить</Button>
            </DialogActions>
        </Dialog>
        </>
    );
}

export default InvestmentList;
