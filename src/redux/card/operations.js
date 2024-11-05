// src/redux/cards/operations.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000';


export const fetchCards = createAsyncThunk(
    'cards/fetchCards',
    async ({ boardId, columnId, token }, thunkAPI) => {
        try {
            const response = await axios.get('/cards', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                params: { boardId, columnId } // Додаємо columnId як параметр
            });
            return response.data.data; // Припускаючи, що дані знаходяться в data
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

export const fetchCardById = createAsyncThunk(
    'cards/fetchCardById',
    async ({ boardId, cardId, token }, thunkAPI) => {
        try {
            const response = await axios.get(`/cards/${boardId}/${cardId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data.data; // Повертаємо картку
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.message);
        }
    }
);

// Додати нову картку
export const addCard = createAsyncThunk(
    'cards/addCard',
    async ({ boardId, columnId, title, description, color, token }, thunkAPI) => {
        try {
            const response = await axios.post(
                '/cards',
                { boardId, columnId, title, description, color },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            return response.data.data; // Повертаємо нову картку
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.message);
        }
    }
);

// Оновити картку
export const updateCard = createAsyncThunk(
    'cards/updateCard',
    async ({ boardId, cardId, payload, token }, thunkAPI) => {
        try {
            const response = await axios.patch(
                `/cards/${boardId}/${cardId}`,
                payload,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            return response.data.data; // Повертаємо оновлену картку
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.message);
        }
    }
);

// Видалити картку
export const deleteCard = createAsyncThunk(
    'cards/deleteCard',
    async ({ cardId, token }, thunkAPI) => {
        try {
            await axios.delete(`/cards/${cardId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return cardId; // Повертаємо ID картки для видалення
        } catch (error) {
            console.log("Delete card error:", error.response?.data || error.message);
            return thunkAPI.rejectWithValue(error.response.data.message);
        }
    }
);
