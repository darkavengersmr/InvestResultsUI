import React, { useContext, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useParams } from "react-router-dom";
import AppHeader from "../app-header"
import Reports from '../reports';
import Spinner from "../spinner"
import ErrorIndicator from '../error-indicator';
import { reportLoaded, reportRequested, reportError, userLogOut } from "../../redux-store/actions"
import { ApiServiceContext } from "../invest-results-service-context";

const ReportsPage = () => {
    
    const { id } = useParams();    

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
                    dispatch(reportError(error));                
                    dispatch(userLogOut());
                    navigate('/login'); 
                });
        }
    }, [ ApiService, dispatch, navigate, profile, report.length ])

    if (loading) {            
        return <Spinner />
    }

    if (error) {            
        return <ErrorIndicator />
    }
    
    return (
        <div>
            <AppHeader name="Отчеты"/>            
            <Reports report={report} id={id} />
        </div>
    )
};

export default ReportsPage;
