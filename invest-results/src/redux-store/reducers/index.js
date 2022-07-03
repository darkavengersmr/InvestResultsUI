import { Cookies } from 'react-cookie';

const cookies = new Cookies();
const token = cookies.get('investresults_token');
const user_id = cookies.get('investresults_user_id');
let theme = cookies.get('investresults_theme');
let only_active_visible = cookies.get('investresults_only_active_visible');

if (only_active_visible === undefined || only_active_visible === 'true') {
    only_active_visible = true;
} else {
    only_active_visible = false;
}

if (theme === undefined ) {
    theme = 'dark';
} 

const initialState = {
    contextMenu: [],
    profile: {token: token, username: "", email: "", id: user_id},
    theme: theme,
    investments: [],
    history: [],
    inout: [],
    categories: [],
    report: [],
    only_active_visible: only_active_visible,
    loading: false,
    error: null,
    notification: {
        text: "",
        type: ""
    }    
}

const reducer = (state = initialState, action) => {

    switch (action.type) {
        case 'FETCH_INVESTMENTS_REQUEST':            
            return {
                ...state,
                investments: [],
                loading: true,
                error: null
            };
        case 'FETCH_INVESTMENTS_FAILURE':
            return {
                ...state,
                investments: [],
                loading: false,
                error: action.payload
            };
        case 'FETCH_INVESTMENTS_SUCCESS':            
            return {
                ...state,
                investments: action.payload,
                loading: false,
                error: null
            };

        case 'FETCH_HISTORY_REQUEST':
            return {
                ...state,
                history: [],
                loading: true,
                error: null
            };
        case 'FETCH_HISTORY_FAILURE':
            return {
                ...state,
                history: [],
                loading: false,
                error: action.payload
            };
        case 'FETCH_HISTORY_SUCCESS':
            return {
                ...state,
                history: action.payload,
                loading: false,
                error: null
            };
        case 'ADD_TO_HISTORY':            
            return {
                ...state,
                history: [...state.history, action.payload],
                loading: false,
                error: null
            };

        case 'FETCH_INOUT_REQUEST':
            return {
                ...state,
                inout: [],
                loading: true,
                error: null
            };
        case 'FETCH_INOUT_FAILURE':
            return {
                ...state,
                inout: [],
                loading: false,
                error: action.payload
            };
        case 'FETCH_INOUT_SUCCESS':
            return {
                ...state,
                inout: action.payload,
                loading: false,
                error: null
            };
        case 'ADD_TO_INOUT':            
            return {
                ...state,
                inout: [...state.inout, action.payload],
                loading: false,
                error: null
            };

        case 'FETCH_CATEGORIES_REQUEST':
            return {
                ...state,
                categories: [],
                loading: true,
                error: null
            };
        case 'FETCH_CATEGORIES_FAILURE':
            return {
                ...state,
                categories: [],
                loading: false,
                error: action.payload
            };
        case 'FETCH_CATEGORIES_SUCCESS':
            return {
                ...state,
                categories: action.payload,
                loading: false,
                error: null
            };

        case 'FETCH_PROFILE_REQUEST':
            return {
                ...state,
                profile: {...state.profile, username: "", email: "", id: null},
                loading: true,
                error: null
            };
        case 'FETCH_PROFILE_FAILURE':
            return {
                ...state,
                profile: {...state.profile, username: "", email: "", id: null},
                loading: false,
                error: action.payload
            };
        case 'FETCH_PROFILE_SUCCESS':
            return {
                ...state,
                profile: {...state.profile, ...action.payload},
                loading: false,
                error: null
            };

        case 'FETCH_TOKEN_REQUEST':
            return {
                ...state,
                profile: {...state.profile, token: ""},
                loading: true,
                error: null
            };
        case 'FETCH_TOKEN_FAILURE':
            return {
                ...state,
                profile: {...state.profile, token: ""},
                loading: false,
                error: action.payload
            };
        case 'FETCH_TOKEN_SUCCESS':
            return {
                ...state,
                profile: {...state.profile, token: action.payload},                
                loading: false,
                error: null
            };

        case 'LOGOUT':
            return {
                ...state,
                profile: {username: "", email: "", id: null, token: ""},                
                loading: false,
                error: null
            };

        case 'SET_THEME':
            return {
                ...state,
                theme: action.payload                
            };

        case 'SET_CONTEXT_MENU':
            return {
                ...state,
                contextMenu: action.payload                
            };

        case 'SET_NOTIFICATION':
            return {
                ...state,
                notification: action.payload                
            };

        case 'SET_ONLY_ACTIVE_VISIBLE':
            return {
                ...state,
                only_active_visible: action.payload                
            };
            
        case 'FETCH_REPORT_REQUEST':            
            return {
                ...state,
                report: [],
                loading: true,
                error: null
            };
        case 'FETCH_REPORT_FAILURE':
            return {
                ...state,
                report: [],
                loading: false,
                error: action.payload
            };
        case 'FETCH_REPORT_SUCCESS':
            return {
                ...state,
                report: action.payload,
                loading: false,
                error: null
            };

        default:
            return state;
    }    
}

export default reducer;