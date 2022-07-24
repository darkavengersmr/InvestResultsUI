import React, { useCallback, useMemo, useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useTheme } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';

import InvestmentDetailItem from "../investment-detail-item"
import { DialogModal, ConfirmModal } from '../dialog-modal';

import Spinner from "../spinner"
import ErrorIndicator from '../error-indicator';
import { useDispatch } from 'react-redux'
import { setContextMenu } from "../../redux-store/actions"

const InvestmentDetail = ({ id,
                            investment_detail_item,
                            investment_detail_total,
                            deactivateInvestment, 
                            is_active,     
                            loadingInvestments,
                            errorInvestments,
                            loadingHistory,
                            errorHistory,
                            addHistory,                             
                            loadingInOut, 
                            errorInOut, 
                            addInOut,                            
                            loadingReport,
                            errorReport }) => {

    const theme = useTheme();
    
    const portraitScreen = useMediaQuery('(orientation: portrait)');

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

    const tableHeadStyle = useMemo(() => ({ p: "12px 1px 12px 1px", 
                                            fontSize: "0.9rem", 
                                            background: theme.palette.mode === 'dark' 
                                                        ? "#000000" 
                                                        : "#DDDDDD" 
    }), [theme.palette.mode]);

    if (loadingInvestments || loadingHistory || loadingInOut || loadingReport) {            
        return <Spinner />
    }

    if (errorInvestments || errorHistory || errorInOut || errorReport) {            
        return <ErrorIndicator />
    }

    if (Object.keys(investment_detail_item).length === 0) {
        return (            
            <>
            <Container sx={{ mt: "1rem", width: '100%' }} maxWidth="sm">
                <Typography variant="body" component="div" align="center">
                Нет данных
                </Typography>
            </Container>
            <ModalDialogs />
            </>
        )};

    return (
        <>
        <Container sx={{ mt: "1rem", width: '100%'}} maxWidth={portraitScreen ? 'xs' : 'xl'}>
        <TableContainer component={Paper} sx={{ p: "4px" }}>
            <Table aria-label="customized table" sx={{ minWidth: !portraitScreen ? 600 : 320 }}>
                <TableBody>
                    <TableRow>                        
                        <TableCell sx={tableHeadStyle} 
                                    align="left">
                            Дата
                        </TableCell>
                        <TableCell sx={tableHeadStyle}
                                    align="right">
                                        Приход
                        </TableCell>
                        <TableCell sx={tableHeadStyle}
                                    align="right">
                                        Расход
                        </TableCell> 

                        {!portraitScreen 
                        ? <TableCell sx={tableHeadStyle} align="right">План</TableCell> 
                        : false
                        }
                        
                        <TableCell sx={tableHeadStyle} 
                                    align="right">
                                        Факт
                        </TableCell>                       

                        {!portraitScreen 
                        ? <TableCell sx={tableHeadStyle} align="right">Прирост</TableCell> 
                        : false
                        }

                        {!portraitScreen 
                        ? <TableCell sx={tableHeadStyle} align="right">Прирост%</TableCell> 
                        : false
                        }

                        {!portraitScreen 
                        ? <TableCell sx={tableHeadStyle} align="right">ОтИндекса%</TableCell> 
                        : false
                        }
                    </TableRow>
                        {                
                        Object.keys(investment_detail_item).map(function(key, index) {                    
                            return <InvestmentDetailItem 
                                        key={key} 
                                        date={key} 
                                        data={investment_detail_item[key]}
                                        portraitScreen={portraitScreen}
                                        bg={index % 2 === 0 ? 'odd' : 'noodd'} />
                            })
                        }
                    <TableRow>
                        <TableCell sx={tableHeadStyle} 
                                    align="left">
                            Итого
                        </TableCell>
                        <TableCell sx={tableHeadStyle}
                                    align="right">
                                        {investment_detail_total.sum_in.toLocaleString()}
                        </TableCell>
                        <TableCell sx={tableHeadStyle}
                                    align="right">
                                        {investment_detail_total.sum_out.toLocaleString()}
                        </TableCell> 

                        {!portraitScreen
                        ? <TableCell sx={tableHeadStyle}
                                    align="right">
                                        {investment_detail_total.sum_plan.toLocaleString()}
                          </TableCell>
                        : false
                        }

                        <TableCell sx={tableHeadStyle} align="right">
                            {typeof investment_detail_total.history === 'number' ? investment_detail_total.history.toLocaleString() : "-"}
                        </TableCell>
                       
                        {!portraitScreen
                        ? <TableCell sx={tableHeadStyle}
                                    align="right">
                                        {investment_detail_total.sum_delta_rub.toLocaleString()}
                          </TableCell>
                        : false
                        }

                        {!portraitScreen
                        ? <TableCell sx={tableHeadStyle}
                                    align="right">
                                        {investment_detail_total.sum_delta_proc.toLocaleString()+"%"}
                          </TableCell>
                        : false
                        }

                        {!portraitScreen    
                        ? <TableCell sx={tableHeadStyle}
                                    align="right">
                                        {investment_detail_total.ratio_deposit_index.toLocaleString()+"%"}
                          </TableCell>
                        : false
                        }
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
