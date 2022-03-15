const INITIAL_STATE = {
    started: true,
    language: 'vi',
    user: {}
}

const rootReducer = (state = INITIAL_STATE, action) => {

    switch (action.type) {
        case 'update_userName':
            return { ...state, user: action.payload }
        case 'update_language':
            return { ...state, language: action.payload }
        default:
            return state;
    }
}

export default rootReducer