
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// axios.defaults.baseURL = 'http://localhost:3000';

export const fetchBoards = createAsyncThunk(
    'boards/fetchAll',
    async ({ userId }, thunkAPI) => {
        try {
            const { data } = await axios.get(`/boards?userId=${userId}`);

            return data;
        } catch (e) {
            return thunkAPI.rejectWithValue(e.message);
        }
    }
);

export const addBoard = createAsyncThunk(
    'boards/addBoard',
    async ({ userId, boardName}, thunkAPI) => {
        try {
            const { data } = await axios.post(`/boards?userId=${userId}`, { title: boardName });
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);
