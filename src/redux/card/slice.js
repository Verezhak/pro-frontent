// src/redux/cards/slice.js
import { createSlice } from '@reduxjs/toolkit';
import { addCard, fetchCards, fetchCardById, deleteCard, updateCard } from './operations';

const initialState = {
    items: [], // Масив карток
    loading: false,
    error: null,
};

const cardsSlice = createSlice({
    name: 'cards',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCards.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCards.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchCards.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchCardById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCardById.fulfilled, (state, action) => {
                state.loading = false;
                const card = action.payload;
                const index = state.items.findIndex(item => item._id === card._id);
                if (index !== -1) {
                    state.items[index] = card; // Оновлення картки, якщо вона вже є
                } else {
                    state.items.push(card)// Додавання нової картки
                }
            })
            .addCase(fetchCardById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(addCard.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addCard.fulfilled, (state, action) => {
                state.loading = false;
                state.items.push(action.payload); // Додавання нової картки
            })
            .addCase(addCard.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(deleteCard.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteCard.fulfilled, (state, action) => {
                state.loading = false;
                const cardId = action.payload;
                state.items = state.items.filter(card => card._id !== cardId); // Видалення картки
            })
            .addCase(deleteCard.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(updateCard.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateCard.fulfilled, (state, action) => {
                state.loading = false;
                const updatedCard = action.payload;
                const index = state.items.findIndex(card => card._id === updatedCard._id);
                if (index !== -1) {
                    state.items[index] = updatedCard; // Оновлення картки
                }
            })
            .addCase(updateCard.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const cardsReducer = cardsSlice.reducer;