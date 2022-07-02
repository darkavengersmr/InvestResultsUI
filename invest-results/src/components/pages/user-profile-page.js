import React, { useContext, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom";
import AppHeader from "../app-header"
import UserProfile from '../user-profile';
import Spinner from "../spinner"
import ErrorIndicator from '../error-indicator';
import { profileLoaded, profileRequested, profileError, 
         userLogOut, setContextMenu } from "../../redux-store/actions"
import { ApiServiceContext } from "../app-contexts";

const UserProfilePage = () => {
    
    const ApiService = useContext(ApiServiceContext);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { profile,
            loading,
            error } = useSelector((state) => state);

    useEffect(() => {        
        if (profile.username === "" && profile.email === "") {            
            dispatch(profileRequested());        
            ApiService.getUserProfile({ token: profile.token })
                .then((response) => dispatch(profileLoaded(response.data)))
                .catch((error) => {
                    if (error.response.status === 401) {
                        dispatch(userLogOut());
                        navigate('/login');
                    } else {
                        dispatch(profileError(error));  
                    } 
            });
        }
    // eslint-disable-next-line    
    }, [])

    useEffect(() => { 
        dispatch(setContextMenu([
            {
                description: "Выйти",
                action: () => {
                    dispatch(userLogOut());
                    navigate('/login');
                }
            }
        ]));
    // eslint-disable-next-line 
    }, [])

    if (loading) {            
        return <Spinner />
    }

    if (error) {            
        return <ErrorIndicator />
    }
    
    return (
        <div>
            <AppHeader name="Профиль" />
            <UserProfile profile={profile}/>
        </div>
    )
};

export default UserProfilePage;
