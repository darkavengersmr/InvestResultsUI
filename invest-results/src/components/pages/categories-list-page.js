import React, { useContext, useEffect, useCallback } from 'react';
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'

import AppHeader from "../app-header"
import CategoriesList from '../categories-list';
import Spinner from "../spinner"
import ErrorIndicator from '../error-indicator';
import { categoriesLoaded, categoriesRequested, categoriesError, 
         userLogOut} from "../../redux-store/actions"
import { ApiServiceContext } from "../app-contexts";

const CategoriesListPage = () => {
    
    const ApiService = useContext(ApiServiceContext);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { categories,
            profile,
            loading,
            error } = useSelector((state) => state);

    useEffect(() => {
        if (categories.length === 0) { 
            dispatch(categoriesRequested());
            ApiService.getCategories({ token: profile.token, 
                                    params: { user_id: profile.id }})
                .then((response) => dispatch(categoriesLoaded(response.data.categories)))
                .catch((error) => { 
                    if (error.response.status === 401) {
                        dispatch(userLogOut());
                        navigate('/login');
                    } else {
                        dispatch(categoriesError(error));
                    }                     
                });
        }
    // eslint-disable-next-line
    }, []);

    const addCategory = useCallback((newCategory) => {
        dispatch(categoriesRequested());
        ApiService.createCategory({ token: profile.token, 
                                   params: { user_id: profile.id },
                                   data: { category: newCategory } 
                                })
        .then((response) => { const updated_categories = [...categories, response.data]            
            dispatch(categoriesLoaded(updated_categories));
        });
    }, [ApiService, categories, dispatch, profile.id, profile.token]);

    const delCategory = useCallback((idCategory) => {
        dispatch(categoriesRequested());
        ApiService.deleteCategory({ token: profile.token, 
                    params: { user_id: profile.id, category_id: idCategory }
                })
        .then(() => ApiService.getCategories({ token: profile.token, 
                                               params: { user_id: profile.id }})
        .then((response) => dispatch(categoriesLoaded(response.data.categories))))
    }, [ApiService, dispatch, profile.id, profile.token]);

    if (loading) {            
        return <Spinner />
    }

    if (error) {            
        return <ErrorIndicator />
    }
    
    return (
        <div>
            <AppHeader name="Категории инвестиций" />
            <CategoriesList categories={categories}
                            onAddCategory={addCategory}
                            onDelCategory={delCategory}
                            />
        </div>
    )
};

export default CategoriesListPage;
