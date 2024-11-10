export const columnReducer = (state, action) => {
    switch (action.type) {
        case 'TOGGLE_MODAL':
            return { ...state, isModalOpen: action.payload };
        default:
            return state;
    }
};
