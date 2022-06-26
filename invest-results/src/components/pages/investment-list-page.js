import React, { useContext, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'

import AppHeader from '../app-header';
import InvestmentList from '../investment-list';
import Spinner from "../spinner"
import ErrorIndicator from '../error-indicator';
import { investmentLoaded, investmentRequested, investmentError,
         categoriesLoaded, categoriesRequested, categoriesError, 
         userLogOut } from "../../redux-store/actions"
import { ApiServiceContext } from "../invest-results-service-context";

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
    
    const addInvestment = ({description, category_id}) => {
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
    }

   useEffect(() => {
        if (investments.length === 0) {
            dispatch(investmentRequested());
            ApiService.getInvestments({ token: profile.token, 
                                        params: { user_id: profile.id }})
                .then((response) => dispatch(investmentLoaded(response.data.investments)))
                .catch((error) => {
                    dispatch(investmentError(error));
                    dispatch(userLogOut());
                    navigate('/login'); 
                });
        }
        if (categories.length === 0) { 
            dispatch(categoriesRequested());
            ApiService.getCategories({ token: profile.token, 
                                    params: { user_id: profile.id }})
                .then((response) => dispatch(categoriesLoaded(response.data.categories)))
                .catch((error) => { dispatch(categoriesError(error));
                                    dispatch(userLogOut());
                                    navigate('/login'); 
                });
        }
    }, [ ApiService, dispatch, profile.token, profile.id, navigate, investments.length,
        categories.length ])            

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
