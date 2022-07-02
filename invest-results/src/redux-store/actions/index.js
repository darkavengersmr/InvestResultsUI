
const investmentLoaded = (newInvestment) => {    
    return {
        type: 'FETCH_INVESTMENTS_SUCCESS',
        payload: newInvestment
    }
}

const investmentRequested = () => {
    return {
        type: 'FETCH_INVESTMENTS_REQUEST'
    }
}

const investmentError = (error) => {
    return {
        type: 'FETCH_INVESTMENTS_FAILURE',
        payload: error
    }
}

const historyLoaded = (newHistory) => {
    return {
        type: 'FETCH_HISTORY_SUCCESS',
        payload: newHistory
    }
}

const historyRequested = () => {
    return {
        type: 'FETCH_HISTORY_REQUEST'
    }
}

const historyError = (error) => {
    return {
        type: 'FETCH_HISTORY_FAILURE',
        payload: error
    }
}

const inOutLoaded = (newInOut) => {
    return {
        type: 'FETCH_INOUT_SUCCESS',
        payload: newInOut
    }
}

const historyAdd = (newHistory) => {
    return {
        type: 'ADD_TO_HISTORY',
        payload: newHistory
    }
}

const inOutRequested = () => {
    return {
        type: 'FETCH_INOUT_REQUEST'
    }
}

const inOutError = (error) => {
    return {
        type: 'FETCH_INOUT_FAILURE',
        payload: error
    }
}

const inOutAdd = (newInOut) => {
    return {
        type: 'ADD_TO_INOUT',
        payload: newInOut
    }
}

const categoriesLoaded = (newCategories) => {
    return {
        type: 'FETCH_CATEGORIES_SUCCESS',
        payload: newCategories
    }
}

const categoriesRequested = () => {
    return {
        type: 'FETCH_CATEGORIES_REQUEST'
    }
}

const categoriesError = (error) => {
    return {
        type: 'FETCH_CATEGORIES_FAILURE',
        payload: error
    }
}


const profileLoaded = (data) => {    
    return {
        type: 'FETCH_PROFILE_SUCCESS',
        payload: data
    }
}

const profileRequested = () => {
    return {
        type: 'FETCH_PROFILE_REQUEST'
    }
}

const profileError = (error) => {
    return {
        type: 'FETCH_PROFILE_FAILURE',
        payload: error
    }
}


const tokenLoaded = (data) => {
    return {
        type: 'FETCH_TOKEN_SUCCESS',
        payload: data
    }
}

const tokenRequested = () => {
    return {
        type: 'FETCH_TOKEN_REQUEST'
    }
}

const tokenError = (error) => {
    return {
        type: 'FETCH_TOKEN_FAILURE',
        payload: error
    }
}

const userLogOut = () => {
    return {
        type: 'LOGOUT'
    }
}

const reportLoaded = (newReport) => {    
    return {
        type: 'FETCH_REPORT_SUCCESS',
        payload: newReport
    }
}

const reportRequested = () => {
    return {
        type: 'FETCH_REPORT_REQUEST'
    }
}

const reportError = (error) => {
    return {
        type: 'FETCH_REPORT_FAILURE',
        payload: error
    }
}

const setTheme = (newTheme) => {    
    return {
        type: 'SET_THEME',
        payload: newTheme
    }
}

const setContextMenu = (newMenu) => {    
    return {
        type: 'SET_CONTEXT_MENU',
        payload: newMenu
    }
}

const setOnlyActiveVisible = (newSetting) => {    
    return {
        type: 'SET_ONLY_ACTIVE_VISIBLE',
        payload: newSetting
    }
}

export {
    
    investmentRequested,
    investmentLoaded,
    investmentError,
    
    historyRequested,
    historyLoaded,
    historyError,
    historyAdd,

    inOutRequested,
    inOutLoaded,
    inOutError,
    inOutAdd,

    categoriesRequested,
    categoriesLoaded,
    categoriesError,

    profileRequested,
    profileLoaded,
    profileError,

    tokenRequested,
    tokenLoaded,
    tokenError,

    reportRequested,
    reportLoaded,
    reportError,

    userLogOut,
    setTheme,
    setContextMenu,
    setOnlyActiveVisible
}