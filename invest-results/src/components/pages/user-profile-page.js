import React from 'react';
import Spinner from "../spinner"

import AppHeader from "../app-header"
import UserProfile from '../user-profile';
import ErrorIndicator from '../error-indicator';
import { useProfile } from '../../hooks';

const UserProfilePage = () => {

    const { profile, loading, error } = useProfile();

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
