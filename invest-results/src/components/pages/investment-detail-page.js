import React, { useCallback, useContext, useEffect, useMemo } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'

import AppHeader from '../app-header';
import InvestmentDetail from '../investment-detail';
import Spinner from "../spinner"
import ErrorIndicator from '../error-indicator';
import { investmentLoaded, investmentRequested, investmentError,
         historyRequested, historyLoaded, historyError, historyAdd, 
         inOutRequested, inOutLoaded, inOutError, inOutAdd,
         reportLoaded, userLogOut, setNotification } from "../../redux-store/actions"
import { ApiServiceContext } from "../app-contexts";

const InvestmentDetailPage = () => {

    const { id } = useParams();

    const ApiService = useContext(ApiServiceContext);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { profile, 
            investments, 
            history, 
            inout, 
            loading, 
            error } = useSelector((state) => state);
    
    const { description, is_active } = useMemo(() => {
        //console.log(investments)
        try {
            const investment_item = investments.filter((investment_item) => 
                                                        investment_item.id === parseInt(id));
            //console.log(investment_item[0].is_active)
            return { description: investment_item[0].description, 
                     is_active: investment_item[0].is_active }
            
        } catch {
            //console.log(undefined)
            return { description: "Мои.Инвестиции", 
                     is_active: undefined }
        }
        
    }, [investments, id])

    useEffect(() => {

        const investments_request = new Promise(() => {
            if (investments.length === 0) {
                dispatch(investmentRequested());
                ApiService.getInvestments({ token: profile.token, 
                                            params: { user_id: profile.id }})
                    .then((response) => dispatch(investmentLoaded(response.data.investments)))
                    .catch((error) => {
                        if (error.response.status === 401) {
                            dispatch(userLogOut());
                            navigate('/login');
                        } else {
                            dispatch(investmentError(error));
                        }                                       
                    });
            }
          })
        
        const history_request = new Promise(() => {
            if (history.length === 0 || history[0].investment_id !== parseInt(id) ) {            
                dispatch(historyRequested());        
                ApiService.getHistory({ token: profile.token, 
                                        params: { user_id: profile.id, 
                                                investment_id: id }})
                    .then((response) => dispatch(historyLoaded(response.data.history)))
                    .catch((error) => {
                        if (error.response.status === 401) {
                            dispatch(userLogOut());
                            navigate('/login');
                        } else {
                            dispatch(historyError(error))
                        }                        
                    });
            }
        })

        const inout_request = new Promise(() => {
            if (inout.length === 0 || inout[0].investment_id !== parseInt(id) ) {
                dispatch(inOutRequested());
                ApiService.getInOut({ token: profile.token, 
                                    params: { user_id: profile.id, 
                                                investment_id: id }})
                    .then((response) => dispatch(inOutLoaded(response.data.in_out)))
                    .catch((error) => {
                        if (error.response.status === 401) {
                            dispatch(userLogOut());
                            navigate('/login');
                        } else {
                            dispatch(inOutError(error))
                        }                        
                    });
            }
        })

        Promise.all([investments_request, history_request, inout_request])        
    
    // eslint-disable-next-line    
    }, []);
    
    const addHistory = useCallback(({ sum, date }) => {        
        ApiService.createHistory({ token: profile.token, 
                                   params: { user_id: profile.id },
                                   data: { investment_id: id, sum, date } 
                                })
        .then((response) => { dispatch(historyAdd(response.data));
                              dispatch(reportLoaded([]));
                              dispatch(investmentLoaded([]));
        })
        .catch((error) => dispatch(historyError(error)));
    }, [ApiService, dispatch, id, profile.id, profile.token]);
    
    const addInOut = useCallback(({ sum, comment, date }) => {
        ApiService.createInOut({ token: profile.token, 
            params: { user_id: profile.id },
            data: { investment_id: id, description: comment, sum, date } 
         })
        .then((response) => { dispatch(inOutAdd(response.data));
                              dispatch(reportLoaded([]));
                              dispatch(investmentLoaded([]));
        })
        .catch((error) => dispatch(inOutError(error)));
    }, [ApiService, dispatch, id, profile.id, profile.token]);

    const deactivateInvestment = useCallback((is_active) => {
        ApiService.deactivateInvestment({ token: profile.token, 
            params: { user_id: profile.id, investment_id: id},            
         })
        .then(() => { dispatch(setNotification({
                text: is_active ? 'Инвестиция деактивирована' : 'Инвестиция активирована',
                type: "success"
            }));            
            const updated_investments = investments.map((item) => 
                            item.id === parseInt(id) ? {...item, is_active: !is_active} : item)
                       
            dispatch(investmentLoaded([...updated_investments]));
            
        })
        .catch(() => { dispatch(setNotification({
            text: 'Операция не выполнена',
            type: "error"
        }))
    });
    }, [ApiService, dispatch, id, profile.id, profile.token, investments]);

    if (loading) {            
        return <Spinner />
    }

    if (error) {            
        return <ErrorIndicator />
    }
    
    return (
        <>               
            <AppHeader name={description} />    
            <InvestmentDetail id={id} 
                              addHistory={addHistory} 
                              addInOut={addInOut}
                              deactivateInvestment={deactivateInvestment} 
                              is_active={is_active}
            />
        </>
    )
};

export default InvestmentDetailPage;
