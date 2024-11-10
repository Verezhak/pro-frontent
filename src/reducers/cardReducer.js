// src/reducers/cardReducer.js

export const cardReducer = (state, action) => {
    switch (action.type) {
        case 'SET_CARDS':
            return { ...state, cards: action.payload };
        case 'TOGGLE_DESCRIPTION':
            return { 
                ...state, 
                expandedCardId: state.expandedCardId === action.payload ? null : action.payload 
            };
        case 'TOGGLE_MODAL':
            return { ...state, isModalOpen: action.payload };
        case 'RESET_MODAL':
            return { ...state, isModalOpen: false };
        case 'SET_TODAY':
            return { ...state, today: action.payload };
        case 'TOGGLE_DROPDOWN':
            return {
                ...state,
                openDropdowns: {
                    ...Object.keys(state.openDropdowns).reduce((acc, key) => {
                        acc[key] = false;
                        return acc;
                    }, {}),
                    [action.payload.cardId]: !state.openDropdowns[action.payload.cardId],
                },
            };
        default:
            return state;
    }
};
