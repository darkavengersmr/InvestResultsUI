import React, { useContext, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom";
import AppHeader from "../app-header"
import Spinner from "../spinner"
import ErrorIndicator from '../error-indicator';
import { reportLoaded, reportRequested, reportError, 
         userLogOut, setContextMenu } from "../../redux-store/actions"
import { ApiServiceContext } from "../app-contexts";
import KeyRates from '../key-rates';

const KeyRatesPage = () => {

    const ApiService = useContext(ApiServiceContext);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { report,
            profile,
            loading,
            error } = useSelector((state) => state);

    useEffect(() => {        
        if (report.length === 0) {
            dispatch(reportRequested());        
            ApiService.getJSONReports({ token: profile.token,
                                        params: { user_id: profile.id } })
                .then((response) => dispatch(reportLoaded(response.data.investment_report)))
                .catch((error) => {
                    if (error.response.status === 401) {
                        dispatch(userLogOut());
                        navigate('/login');
                    } else {
                        dispatch(reportError(error));
                    }                    
                });
        }
    // eslint-disable-next-line 
    }, [])

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
