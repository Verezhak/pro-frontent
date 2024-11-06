
export const selectAllCards = (state) => state.items.cards;
export const selectCardById = (state, cardId) =>
    state.cards.items.find(card => card._id === cardId);
export const selectCardsLoading = (state) => state.cards.loading;
export const selectCardsError = (state) => state.cards.error;

export const selectCardsByColumnId = (state, columnId) => {
    console.log('state.cards.items:', state.cards.items);
    return state.cards.items.filter(card => card.columnId === columnId);
};


export const selectCards = (state) => state.cards.items;
