
import { createSlice } from '@reduxjs/toolkit';
import { addCard, fetchCards, deleteCard,  moveCard } from './operations';

const initialState = {
    items: [],
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
                const newCards = action.payload.data;


                state.items = [...state.items, ...newCards.filter(
                    newCard => !state.items.some(existingCard => existingCard._id === newCard._id)
                )];
            })
            .addCase(fetchCards.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(addCard.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addCard.fulfilled, (state, action) => {
                state.loading = false;
                state.items.push(action.payload);

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
                state.items = state.items.filter(card => card._id !== cardId);
            })
            .addCase(deleteCard.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(moveCard.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(moveCard.fulfilled, (state, action) => {
                state.status = 'succeeded';
                const { cardId, columnId } = action.payload; 
                const index = state.items.findIndex(card => card._id === cardId);
                if (index !== -1) {
                    state.items[index].columnId = columnId;
                }
            })
            .addCase(moveCard.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            // .addCase(updateCard.pending, (state) => {
            //     state.loading = true;
            //     state.error = null;
            // })
            // .addCase(updateCard.fulfilled, (state, action) => {
            //     const updatedCard = action.payload;
            //     const index = state.items.findIndex(card => card._id === updatedCard._id);
            //     if (index !== -1) {
            //         state.items[index] = updatedCard;
            //     }
            // })
            // .addCase(updateCard.rejected, (state, action) => {
            //     state.loading = false;
            //     state.error = action.payload;
            // })

            // .addCase(fetchCardById.pending, (state) => {
            //     state.loading = true;
            //     state.error = null;
            // })
            // .addCase(fetchCardById.fulfilled, (state, action) => {
            //     state.loading = false;
            //     const card = action.payload;
            //     const index = state.items.findIndex(item => item._id === card._id);
            //     if (index !== -1) {
            //         state.items[index] = card;
            //     } else {
            //         state.items.push(card)
            //     }
            // })
            // .addCase(fetchCardById.rejected, (state, action) => {
            //     state.loading = false;
            //     state.error = action.payload;
            // })
            ;
    },
});




export const cardsReducer = cardsSlice.reducer;
