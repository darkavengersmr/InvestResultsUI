import React, { useContext, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom";
import AppHeader from "../app-header"
import UserProfile from '../user-profile';
import Spinner from "../spinner"
import ErrorIndicator from '../error-indicator';
import { profileLoaded, profileRequested, profileError, userLogOut } from "../../redux-store/actions"
import { ApiServiceContext } from "../invest-results-service-context";

const UserProfilePage = () => {
    
    const ApiService = useContext(ApiServiceContext);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const profile = useSelector((state) => state.profile);
    const loading = useSelector((state) => state.loading);
    const error = useSelector((state) => state.error);

    useEffect(() => {
        dispatch(profileRequested());        
        ApiService.getUserProfile({ token: profile.token })
            .then((response) => dispatch(profileLoaded(response.data)))
            .catch((error) => {
                dispatch(profileError(error));                
                dispatch(userLogOut());
                navigate('/login'); 
            });
    }, [ ApiService, dispatch, navigate, profile.token ])

    if (loading) {            
        return <Spinner />
    }

    if (error) {            
        return <ErrorIndicator />
    }
    
    return (
        <div>
            <AppHeader name="Профиль"/>
            <UserProfile profile={profile}/>
        </div>
    )
};

export default UserProfilePage;
