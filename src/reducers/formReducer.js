// src/reducers/formReducer.js

export const formReducer = (state, action) => {
    switch (action.type) {
        case 'SET_TITLE':
            return { ...state, title: action.payload };
        case 'SET_DESCRIPTION':
            return { ...state, description: action.payload };
        case 'SET_PRIORITY':
            return { ...state, priority: action.payload };
        case 'RESET_FORM':
            return { title: '', description: '', priority: 'without' };
        default:
            return state;
    }
};
