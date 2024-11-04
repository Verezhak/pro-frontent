

import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000';



export const fetchCards = createAsyncThunk(
    'cards/fetchCards',
    async ({ boardId, token }, thunkAPI) => {
        try {
            const { data } = await axios.get(`/cards?boardId=${boardId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

// Redux-операція для додавання картки
export const addCard = createAsyncThunk(
    'cards/addCard',
    async ({ boardId, columnId, title, description, color, token }, thunkAPI) => {
        try {
            const { data } = await axios.post(
                `/cards`,
                { title, description, color, columnId, boardId },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);
export const fetchCardById = createAsyncThunk(
    'cards/fetchCardById',
    async ({ boardId, cardId, token }, thunkAPI) => {
        try {
            const { data } = await axios.get(`/cards/${cardId}?boardId=${boardId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);
export const deleteCard = createAsyncThunk(
    'cards/deleteCard',
    async ({ boardId, cardId, token }, thunkAPI) => {
        try {
            await axios.delete(`/cards/${cardId}?boardId=${boardId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return cardId; // Повертаємо `cardId` для видалення з Redux-стану
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);
export const updateCard = createAsyncThunk(
    'cards/updateCard',
    async ({ boardId, cardId, updateData, token }, thunkAPI) => {
        try {
            const { data } = await axios.patch(
                `/cards/${cardId}?boardId=${boardId}`,
                updateData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);
