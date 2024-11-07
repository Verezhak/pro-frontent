
export const selectColumns = state => state.columns.items;
export const selectLoading = state => state.columns.loading;
export const selectError = state => state.columns.error; // Змінено на state.columns.error

export const selectColumnsByBoardId = (state, boardId) => {
    return state.columns.filter(column => column.boardId === boardId);
};