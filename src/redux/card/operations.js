// src/redux/cards/operations.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000';


export const fetchAllCardsForBoard = createAsyncThunk(
    'cards/fetchAllCardsForBoard',
    async ({ boardId, token }, thunkAPI) => {
        try {
            const response = await axios.get(`/boards/${boardId}/cards`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data.data; // Повертаємо масив карток
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

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
            console.log(response.data);
            return response.data; // Припускаючи, що дані знаходяться в data
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
    async ({
        title,
        description,
        color,
        boardId,
        columnId,
        token
    }, thunkAPI) => {
        try {
            console.log("Request payload:", { boardId, columnId, title, description, color });

            const response = await axios.post(
                '/cards',
                {
                    title,
                    description,
                    color,
                    boardId,
                    columnId
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            return response.data; // Повертаємо нову картку
        } catch (error) {
            console.error("Error response:", error.response);
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
            console.log("Response data:", response.data);
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
