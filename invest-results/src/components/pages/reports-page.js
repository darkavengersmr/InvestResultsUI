import React, { useEffect } from 'react';
import { useParams } from "react-router-dom";
import AppHeader from "../app-header"
import Reports from '../reports';
import Spinner from "../spinner"

import ErrorIndicator from '../error-indicator';
import { useReport } from '../../hooks';

const ReportsPage = () => {
    
    const { id } = useParams();
    const { report, loading, error, getXLSXReport } = useReport();

    useEffect(() => getXLSXReport(), [ getXLSXReport ])

    if (loading) {            
        return <Spinner />
    }

    if (error) {            
        return <ErrorIndicator />
    }
    
    return (
        <div>
            <AppHeader name="Отчеты"  />            
            <Reports report={report} id={id} />
        </div>
    )
};

export default ReportsPage;
