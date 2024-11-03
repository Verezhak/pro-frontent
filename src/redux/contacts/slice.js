import { createSlice } from "@reduxjs/toolkit";
import { addContact, deleteContact, fetchContacts } from "./operations";
import { logOut } from "../auth/operations";

const initialState = {
    contacts: [],
    isLoading: false,
    isError: false,
};

const handlePending = state => {
    state.isLoading = true;
    state.isError = false;
};

const handleRejected = (state, action) => {
    state.isLoading = false;
    state.isError = action.payload;
};


const slice = createSlice({
    name: 'contacts',
    initialState,
    extraReducers: builder => {
        builder
            .addCase(fetchContacts.pending, handlePending)
            .addCase(fetchContacts.fulfilled, (state, action) => {
                state.contacts = action.payload;
                state.isLoading = false;
            })
            .addCase(fetchContacts.rejected, handleRejected)
            .addCase(deleteContact.pending, handlePending)
            .addCase(deleteContact.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.contacts = state.contacts.filter(contact => contact.id !== action.payload);
            })
            .addCase(deleteContact.rejected, handleRejected)
            .addCase(addContact.pending, handlePending)
            .addCase(addContact.fulfilled, (state, action) => {
                state.isError = false;
                state.isLoading = false;
                state.contacts.push(action.payload);
            })
            .addCase(addContact.rejected, handleRejected)
            .addCase(logOut.fulfilled, (state) => {
                state.contacts = [];
                state.isLoading = false;
                state.isError = false;
            });
    }
});




export const contactsReducer = slice.reducer;