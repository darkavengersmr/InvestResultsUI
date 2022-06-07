const initialState = {
    investments: [],
    loading: false,
    error: null
}

const reducer = (state = initialState, action) => {

    switch (action.type) {
        case 'FETCH_INVESTMENTS_REQUEST':
            return {
                investments: [],
                loading: true,
                error: null
            };
        case 'FETCH_INVESTMENTS_FAILURE':
            return {
                investments: [],
                loading: false,
                error: action.payload
            };
        case 'FETCH_INVESTMENTS_SUCCESS':
            return {
                investments: action.payload,
                loading: false,
                error: null
            };
        default:
            return state;
    }    
}

export default reducer;