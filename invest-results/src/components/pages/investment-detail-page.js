import React, { useMemo } from 'react';
import { useParams } from "react-router-dom";

import AppHeader from '../app-header';
import InvestmentDetail from '../investment-detail';
import Spinner from "../spinner"
import ErrorIndicator from '../error-indicator';

import { useInvestments, useHistory, useInOut } from '../../hooks';

const InvestmentDetailPage = () => {

    const { id } = useParams();

    const { investments, loading, error, deactivateInvestment} = useInvestments(id);
    const { history, loading: loadingHistory, error: errorHistory, addHistory } = useHistory(id)
    const { inout, loading: loadingInOut, error: errorInOut, addInOut } = useInOut(id)

    const { description, is_active } = useMemo(() => {

        try {
            const investment_item = investments.filter((investment_item) => 
                                                        investment_item.id === parseInt(id));

            return { description: investment_item[0].description, 
                     is_active: investment_item[0].is_active }
            
        } catch {
            return { description: "Мои.Инвестиции", 
                     is_active: undefined }
        }
        
    }, [investments, id])

    
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
                              deactivateInvestment={deactivateInvestment} 
                              is_active={is_active}
                              history={history}
                              loadingHistory={loadingHistory}
                              errorHistory={errorHistory}
                              addHistory={addHistory}
                              inout={inout} 
                              loadingInOut={loadingInOut} 
                              errorInOut={errorInOut}
                              addInOut={addInOut}
            />
        </>
    )
};

export default InvestmentDetailPage;
