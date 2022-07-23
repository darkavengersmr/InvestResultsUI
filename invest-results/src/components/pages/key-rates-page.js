import React from 'react';
import AppHeader from "../app-header"
import Spinner from "../spinner"

import ErrorIndicator from '../error-indicator';
import { useKeyRates } from '../../hooks';
import KeyRates from '../key-rates';

const KeyRatesPage = () => {

    const { key_rates, loading, error, addKeyRate } = useKeyRates();

    if (loading) {            
        return <Spinner />
    }

    if (error) {            
        return <ErrorIndicator />
    }
    
    return (
        <div>
            <AppHeader name="Ключевая ставка ЦБ"  />            
            <KeyRates report={key_rates} addKeyRate={addKeyRate}/>
        </div>
    )
};

export default KeyRatesPage;
