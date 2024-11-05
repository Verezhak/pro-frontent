// src/redux/cards/selectors.js
export const selectAllCards = (state) => state.cards.cards;
export const selectCardById = (state, cardId) =>
    state.cards.cards.find(card => card._id === cardId);
export const selectCardsLoading = (state) => state.cards.loading;
export const selectCardsError = (state) => state.cards.error;

export const selectCardsByColumnId = (state, columnId) => {
    return state.cards.cards.filter(card => card.columnId === columnId);
};

