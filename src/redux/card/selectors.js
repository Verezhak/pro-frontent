export const selectCards = (state) => state.cards.items;
export const selectTasksByColumn = (state, columnId) =>
    state.cards.items.filter((card) => card.columnId === columnId);
export const selectCardsLoading = (state) => state.cards.loading;
export const selectCardsError = (state) => state.cards.error;
