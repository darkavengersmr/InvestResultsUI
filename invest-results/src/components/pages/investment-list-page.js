import React, { useContext, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'

import AppHeader from '../app-header';
import InvestmentList from '../investment-list';
import Spinner from "../spinner"
import ErrorIndicator from '../error-indicator';
import { investmentLoaded, investmentRequested, investmentError, 
         userLogOut } from "../../redux-store/actions"
import { ApiServiceContext } from "../invest-results-service-context";

const InvestmentListPage = () => {
    
    const ApiService = useContext(ApiServiceContext);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const investments = useSelector((state) => state.investments);
    const profile = useSelector((state) => state.profile);
    const loading = useSelector((state) => state.loading);
    const error = useSelector((state) => state.error);

    useEffect(() => {      
        dispatch(investmentRequested());

        ApiService.getInvestments({ token: profile.token, 
                                    params: { user_id: profile.id }})
            .then((response) => dispatch(investmentLoaded(response.data.investments)))
            .catch((error) => {
                dispatch(investmentError(error));
                dispatch(userLogOut());
                navigate('/login'); 
            });
    }, [ ApiService, dispatch, profile.token, profile.id, navigate ])            

    if (loading) {            
        return <Spinner />
    }

    if (error) {            
        return <ErrorIndicator />
    }
    
    return (
            <>
            <AppHeader name="Мои.Инвестиции" />               
            <InvestmentList investments={investments}/>
            </>
    )
};

export default InvestmentListPage;
