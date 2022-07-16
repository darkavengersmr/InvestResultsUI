import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux'
import AppHeader from "../app-header"
import Spinner from "../spinner"
import { setContextMenu } from "../../redux-store/actions"

import ErrorIndicator from '../error-indicator';
import { useReport } from '../../hooks';
import KeyRates from '../key-rates';

const KeyRatesPage = () => {

    const dispatch = useDispatch();
    const { report, loading, error } = useReport();

    useEffect(() => { 
        dispatch(setContextMenu([]));
    // eslint-disable-next-line
    }, [])
    
    if (loading) {            
        return <Spinner />
    }

    if (error) {            
        return <ErrorIndicator />
    }
    
    return (
        <div>
            <AppHeader name="Ключевая ставка ЦБ"  />            
            <KeyRates report={report}/>
        </div>
    )
};

export default KeyRatesPage;
