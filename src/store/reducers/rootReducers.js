const INITIAL_STATE = ''

const rootReducer = (state = INITIAL_STATE, action) => {

    switch (action.type) {
        case 'update_userName':
            state = action.payload
            return state
        default:
            return state;
    }
}

export default rootReducer