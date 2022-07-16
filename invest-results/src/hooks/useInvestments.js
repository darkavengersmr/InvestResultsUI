import axios from "axios";
import { useCallback, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom";

import { investmentLoaded, investmentRequested, investmentError, 
         userLogOut, setNotification } from "../redux-store/actions"
         
import useCategories from "./useCategories";

function fetchInvestments({ token, params }) {        
    return axios({
      method: 'get',
        url: "/users/investment_items/",
      headers: {
          "accept": "application/json",
          "Authorization": "Bearer " + token
      },
      params: params 
    })
  };

function createInvestment({ token, params, data }) {
    return axios({
      method: 'post',
        url: "/users/investment_items/",
      headers: {
          "accept": "application/json",
          "Authorization": "Bearer " + token
      },
      params: params,
      data: data 
    })        
  }

function fetchDeactivateInvestment({ token, params }) {        
    return axios({
      method: 'delete',
        url: "/users/investment_items/",
      headers: {
          "accept": "application/json",
          "Authorization": "Bearer " + token
      },
      params: params 
    })
  };

const useInvestments = (id) => {

    const { investments,
        categories,        
        profile,
        loading,
        error } = useSelector((state) => state);

    const { getCategories } = useCategories();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onError = useCallback((error) => {
        if (error.response.status === 401) {
            dispatch(userLogOut());
            navigate('/login');
        } else {
            dispatch(investmentError(error));
        }
    }, [dispatch, navigate]);

    const getInvestments = useCallback(() => {        
        if (investments.length === 0) {
            dispatch(investmentRequested());
            fetchInvestments({ token: profile.token, 
                                        params: { user_id: profile.id }})
                .then((response) => {
                    dispatch(investmentLoaded(response.data.investments));
                })
                .catch((error) => onError(error));
        }
    // eslint-disable-next-line
    }, [investments.length]);

    const addInvestment = useCallback(({description, category_id}) => {
        dispatch(investmentRequested());
        createInvestment({ token: profile.token, 
                                      params: { user_id: profile.id },
                                      data: { description, 
                                              category_id,
                                              is_active: true } 
                                })
        .then((response) => { const new_investment = {...response.data, sum:0, proc: 0 }
                              const updated_investments = [...investments, new_investment]                              
                              dispatch(investmentLoaded(updated_investments));

        })
        .catch((error) => onError(error));
    // eslint-disable-next-line
    }, [investments]);

    const deactivateInvestment = useCallback((is_active) => {
        fetchDeactivateInvestment({ token: profile.token, 
            params: { user_id: profile.id, investment_id: id},            
         })
        .then(() => { dispatch(setNotification({
                text: is_active ? 'Инвестиция деактивирована' : 'Инвестиция активирована',
                type: "success"
            }));            
            const updated_investments = investments.map((item) => 
                            item.id === parseInt(id) ? {...item, is_active: !is_active} : item)
                       
            dispatch(investmentLoaded([...updated_investments]));
            
        })
        .catch(() => { dispatch(setNotification({
            text: 'Операция не выполнена',
            type: "error"
        }))
    });
    // eslint-disable-next-line
    }, [investments]);

    useEffect(() => {
        getInvestments();
        getCategories();
    // eslint-disable-next-line
    }, []);

    return { investments, categories, loading, error, 
             getInvestments, addInvestment, deactivateInvestment };
}

export default useInvestments