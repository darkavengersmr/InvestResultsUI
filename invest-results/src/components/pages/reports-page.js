import React, { useContext, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useParams } from "react-router-dom";
import AppHeader from "../app-header"
import Reports from '../reports';
import Spinner from "../spinner"
import ErrorIndicator from '../error-indicator';
import { reportLoaded, reportRequested, reportError, userLogOut } from "../../redux-store/actions"
import { ApiServiceContext } from "../app-contexts";

import { setContextMenu } from "../../redux-store/actions"

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
        dispatch(setContextMenu([
            {
                description: "Отчет в Excel",
                action: () => {                    
                    ApiService.getXLSXReports({ token: profile.token,
                                                params: { user_id: profile.id } })
                    .then((response) => {
                        const url = window.URL.createObjectURL(new Blob([response.data]));
                        const link = document.createElement("a");
                        link.href = url;
                        let date = new Date();
                        let filename = 'investresults' + date.toISOString().split('T')[0] + ".xlsx";
                        link.setAttribute("download", filename);
                        document.body.appendChild(link);
                        link.click();
                    })
                    .catch((error) => {
                        if (error.response.status === 401) {
                            dispatch(userLogOut());
                            navigate('/login');
                        } else {
                            dispatch(reportError(error));
                        }                    
                    });
                }
            }            
        ]));
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
            <AppHeader name="Отчеты"  />            
            <Reports report={report} id={id} />
        </div>
    )
};

export default ReportsPage;
