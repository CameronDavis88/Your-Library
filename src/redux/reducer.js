const initialState = {
    user: {
        testing: 'Redux is working, but no user is signed in yet'
    },
    regView: false,
};

const GET_USER = 'GET_USER';
const CLEAR_USER = 'CLEAR_USER';
const REGISTER_VIEW = 'REGISTER_VIEW'

export function getUser(userObj) {
    return {
        type: GET_USER,
        payload: userObj
    }
};

export function clearUser() {
    return {
        type: CLEAR_USER,
        payload: {}
    }
};

export function registerView(bool) {
    return {
        type: REGISTER_VIEW,
        payload: bool
    }
};


export default function reducer(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_USER:
            return { ...state, user: payload }
        case CLEAR_USER:
            return { ...state, user: payload }
        case REGISTER_VIEW:
            return { ...state, regView: payload }
        default:
            return state
    }
};