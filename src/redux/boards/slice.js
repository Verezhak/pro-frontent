// boardsSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { fetchBoards, addBoard } from './operations';

const boardsSlice = createSlice({
    name: 'boards',
    initialState: {
        items: [], // Масив бордів
        loading: false,
        error: null,
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

export const boardsReducer = boardsSlice.reducer;
