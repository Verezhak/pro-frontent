
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// axios.defaults.baseURL = 'http://localhost:3000';

export const fetchBoards = createAsyncThunk(
    'boards/fetchAll',
    async ({ userId, token }, thunkAPI) => {
        try {
            const { data } = await axios.get(`/boards?userId=${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            return data;
        } catch (e) {
            return thunkAPI.rejectWithValue(e.message);
        }
    }
);

export const addBoard = createAsyncThunk(
    'boards/addBoard',
    async ({ userId, boardName, token }, thunkAPI) => {
        try {
            const { data } = await axios.post(`/boards?userId=${userId}`, { title: boardName }, {
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
