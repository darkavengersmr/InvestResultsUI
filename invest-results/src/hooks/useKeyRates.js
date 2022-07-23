import axios from "axios";
import { useCallback, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom";

import { keyRatesRequested, keyRatesLoaded, keyRatesError,
    userLogOut} from "../redux-store/actions"

function fetchKeyRates({ token, params }) {
    return axios({
      method: 'get',
        url: "/api/key_rates/",
      headers: {
          "accept": "application/json",
          "Authorization": "Bearer " + token
      },
      params: params 
    })        
  }

  function createKeyRate({ token, params, data }) {
    return axios({
      method: 'post',
        url: "/api/key_rates/",
      headers: {
          "accept": "application/json",
          "Authorization": "Bearer " + token
      },
      params: params,
      data: data 
    })        
  }

const useKeyRates = () => {

    const { key_rates,
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
            dispatch(keyRatesError(error));
        }
    // eslint-disable-next-line
    }, []);

    const getKeyRates = useCallback(() => {        
        if (key_rates && key_rates.length === 0) { 
            dispatch(keyRatesRequested());            
            fetchKeyRates({ token: profile.token, 
                                    params: { user_id: profile.id }})
                .then((response) => dispatch(keyRatesLoaded(response.data.key_rates)))
                .catch((error) => onError(error));
        }
    // eslint-disable-next-line
    }, [key_rates]);

    const addKeyRate = useCallback(({ key_rate, date }) => {        
        dispatch(keyRatesRequested());
        createKeyRate({ token: profile.token, 
                                   params: { user_id: profile.id },
                                   data: { key_rate, date } 
                                })
        .then((response) => { const updated_key_rates = [...key_rates, response.data];                        
            dispatch(keyRatesLoaded(updated_key_rates));
        })
        .catch((error) => onError(error));
    // eslint-disable-next-line
    }, [key_rates]);

    useEffect(() => {
        getKeyRates();
    // eslint-disable-next-line     
    }, []);

    return { key_rates, loading, error, getKeyRates, addKeyRate };
}

export default useKeyRates