import React, { useMemo } from 'react';
import AppHeader from "../app-header"
import Spinner from "../spinner"

import ErrorIndicator from '../error-indicator';
import { useKeyRates } from '../../hooks';
import KeyRates from '../key-rates';

const KeyRatesPage = () => {

    const { key_rates: report_key_rates, loading, error, addKeyRate } = useKeyRates();

    const { labels, key_rates } = useMemo(() => {

        let labels = [];
        let key_rates = [];

        if (report_key_rates && report_key_rates.length>0) {
            const reportSortedByDate = report_key_rates.sort((a, b) => a.date > b.date ? 1 : -1);
            labels = reportSortedByDate.map((el) => el.date.slice(0, 7));
            key_rates = reportSortedByDate.map((el) => el.key_rate);;    
        }
                            
        return { labels, key_rates }
    // eslint-disable-next-line    
    }, [report_key_rates]);

    if (loading) {            
        return <Spinner />
    }

    if (error) {            
        return <ErrorIndicator />
    }
    
    return (
        <div>
            <AppHeader name="Ключевая ставка ЦБ"  />            
            <KeyRates labels={labels}
                      key_rates={key_rates} 
                      addKeyRate={addKeyRate}/>
        </div>
    )
};

export default KeyRatesPage;
