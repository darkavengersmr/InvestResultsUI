import axios from "axios";
import { useCallback, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom";

import { reportLoaded, reportRequested, reportError, 
         userLogOut, setContextMenu } from "../redux-store/actions"

function fetchJSONReports({ token, params }) {        
      return axios({
        method: 'get',
          url: "/users/reports/json/",
        headers: {
            "accept": "application/json",
            "Authorization": "Bearer " + token
        },
        params: params 
      })
    };

function fetchXLSXReports({ token, params }) {
    return axios({
    method: 'get',
    url: "/users/reports/xlsx/",
    responseType: "blob",
    headers: {
        "accept": "application/json",
        "Authorization": "Bearer " + token
    },
    params: params 
    })
};

const useReport = () => {

    const { report,
        profile,
        loading,
        error } = useSelector((state) => state);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onError = useCallback((error) => {
        if (error.response.status === 401) {
            dispatch(userLogOut());
            navigate('/login');
        } else {
            dispatch(reportError(error));
        }
    // eslint-disable-next-line
    }, []);

    const getJSONReport = useCallback(() => {     
        if (report.length === 0) {
            dispatch(reportRequested());        
            fetchJSONReports({ token: profile.token,
                               params: { user_id: profile.id } })
                .then((response) => dispatch(reportLoaded(response.data.investment_report)))
                .catch((error) => onError(error));
        }
    // eslint-disable-next-line
    }, []);

    const getXLSXReport = useCallback(() => {
        dispatch(setContextMenu([
            {
                description: "Отчет в Excel",
                action: () => {                     
                    fetchXLSXReports({ token: profile.token,
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
                    .catch((error) => onError(error));
                }
            }            
        ]));
    // eslint-disable-next-line
    }, [])

    useEffect(() => {
        getJSONReport();
        getXLSXReport();
    // eslint-disable-next-line
    }, []);

    return { report, loading, error, getJSONReport, getXLSXReport };
}

export default useReport