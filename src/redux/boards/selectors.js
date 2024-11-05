// selectors.js для бордів
export const selectBoards = state => state.boards.items;
export const selectLoading = state => state.boards.loading;
export const selectError = state => state.boards.error;
export const selectSelectedBoard = (state) => state.boards?.selectedBoard;


