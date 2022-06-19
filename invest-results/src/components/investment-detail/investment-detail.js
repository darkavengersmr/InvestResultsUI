import React, { useState } from 'react';
import { useSelector } from 'react-redux'
import { useParams } from "react-router-dom";
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import Typography from '@mui/material/Typography';

import Grid from '@mui/material/Grid';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import InvestmentDetailItem from "../investment-detail-item"

const InvestmentDetail = () => {

    const [ openHistory, setOpenHistory ] = useState(false);
    const [ openDeposit, setOpenDeposit ] = useState(false);
    const [ openCredit, setOpenCredit ] = useState(false);

    const history = useSelector((state) => state.history);
    const inout = useSelector((state) => state.inout);

    const { id } = useParams();

    const handleClickOpenHistory = () => {
        setOpenHistory(true);
    };
    const handleCloseHistory = () => {
        setOpenHistory(false);
    };

    const handleClickOpenDeposit = () => {
        setOpenDeposit(true);
    };
    const handleCloseDeposit = () => {
        setOpenDeposit(false);
    };

    const handleClickOpenCredit = () => {
        setOpenCredit(true);
    };
    const handleCloseCredit = () => {
        setOpenCredit(false);
    };

    const renderDialog = (triggerToOpen, 
                    funcToClose,
                    dialogTitle,
                    dialogContentText
                    ) => {
        return (
            <Dialog open={triggerToOpen} 
                    onClose={funcToClose}
                    >
                <DialogTitle>{dialogTitle}</DialogTitle>
                <DialogContent>
                <DialogContentText>
                    {dialogContentText}
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Сумма"
                    type="number"
                    fullWidth
                    variant="standard"
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Комментарий"
                    type="text"
                    fullWidth
                    variant="standard"
                />
                </DialogContent>
                <DialogActions>
                <Button onClick={funcToClose}>Отмена</Button>
                <Button onClick={funcToClose}>Внести</Button>
                </DialogActions>
            </Dialog>
        )
    }

    const investment_detail_item = {}

    history.forEach((element) => {        
        if (element.investment_id === parseInt(id)) {
            const date = element.date.slice(0,7);                
            investment_detail_item[date] = {history: element.sum}                
        }
    });
    
    inout.forEach((element) => {        
        if (element.investment_id === parseInt(id)) {
            const date = element.date.slice(0,7);                              
            if (!(date in investment_detail_item)) {
                investment_detail_item[date] = {history: null}
            }
            if (!investment_detail_item[date].sum_in) {
                investment_detail_item[date].sum_in = 0;
            }
            if (!investment_detail_item[date].sum_out) {
                investment_detail_item[date].sum_out = 0;
            }
            if (element.sum >= 0) {                        
                investment_detail_item[date].sum_in += element.sum                        
            } else {
                investment_detail_item[date].sum_out += -1 * element.sum                        
            }                    
        }
        
    });

    if (Object.keys(investment_detail_item).length === 0) {
    return (            
        <Container sx={{ mt: "1rem", width: 320 }}>
            <Typography variant="body" component="div" align="center">
            Нет данных
            </Typography>
        </Container>
    )};

    const tableCellStyle = { p: "4px", fontSize: "1rem" };

    return (
        <>
        <Container sx={{ mt: "1rem", width: 320 }}>
        <TableContainer component={Paper} sx={{ p: "4px" }}>
            <Table aria-label="simple table">
                <TableBody>
                    <TableRow>
                        <TableCell sx={tableCellStyle} 
                                    align="center">
                            Дата
                        </TableCell>
                        <TableCell sx={tableCellStyle} 
                                    align="right">
                                        Сумма
                        </TableCell>
                        <TableCell sx={tableCellStyle}
                                    align="right">
                                        Приход
                        </TableCell>
                        <TableCell sx={tableCellStyle}
                                    align="right">
                                        Расход
                        </TableCell>
                    </TableRow>
                        {                
                        Object.keys(investment_detail_item).map(function(key, index) {                    
                            return <InvestmentDetailItem 
                                        key={key} 
                                        date={key} 
                                        data={investment_detail_item[key]}/>
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
            <Button variant='contained' onClick={handleClickOpenHistory}>
                Зафиксировать сумму
            </Button>
        </Grid>
        <Container sx={{ mt: "1rem", width: 320 }} align="center">
            <Button variant="outlined" 
                    onClick={handleClickOpenDeposit}                        
                    sx={{ mr: "0.25rem"}}>
                Внести
            </Button>
            <Button variant="outlined" 
                    onClick={handleClickOpenCredit}                        
                    sx={{ ml: "0.25rem"}}>
                Снять
            </Button>
        </Container>

        {renderDialog(openHistory, 
                        handleCloseHistory,
                        "Зафиксировать сумму",
                        "Введите сумму для фиксации на текущую дату"
        )}

        {renderDialog(openDeposit, 
                        handleCloseDeposit,
                        "Внести сумму",
                        "Введите вносимую сумму и комментарий"
        )}

        {renderDialog(openCredit, 
                        handleCloseCredit,
                        "Снять сумму",
                        "Введите снимаемую сумму и комментарий"
        )}
        </>
    );  
}

export default InvestmentDetail;
