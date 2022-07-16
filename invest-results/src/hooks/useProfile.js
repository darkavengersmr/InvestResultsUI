import axios from "axios";
import { useCallback, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom";
import { useCookies } from 'react-cookie';

import { profileLoaded, profileRequested, profileError, 
    userLogOut, setContextMenu } from "../redux-store/actions"

function getUserProfile({ token } ) {
    return axios({
      method: 'get',
      url: '/user',
      headers: {
          "accept": "application/json",
          "Authorization": "Bearer " + token
      }
    })
  };

const useProfile = () => {

    const { profile,
        loading,
        error } = useSelector((state) => state);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [, , removeCookie] = useCookies();

    const onError = useCallback((error) => {
        if (error.response.status === 401) {
            dispatch(userLogOut());
            navigate('/login');
        } else {
            dispatch(profileError(error));  
        }
    }, [dispatch, navigate]);

    const getProfile = useCallback(() => {        
        if (profile.username === "" && profile.email === "") {            
            dispatch(profileRequested());        
            getUserProfile({ token: profile.token })
                .then((response) => dispatch(profileLoaded(response.data)))
                .catch((error) => onError(error));
        }
    }, [dispatch, onError, profile.username, profile.email, profile.token ]);

    const logOutToContextMenu = useCallback(() => {
        dispatch(setContextMenu([
            {
                description: "Выйти",
                action: () => {
                    dispatch(userLogOut());
                    removeCookie('investresults_token');
                    removeCookie('investresults_user_id');
                    navigate('/login');
                }
            }
        ]));
    }, [dispatch, navigate, removeCookie])

    useEffect(() => {
        getProfile();
        logOutToContextMenu();
    }, [getProfile, logOutToContextMenu]);

    return { profile, loading, error, getProfile};
}

export default useProfile