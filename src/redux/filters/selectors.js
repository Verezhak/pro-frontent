import { createSelector } from "@reduxjs/toolkit";
import { selectContacts } from "../contacts/selectors";


export const selectFilter = state => state.filter.filter;

export const selectFilteredContacts = createSelector(
    [selectContacts, selectFilter],
    (contacts, filter) => {
        return contacts.filter(contact =>
            contact.name.toLowerCase().includes(filter.toLowerCase()) ||
            contact.number.includes(filter)
        );
    }
);