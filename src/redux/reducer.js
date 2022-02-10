const initialState = {
    user: {
        testing: 'Redux is working, but no user is signed in yet'
    },
    selectedBook: {
        testing: 'Redux is working for the selected book.'
    },
};

const GET_USER = 'GET_USER';
const CLEAR_USER = 'CLEAR_USER';
const GET_BOOK = 'GET_BOOK';

export function getUser(userObj) {
    return {
        type: GET_USER,
        payload: userObj
    };
};

export function clearUser() {
    return {
        type: CLEAR_USER,
        payload: {}
    };
};

export function getSelectedBook(bookObj) {
    return {
        type: GET_BOOK,
        payload: bookObj
    };
};

export default function reducer(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_USER:
            return { ...state, user: payload }
        case CLEAR_USER:
            return { ...state, user: payload }
        case GET_BOOK:
            return { ...state, selectedBook: payload }
        default:
            return state
    };
};