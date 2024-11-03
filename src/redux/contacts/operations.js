
import { createAsyncThunk } from "@reduxjs/toolkit";
import { goitApi } from "../../config/goitApi";

export const fetchContacts = createAsyncThunk('contacts', async (_, thunkAPI) => {
    try {
        const { data } = await goitApi.get('contacts');
        console.log(data);
        return data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});


export const deleteContact = createAsyncThunk('contacts/deleteContact', async (id, thunkAPI) => {
    try {
        await goitApi.delete(`contacts/${id}`);
        return id;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});

export const addContact = createAsyncThunk('contacts/addContact', async (body, thunkAPI) => {
    try {
        const { data } = await goitApi.post('contacts', body);
        return data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});