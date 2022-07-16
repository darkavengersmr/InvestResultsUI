import React from 'react';
import { useSelector } from 'react-redux'

import Spinner from "../spinner"
import ErrorIndicator from '../error-indicator';
import AppHeader from '../app-header';
import InvestmentList from '../investment-list';
import { useInvestments } from '../../hooks';

const InvestmentListPage = () => {

    const { investments, categories, loading, error, addInvestment} = useInvestments();
    const { only_active_visible } = useSelector((state) => state);
    
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
