import React, { useCallback, useMemo, useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Container from '@mui/material/Container';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import InvestmentDetailItem from "../investment-detail-item"
import { DialogModal, ConfirmModal } from '../dialog-modal';

import Spinner from "../spinner"
import ErrorIndicator from '../error-indicator';
import { useDispatch } from 'react-redux'
import { setContextMenu } from "../../redux-store/actions"

const compute_investment_detail = (history, inout, id) => {
    const investment_detail_item = {};
    const investment_detail_total = {history: null, sum_in: 0, sum_out: 0};

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

    const investment_detail_item_sorted = Object.keys(investment_detail_item).sort().reduce(
        (obj, key) => { 
            obj[key] = investment_detail_item[key]; 
            return obj;
        }, {});

    return { investment_detail_item: investment_detail_item_sorted, 
             investment_detail_total };
}

const tableHeadStyle = { p: "4px", fontSize: "1rem" };
const tableCellStyle = { p: "8px 1px 8px 1px", fontSize: "0.8rem" };

const InvestmentDetail = ({ id, 
                            deactivateInvestment, 
                            is_active, 
                            history,
                            loadingHistory,
                            errorHistory,
                            addHistory, 
                            inout, 
                            loadingInOut, 
                            errorInOut, 
                            addInOut }) => {

    const [ openHistory, setOpenHistory ] = useState(false);
    const [ openDeposit, setOpenDeposit ] = useState(false);
    const [ openCredit, setOpenCredit ] = useState(false);

    const [ openConfirm, setOpenConfirm ] = useState(false);    

    const handleConfirmOk = useCallback((is_active) => {        
        deactivateInvestment(is_active)
        setOpenConfirm(false);
    }, [deactivateInvestment]);

    const handleConfirmCancel = useCallback(() => {        
        setOpenConfirm(false);
    }, []);


    const handleCloseHistory = useCallback(() => {
        setOpenHistory(false);
    }, []);

    const handleAddHistory = useCallback(({sum, date}) => {        
        addHistory({sum, date});
        setOpenHistory(false);
    }, [addHistory]);

    const handleCloseDeposit = useCallback(() => {
        setOpenDeposit(false);
    }, []);

    const handleAddDeposit = useCallback(({sum, comment, date}) => {
        if (sum > 0 && comment.length > 0) {
            addInOut({ sum, comment, date });
            setOpenDeposit(false);
        }   
    }, [addInOut]);

    const handleCloseCredit = useCallback(() => {
        setOpenCredit(false);
    }, []);

    const handleAddCredit = useCallback(({sum, comment, date}) => {
        if (sum > 0 && comment.length > 0) {
            addInOut({ sum: -sum, comment, date });
            setOpenCredit(false);
        } 
    }, [addInOut]);
    
    const { investment_detail_item, investment_detail_total } = useMemo(() =>         
        compute_investment_detail(history, inout, id)
    , [history, inout, id])

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {        
        dispatch(setContextMenu([
            {
                description: "Зафиксировать сумму",
                action: () => {
                    setOpenHistory(true);
                }
            },
            {
                description: "Внести",
                action: () => {
                    setOpenDeposit(true);
                }
            },
            {
                description: "Снять",
                action: () => {
                    setOpenCredit(true);
                }
            },
            {
                description: "Отчет",
                action: () => {                    
                    navigate(`/reports/${id}`);
                }
            },
            {
                description: is_active ? 'В архив' : 'Вернуть из архива',
                action: () => {
                    setOpenConfirm(true);
                }
            }
        ])); 
    }, [dispatch, id, navigate, is_active, deactivateInvestment])

    const ModalDialogs = useCallback(() => { 
        return (
        <>
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
    )}, [openHistory, openDeposit, openCredit, handleAddCredit, handleAddDeposit, handleAddHistory, 
        handleCloseCredit, handleCloseDeposit, handleCloseHistory]);

    if (loadingHistory || loadingInOut) {            
        return <Spinner />
    }

    if (errorHistory || errorInOut) {            
        return <ErrorIndicator />
    }

    if (Object.keys(investment_detail_item).length === 0) {
        return (            
            <>
            <Container sx={{ mt: "1rem", width: 320 }}>
                <Typography variant="body" component="div" align="center">
                Нет данных
                </Typography>
            </Container>
            <ModalDialogs />
            </>
        )};

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

        <ModalDialogs /> 

        <ConfirmModal triggerToOpen={openConfirm} 
                      funcToCloseOk={() => handleConfirmOk(is_active)}
                      funcToCloseCancel={handleConfirmCancel}
                      dialogTitle={is_active ? 'В архив' : 'Вернуть из архива'}
                      dialogContentText={is_active ? 'Сделать инвестицию архивной?' : 'Вернуть инвестицию из архива?'}
        />       
        </>
    );  
}

export default InvestmentDetail;
