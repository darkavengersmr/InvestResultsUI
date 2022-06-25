import React, { useContext, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'

import AppHeader from "../app-header"
import CategoriesList from '../categories-list';
import Spinner from "../spinner"
import ErrorIndicator from '../error-indicator';
import { categoriesLoaded, categoriesRequested, categoriesError, 
         userLogOut} from "../../redux-store/actions"
import { ApiServiceContext } from "../invest-results-service-context";

const CategoriesListPage = () => {
    
    const ApiService = useContext(ApiServiceContext);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const profile = useSelector((state) => state.profile);
    const categories = useSelector((state) => state.categories)    
    const loading = useSelector((state) => state.loading);
    const error = useSelector((state) => state.error);

    useEffect(() => {
        
        dispatch(categoriesRequested());
        ApiService.getCategories({ token: profile.token, 
                                   params: { user_id: profile.id }})
            .then((response) => dispatch(categoriesLoaded(response.data.categories)))
            .catch((error) => { dispatch(categoriesError(error));
                                dispatch(userLogOut());
                                navigate('/login'); 
            });
    }, [ ApiService, dispatch, navigate, profile.token, profile.id ]);

    const addCategory = (newCategory) => {
        dispatch(categoriesRequested());
        ApiService.createCategory({ token: profile.token, 
                                   params: { user_id: profile.id },
                                   data: { category: newCategory } 
                                })
        .then(() => ApiService.getCategories({ token: profile.token, 
                                               params: { user_id: profile.id }})
        .then((response) => dispatch(categoriesLoaded(response.data.categories))))
    }

    const delCategory = (idCategory) => {
        dispatch(categoriesRequested());
        ApiService.deleteCategory({ token: profile.token, 
                    params: { user_id: profile.id, category_id: idCategory }
                })
        .then(() => ApiService.getCategories({ token: profile.token, 
                                               params: { user_id: profile.id }})
        .then((response) => dispatch(categoriesLoaded(response.data.categories))))
    }

    if (loading) {            
        return <Spinner />
    }

    if (error) {            
        return <ErrorIndicator />
    }
    
    return (
        <div>
            <AppHeader name="Категории инвестиций"/>
            <CategoriesList categories={categories}
                            onAddCategory={addCategory}
                            onDelCategory={delCategory}
                            />
        </div>
    )
};

export default CategoriesListPage;
