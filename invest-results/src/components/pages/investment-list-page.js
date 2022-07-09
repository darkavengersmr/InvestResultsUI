import React, { useCallback, useContext, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'

import AppHeader from '../app-header';
import InvestmentList from '../investment-list';
import Spinner from "../spinner"
import ErrorIndicator from '../error-indicator';
import { investmentLoaded, investmentRequested, investmentError,
         categoriesLoaded, categoriesRequested, categoriesError, 
         userLogOut } from "../../redux-store/actions"
import { ApiServiceContext } from "../app-contexts";

const InvestmentListPage = () => {
    
    const ApiService = useContext(ApiServiceContext);
    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { investments,
            categories,
            only_active_visible,
            profile,
            loading,
            error } = useSelector((state) => state);
    
    const addInvestment = useCallback(({description, category_id}) => {
        dispatch(investmentRequested());
        ApiService.createInvestment({ token: profile.token, 
                                      params: { user_id: profile.id },
                                      data: { description, 
                                              category_id,
                                              is_active: true } 
                                })
        .then((response) => { const new_investment = {...response.data, sum:0, proc: 0 }
                              const updated_investments = [...investments, new_investment]                              
                              dispatch(investmentLoaded(updated_investments));

        })
    }, [ApiService, dispatch, investments, profile.id, profile.token]);

   useEffect(() => {
        if (investments.length === 0) {
            dispatch(investmentRequested());
            ApiService.getInvestments({ token: profile.token, 
                                        params: { user_id: profile.id }})
                .then((response) => {
                    dispatch(investmentLoaded(response.data.investments));
                })
                .catch((error) => {                    
                    if (error.response.status === 401) {
                        dispatch(userLogOut());
                        navigate('/login');
                    } else {
                        dispatch(investmentError(error));
                    }
                });
        }
        if (categories.length === 0) { 
            dispatch(categoriesRequested());
            ApiService.getCategories({ token: profile.token, 
                                    params: { user_id: profile.id }})
                .then((response) => dispatch(categoriesLoaded(response.data.categories)))
                .catch((error) => { 
                    if (error.response.status === 401) {
                        dispatch(userLogOut());
                        navigate('/login');
                    } else {
                        dispatch(categoriesError(error));
                    }
                });
        }
    // eslint-disable-next-line
    }, [ ])            

    if (loading) {            
        return <Spinner />
    }

    if (error) {            
        return <ErrorIndicator />
    }
    
    return (
            <>
            <AppHeader name="Мои.Инвестиции" />
            {only_active_visible ? 
                <InvestmentList categories={categories} 
                                investments={investments.filter((item) => 
                                                        item.is_active === true)}
                                addInvestment={addInvestment} 
                />                
                :
                <InvestmentList categories={categories} 
                                investments={investments} 
                                addInvestment={addInvestment} 
                />                
            }
            
            </>
    )
};

export default InvestmentListPage;
