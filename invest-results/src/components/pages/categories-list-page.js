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

    if (loading) {            
        return <Spinner />
    }

    if (error) {            
        return <ErrorIndicator />
    }
    
    return (
        <div>
            <AppHeader name="Категории инвестиций"/>
            <CategoriesList />
        </div>
    )
};

export default CategoriesListPage;
