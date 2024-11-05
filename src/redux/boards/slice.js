// boardsSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { fetchBoards, addBoard } from './operations';

const boardsSlice = createSlice({
    name: 'boards',
    initialState: {
        items: [], // Масив бордів
        selectedBoard: null,
        modalOpen: false,
        loading: false,
        error: null,
    },
    reducers: {
        setSelectedBoard(state, action) {
            state.selectedBoard = action.payload;
        },
        openModal(state) {
            state.isModalOpen = true;
        },
        closeModal(state) {
            state.isModalOpen = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchBoards.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchBoards.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload; // Зберігаємо борди у стані
            })
            .addCase(fetchBoards.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(addBoard.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addBoard.fulfilled, (state, action) => {
                state.loading = false;
                state.items.push(action.payload); // Додаємо новий борд до списку
            })
            .addCase(addBoard.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});
export const { setSelectedBoard, openModal, closeModal, } = boardsSlice.actions;

export const boardsReducer = boardsSlice.reducer;
