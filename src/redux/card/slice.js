
// import { createSlice } from '@reduxjs/toolkit';
// import { addCard, fetchCards, deleteCard, moveCard } from './operations';

// const initialState = {
//     items: [],
//     loading: false,
//     error: null,
// };

// const cardsSlice = createSlice({
//     name: 'cards',
//     initialState,
//     reducers: {},
//     extraReducers: (builder) => {
//         builder
//             .addCase(fetchCards.pending, (state) => {
//                 state.loading = true;
//                 state.error = null;
//             })
//             .addCase(fetchCards.fulfilled, (state, action) => {
//                 state.loading = false;
//                 const newCards = action.payload.data;


//                 state.items = [...state.items, ...newCards.filter(
//                     newCard => !state.items.some(existingCard => existingCard._id === newCard._id)
//                 )];
//             })
//             .addCase(fetchCards.rejected, (state, action) => {
//                 state.loading = false;
//                 state.error = action.payload;
//             })
//             .addCase(addCard.pending, (state) => {
//                 state.loading = true;
//                 state.error = null;
//             })
//             .addCase(addCard.fulfilled, (state, action) => {
//                 state.loading = false;
//                 state.items.push(action.payload);

//             })
//             .addCase(addCard.rejected, (state, action) => {
//                 state.loading = false;
//                 state.error = action.payload;
//             })
//             .addCase(deleteCard.pending, (state) => {
//                 state.loading = true;
//                 state.error = null;
//             })
//             // .addCase(deleteCard.fulfilled, (state, action) => {
//             //     state.loading = false;
//             //     const cardId = action.payload;
//             //     state.items = state.items.filter(card => card._id !== cardId);
//             // })
//             .addCase(deleteCard.fulfilled, (state, action) => {
//                 const cardId = action.meta.arg.cardId; // Використовуємо cardId з аргументів запиту
//                 state.items = state.items.filter(card => card._id !== cardId);
//                 state.loading = false;
//             })
//             .addCase(deleteCard.rejected, (state, action) => {
//                 state.loading = false;
//                 state.error = action.payload;
//             })
//             .addCase(moveCard.pending, (state) => {
//                 state.status = 'loading';
//             })
//             .addCase(moveCard.fulfilled, (state, action) => {
//                 state.status = 'succeeded';
//                 const { cardId, columnId } = action.payload;
//                 const index = state.items.findIndex(card => card._id === cardId);
//                 if (index !== -1) {
//                     state.items[index].columnId = columnId;
//                 }
//             })
//             .addCase(moveCard.rejected, (state, action) => {
//                 state.status = 'failed';
//                 state.error = action.error.message;
//             })
//             // .addCase(updateCard.pending, (state) => {
//             //     state.loading = true;
//             //     state.error = null;
//             // })
//             // .addCase(updateCard.fulfilled, (state, action) => {
//             //     const updatedCard = action.payload;
//             //     const index = state.items.findIndex(card => card._id === updatedCard._id);
//             //     if (index !== -1) {
//             //         state.items[index] = updatedCard;
//             //     }
//             // })
//             // .addCase(updateCard.rejected, (state, action) => {
//             //     state.loading = false;
//             //     state.error = action.payload;
//             // })

//             // .addCase(fetchCardById.pending, (state) => {
//             //     state.loading = true;
//             //     state.error = null;
//             // })
//             // .addCase(fetchCardById.fulfilled, (state, action) => {
//             //     state.loading = false;
//             //     const card = action.payload;
//             //     const index = state.items.findIndex(item => item._id === card._id);
//             //     if (index !== -1) {
//             //         state.items[index] = card;
//             //     } else {
//             //         state.items.push(card)
//             //     }
//             // })
//             // .addCase(fetchCardById.rejected, (state, action) => {
//             //     state.loading = false;
//             //     state.error = action.payload;
//             // })
//             ;
//     },
// });




// export const cardsReducer = cardsSlice.reducer;












import { createSlice } from '@reduxjs/toolkit';
import { addCard, deleteCard, fetchCards, moveCard } from './operations.js';


const cardsSlice = createSlice({
    name: 'cards',
    initialState: {
        items: [],
        isLoading: false,
        error: null,
        isAddModalOpen: false,
        openDropdowns: {},
        today: new Date(),
        expandedCardId: null,
        isModalOpen: false,
    },
    reducers: {
        openAddModal: (state) => {
            state.isAddModalOpen = true;
        },
        closeAddModal: (state) => {
            state.isAddModalOpen = false;
        },
        toggleDropdown: (state, action) => {
            const cardId = action.payload;
            state.openDropdowns = Object.keys(state.openDropdowns).reduce((acc, key) => {
                acc[key] = false;
                return acc;
            }, {});
            state.openDropdowns[cardId] = !state.openDropdowns[cardId];
        },
        updateToday: (state) => {
            state.today = new Date();
        },
        toggleDescription(state, action) {
            state.expandedCardId = state.expandedCardId === action.payload ? null : action.payload;
        },
        openModal(state) {
            state.isModalOpen = true;
        },
        closeModal(state) {
            state.isModalOpen = false;
        },
        closeDropdown(state, action) {
            const cardId = action.payload;
            state.openDropdowns[cardId] = false;
        },

    },
    extraReducers: (builder) => {
        builder
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
                state.isLoading = true;
                state.error = null;
            })
            .addCase(addCard.fulfilled, (state, action) => {
                state.isLoading = false;
                state.items.push(action.payload);
            })
            .addCase(addCard.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            // .addCase(editCard.pending, (state) => {
            //     state.isLoading = true;
            //     state.error = null;
            // })
            // .addCase(editCard.fulfilled, (state, action) => {
            //     state.isLoading = false;
            //     const index = state.items.findIndex(card => card.id === action.payload.id);
            //     if (index !== -1) state.items[index] = action.payload;
            // })
            // .addCase(editCard.rejected, (state, action) => {
            //     state.isLoading = false;
            //     state.error = action.payload;
            // })
            .addCase(deleteCard.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteCard.fulfilled, (state, action) => {
                const cardId = action.meta.arg.cardId;
                state.items = state.items.filter(card => card._id !== cardId);
                state.loading = false;
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
            });
    },
});

export const { openAddModal, closeAddModal, toggleDropdown, updateToday, toggleDescription, openModal, closeModal, closeDropdown } = cardsSlice.actions;

export const cardsReducer = cardsSlice.reducer;
