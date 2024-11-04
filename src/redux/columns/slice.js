// columnsSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { fetchColumns, addColumn } from './operations';

const columnsSlice = createSlice({
    name: 'columns',
    initialState: {
        items: [], // Масив колонок
        loading: false,
        error: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchColumns.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchColumns.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload; // Зберігаємо колонки у стані
            })
            .addCase(fetchColumns.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(addColumn.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addColumn.fulfilled, (state, action) => {
                state.loading = false;
                state.items.push(action.payload); // Додаємо нову колонку до списку
            })
            .addCase(addColumn.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const columnsReducer = columnsSlice.reducer;
