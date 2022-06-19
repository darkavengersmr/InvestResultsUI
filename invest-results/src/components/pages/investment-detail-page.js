import React, { useContext, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'

import AppHeader from '../app-header';
import InvestmentDetail from '../investment-detail';
import Spinner from "../spinner"
import ErrorIndicator from '../error-indicator';
import { investmentLoaded, investmentRequested, investmentError,
         historyRequested, historyLoaded, historyError, 
         inOutRequested, inOutLoaded, inOutError, userLogOut } from "../../redux-store/actions"
import { ApiServiceContext } from "../invest-results-service-context";

const InvestmentDetailPage = () => {

    const { id } = useParams();

    const ApiService = useContext(ApiServiceContext);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const profile = useSelector((state) => state.profile);
    const investments = useSelector((state) => state.investments);
    const loading = useSelector((state) => state.loading);
    const error = useSelector((state) => state.error);

    useEffect(() => {
        dispatch(investmentRequested());
        ApiService.getInvestments({ token: profile.token, 
                                    params: { user_id: profile.id }})
            .then((response) => dispatch(investmentLoaded(response.data.investments)))
            .catch((error) => dispatch(investmentError(error)));
        
        dispatch(historyRequested());
        dispatch(inOutRequested());
        ApiService.getHistory({ token: profile.token, 
                                params: { user_id: profile.id, 
                                          investment_id: id }})
            .then((response) => dispatch(historyLoaded(response.data.history)))
            .catch((error) => dispatch(historyError(error)));
        ApiService.getInOut({ token: profile.token, 
                              params: { user_id: profile.id, 
                                        investment_id: id }})
            .then((response) => dispatch(inOutLoaded(response.data.in_out)))
            .catch((error) => {
                dispatch(inOutError(error));
                dispatch(investmentError(error));
                dispatch(userLogOut());
                navigate('/login');
            });        
    }, [ ApiService, dispatch, profile.token, profile.id, navigate, id ]);
         
    
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
        return <ErrorIndicator />
    }

    return (
        <>               
            <AppHeader name={description} />    
            <InvestmentDetail id={id} />
        </>
    )
};

export default InvestmentDetailPage;
