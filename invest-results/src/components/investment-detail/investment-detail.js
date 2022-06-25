import React, { useState } from 'react';
import { useSelector } from 'react-redux'
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

import InvestmentDetailItem from "../investment-detail-item"
import DialogModal from '../dialog-modal';

const InvestmentDetail = ({ id, addHistory, addInOut }) => {

    const [ openHistory, setOpenHistory ] = useState(false);
    const [ openDeposit, setOpenDeposit ] = useState(false);
    const [ openCredit, setOpenCredit ] = useState(false);

    const history = useSelector((state) => state.history);
    const inout = useSelector((state) => state.inout);

    const handleClickOpenHistory = () => {
        setOpenHistory(true);
    };

    const handleCloseHistory = () => {
        setOpenHistory(false);
    };

    const handleAddHistory = (sum) => {        
        addHistory(sum);
        setOpenHistory(false);
    }

    const handleClickOpenDeposit = () => {
        setOpenDeposit(true);
    };

    const handleCloseDeposit = () => {
        setOpenDeposit(false);
    };

    const handleAddDeposit = (sum, comment) => {
        if (sum > 0 && comment.length > 0) {
            addInOut(sum, comment);
            setOpenDeposit(false);
        }
        
    }

    const handleClickOpenCredit = () => {
        setOpenCredit(true);
    };

    const handleCloseCredit = () => {
        setOpenCredit(false);
    };

    const handleAddCredit = (sum, comment) => {
        if (sum > 0 && comment.length > 0) {
            addInOut(-sum, comment);
            setOpenCredit(false);
        }
    }

    const investment_detail_item = {}
    const investment_detail_total = {history: null, sum_in: 0, sum_out: 0}

    history.forEach((element) => {        
        if (element.investment_id === parseInt(id)) {
            const date = element.date.slice(0,7);                
            investment_detail_item[date] = {history: element.sum}
            investment_detail_total.history = element.sum;
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
                investment_detail_item[date].sum_in += element.sum;
                investment_detail_total.sum_in += element.sum;
            } else {
                investment_detail_item[date].sum_out += -1 * element.sum;
                investment_detail_total.sum_out += -1 * element.sum;
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

    const tableHeadStyle = { p: "4px", fontSize: "1rem" };
    const tableCellStyle = { p: "8px 1px 8px 1px", fontSize: "0.8rem" };

    return (
        <>
        <Container sx={{ mt: "1rem", width: 320 }}>
        <TableContainer component={Paper} sx={{ p: "4px" }}>
            <Table aria-label="simple table">
                <TableBody>
                    <TableRow>
                        <TableCell sx={tableHeadStyle} 
                                    align="center">
                            Дата
                        </TableCell>
                        <TableCell sx={tableHeadStyle} 
                                    align="right">
                                        Сумма
                        </TableCell>
                        <TableCell sx={tableHeadStyle}
                                    align="right">
                                        Приход
                        </TableCell>
                        <TableCell sx={tableHeadStyle}
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
                    <TableRow>
                        <TableCell sx={tableHeadStyle} 
                                    align="center">
                            Итого
                        </TableCell>
                        <TableCell sx={tableCellStyle} align="right">
                            {typeof investment_detail_total.history === 'number' ? investment_detail_total.history.toLocaleString() : "-"}
                                        {}
                        </TableCell>
                        <TableCell sx={tableCellStyle}
                                    align="right">
                                        {investment_detail_total.sum_in.toLocaleString()}
                        </TableCell>
                        <TableCell sx={tableCellStyle}
                                    align="right">
                                        {investment_detail_total.sum_out.toLocaleString()}
                        </TableCell>
                    </TableRow>                        
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
        <Container sx={{ mt: "1rem", mb: "2rem", width: 320 }} align="center">
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

        <DialogModal triggerToOpen={openHistory} 
                     funcToCloseOk={handleAddHistory}
                     funcToCloseCancel={handleCloseHistory}
                     dialogTitle="Зафиксировать"
                     dialogContentText="Введите сумму для фиксации на текущую дату"
        />

        <DialogModal triggerToOpen={openDeposit} 
                     funcToCloseOk={handleAddDeposit}
                     funcToCloseCancel={handleCloseDeposit}
                     dialogTitle="Внести"
                     dialogContentText="Введите вносимую сумму и комментарий"
                     commentNeed
        />

        <DialogModal triggerToOpen={openCredit} 
                     funcToCloseOk={handleAddCredit}
                     funcToCloseCancel={handleCloseCredit}
                     dialogTitle="Снять"
                     dialogContentText="Введите снимаемую сумму и комментарий"
                     commentNeed
        />
        </>
    );  
}

export default InvestmentDetail;
