import React, { useCallback } from "react";
import { useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom";
import { useCookies } from 'react-cookie';

import Spinner from "../spinner"
import AppHeader from "../app-header"
import UserProfile from '../user-profile';
import ErrorIndicator from '../error-indicator';
import { useProfile } from '../../hooks';
import { userLogOut } from "../../redux-store/actions";

const UserProfilePage = () => {

    const { profile, loading, error } = useProfile();

    const dispatch = useDispatch()
    const navigate = useNavigate();
    const [, , removeCookie] = useCookies();

    const logOut = useCallback(() => {
        dispatch(userLogOut());
        removeCookie('investresults_token');
        removeCookie('investresults_user_id');
        navigate('/login');         
    }, [dispatch, navigate, removeCookie]);

    if (loading) {            
        return <Spinner />
    }

    if (error) {            
        return <ErrorIndicator />
    }
    
    return (
        <div>
            <AppHeader name="Профиль" />
            <UserProfile profile={profile} 
                         logOut={logOut} />
        </div>
    )
};

export default UserProfilePage;
