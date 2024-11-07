
export const selectAllCards = (state) => state.items.cards;
export const selectCardById = (state, cardId) =>
  state.cards.items.find(card => card._id === cardId);
export const selectCardsLoading = (state) => state.cards.loading;
export const selectCardsError = (state) => state.cards.error;




export const selectCards = (state) => state.cards.items;

export const selectCardsByBoardId = (state, boardId) => {
  return state.cards.items.filter(card => card.boardId === boardId);
};

export const selectCardsByColumnId = (state, columnId) =>
  state.cards.items.filter(card => card.columnId === columnId);