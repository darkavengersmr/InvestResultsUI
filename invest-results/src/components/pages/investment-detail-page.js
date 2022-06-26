import React, { useContext, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'

import AppHeader from '../app-header';
import InvestmentDetail from '../investment-detail';
import Spinner from "../spinner"
import ErrorIndicator from '../error-indicator';
import { investmentLoaded, investmentRequested, investmentError,
         historyRequested, historyLoaded, historyError, historyAdd, 
         inOutRequested, inOutLoaded, inOutError, inOutAdd,
         reportLoaded, userLogOut } from "../../redux-store/actions"
import { ApiServiceContext } from "../invest-results-service-context";

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
    
    useEffect(() => {
        if (investments.length === 0) {
            dispatch(investmentRequested());
            ApiService.getInvestments({ token: profile.token, 
                                        params: { user_id: profile.id }})
                .then((response) => dispatch(investmentLoaded(response.data.investments)))
                .catch((error) => {dispatch(investmentError(error));
                                   dispatch(userLogOut());
                                   navigate('/login');
                });
        }

        if (history.length === 0 || history[0].investment_id !== parseInt(id) ) {            
            dispatch(historyRequested());        
            ApiService.getHistory({ token: profile.token, 
                                    params: { user_id: profile.id, 
                                            investment_id: id }})
                .then((response) => dispatch(historyLoaded(response.data.history)))
                .catch((error) => dispatch(historyError(error)));
        }

        if (inout.length === 0 || inout[0].investment_id !== parseInt(id) ) {
            dispatch(inOutRequested());
            ApiService.getInOut({ token: profile.token, 
                                params: { user_id: profile.id, 
                                            investment_id: id }})
                .then((response) => dispatch(inOutLoaded(response.data.in_out)))
                .catch((error) => dispatch(inOutError(error)));
        }
    // eslint-disable-next-line    
    }, [ ApiService, dispatch, profile.token, profile.id, navigate, id, investments.length,
        history.length, inout.length ]);
    
    const addHistory = (sum) => {        
        ApiService.createHistory({ token: profile.token, 
                                   params: { user_id: profile.id },
                                   data: { investment_id: id, sum: sum } 
                                })
        .then((response) => { dispatch(historyAdd(response.data));
                              dispatch(reportLoaded([]));
                              dispatch(investmentLoaded([]));
        })
        .catch((error) => dispatch(historyError(error)));
    }
    
    const addInOut = (sum, comment) => {
        ApiService.createInOut({ token: profile.token, 
            params: { user_id: profile.id },
            data: { investment_id: id, sum: sum, description: comment } 
         })
        .then((response) => { dispatch(inOutAdd(response.data));
                              dispatch(reportLoaded([]));
                              dispatch(investmentLoaded([]));
        })
        .catch((error) => dispatch(inOutError(error)));
    }

    if (loading) {            
        return <Spinner />
    }

    if (error) {            
        return <ErrorIndicator />
    }
    
    let description;
    try {
        const investment_item = investments.filter((investment_item) => 
                                                    investment_item.id === parseInt(id));
        
        description = investment_item[0].description;       
        
    } catch {
        return <Spinner />
    }

    return (
        <>               
            <AppHeader name={description} />    
            <InvestmentDetail id={id} addHistory={addHistory} addInOut={addInOut} />
        </>
    )
};

export default InvestmentDetailPage;
