import axios from "axios";
import { useCallback, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom";

import { historyRequested, historyLoaded, historyError, historyAdd, 
         reportLoaded, investmentLoaded, userLogOut } from "../redux-store/actions"

function fetchHistory({ token, params }) {
    return axios({
      method: 'get',
        url: "/users/investment_history/",
      headers: {
          "accept": "application/json",
          "Authorization": "Bearer " + token
      },
      params: params 
    })
  }

  function createHistory({ token, params, data }) {
    return axios({
      method: 'post',
        url: "/users/investment_history/",
      headers: {
          "accept": "application/json",
          "Authorization": "Bearer " + token
      },
      params: params,
      data: data 
    })        
  }

const useHistory = (id) => {

    const { profile, 
            history, 
            loading, 
            error } = useSelector((state) => state);
    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onError = useCallback((error) => {
        if (error.response.status === 401) {
            dispatch(userLogOut());
            navigate('/login');
        } else {
            dispatch(historyError(error))
        }
    // eslint-disable-next-line
    }, []);

    const getHistory = useCallback(() => {        
        if (history.length === 0 || history[0].investment_id !== parseInt(id) ) {
            dispatch(historyRequested());        
            fetchHistory({ token: profile.token, 
                                    params: { user_id: profile.id, 
                                            investment_id: id }})
                .then((response) => dispatch(historyLoaded(response.data.history)))
                .catch((error) => onError(error));
        }
    // eslint-disable-next-line
    }, [history, id]);

    const addHistory = useCallback(({ sum, date }) => {        
        createHistory({ token: profile.token, 
                                   params: { user_id: profile.id },
                                   data: { investment_id: id, sum, date } 
                                })
        .then((response) => { dispatch(historyAdd(response.data));
                              dispatch(reportLoaded([]));
                              dispatch(investmentLoaded([]));
        })
        .catch((error) => dispatch(historyError(error)));
    // eslint-disable-next-line
    }, []);


    useEffect(() => {
        getHistory();
    // eslint-disable-next-line
    }, []);

    return { history, loading, error, getHistory, addHistory };
}

export default useHistory