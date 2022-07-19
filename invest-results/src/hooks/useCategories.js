import axios from "axios";
import { useCallback, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom";

import { categoriesLoaded, categoriesRequested, categoriesError, 
    userLogOut} from "../redux-store/actions"

function fetchCategories({ token, params }) {
    return axios({
      method: 'get',
        url: "/api/users/categories/",
      headers: {
          "accept": "application/json",
          "Authorization": "Bearer " + token
      },
      params: params 
    })        
  }

  function createCategory({ token, params, data }) {
    return axios({
      method: 'post',
        url: "/api/users/categories/",
      headers: {
          "accept": "application/json",
          "Authorization": "Bearer " + token
      },
      params: params,
      data: data 
    })        
  }

  function deleteCategory({ token, params, }) {
    return axios({
      method: 'delete',
        url: "/api/users/categories/",
      headers: {
          "accept": "application/json",
          "Authorization": "Bearer " + token
      },
      params: params
    })        
  }

const useCategories = () => {

    const { categories,
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
            dispatch(categoriesError(error));
        }
    // eslint-disable-next-line
    }, []);

    const getCategories = useCallback(() => {        
        if (categories && categories.length === 0) { 
            dispatch(categoriesRequested());            
            fetchCategories({ token: profile.token, 
                                    params: { user_id: profile.id }})
                .then((response) => dispatch(categoriesLoaded(response.data.categories)))
                .catch((error) => onError(error));
        }
    // eslint-disable-next-line
    }, [categories]);

    const addCategory = useCallback((newCategory) => {        
        dispatch(categoriesRequested());
        createCategory({ token: profile.token, 
                                   params: { user_id: profile.id },
                                   data: { category: newCategory } 
                                })
        .then((response) => { const updated_categories = [...categories, response.data]                   
            dispatch(categoriesLoaded(updated_categories));
        })
        .catch((error) => onError(error));
    // eslint-disable-next-line
    }, [categories]);

    const delCategory = useCallback((idCategory) => {        
        dispatch(categoriesRequested());
        deleteCategory({ token: profile.token, 
                    params: { user_id: profile.id, category_id: idCategory }
                })
        .then(() => fetchCategories({ token: profile.token, 
                                    params: { user_id: profile.id }})
        .then((response) => dispatch(categoriesLoaded(response.data.categories))))
        .catch((error) => onError(error));
    // eslint-disable-next-line
    }, []);


    useEffect(() => {
        getCategories();
    // eslint-disable-next-line     
    }, []);

    return { categories, loading, error, getCategories, addCategory, delCategory };
}

export default useCategories