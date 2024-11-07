
import { createSlice } from '@reduxjs/toolkit';
import { fetchColumns, addColumn } from './operations';

const columnsSlice = createSlice({
    name: 'columns',
    initialState: {
        items: [],
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
                state.items = action.payload;
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
                state.items.push(action.payload);
            })
            .addCase(addColumn.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});



export const columnsReducer = columnsSlice.reducer;
