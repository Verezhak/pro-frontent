
export const selectBoards = state => state.boards.items;
export const selectLoading = state => state.boards.loading;
export const selectError = state => state.boards.error;
export const selectSelectedBoard = (state) => state.boards.selectedBoard;


export const selectIsModalOpen = state => state.boards.isModalOpen;