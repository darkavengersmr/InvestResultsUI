const initialState = {
    investments: [],
    history: [],
    inout: [],
    categories: [],
    loading: false,
    error: null,    
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

        default:
            return state;
    }    
}

export default reducer;