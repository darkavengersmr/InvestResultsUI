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

export {
    investmentLoaded,
    investmentRequested,
    investmentError
}