import axios from "axios";
import { useCallback, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom";

import { inOutRequested, inOutLoaded, inOutError, inOutAdd,
         reportLoaded, investmentLoaded, userLogOut } from "../redux-store/actions"

function fetchInOut({ token, params }) {
    return axios({
      method: 'get',
        url: "/api/users/investment_inout/",
      headers: {
          "accept": "application/json",
          "Authorization": "Bearer " + token
      },
      params: params 
    })
  }

  function createInOut({ token, params, data }) {
    return axios({
      method: 'post',
        url: "/api/users/investment_inout/",
      headers: {
          "accept": "application/json",
          "Authorization": "Bearer " + token
      },
      params: params,
      data: data 
    })        
  }

const useInOut = (id) => {

    const { profile, 
            inout,  
            loading, 
            error } = useSelector((state) => state);
    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onError = useCallback((error) => {
        if (error.response.status === 401) {
            dispatch(userLogOut());
            navigate('/login');
        } else {
            dispatch(inOutError(error))
        }
    // eslint-disable-next-line
    }, []);

    const getInOut = useCallback(() => {        
        if (inout.length === 0 || inout[0].investment_id !== parseInt(id) ) {            
            dispatch(inOutRequested());
            fetchInOut({ token: profile.token, 
                    params: { user_id: profile.id, 
                              investment_id: id }})
                .then((response) => dispatch(inOutLoaded(response.data.in_out)))
                .catch((error) => onError(error));
        }
    // eslint-disable-next-line
    }, [inout, id]);

    const addInOut = useCallback(({ sum, comment, date }) => {
        createInOut({ token: profile.token, 
                      params: { user_id: profile.id },
                      data: { investment_id: id, description: comment, sum, date } 
         })
        .then((response) => { dispatch(inOutAdd(response.data));
                              dispatch(reportLoaded([]));
                              dispatch(investmentLoaded([]));
        })
        .catch((error) => dispatch(inOutError(error)));
    // eslint-disable-next-line
    }, []);


    useEffect(() => {
        getInOut();
    // eslint-disable-next-line
    }, []);

    return { inout, loading, error, getInOut, addInOut };
}

export default useInOut