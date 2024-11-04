// operations.js для колонок
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000';

export const fetchColumns = createAsyncThunk(
    'columns/fetchAll',
    async ({ boardId, token }, thunkAPI) => {
        try {
            const { data } = await axios.get(`/columns?boardId=${boardId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log("Fetched columns:", data);
            return data;
        } catch (e) {
            console.error("Error fetching columns:", e);
            return thunkAPI.rejectWithValue(e.message);
        }
    }
);

export const addColumn = createAsyncThunk(
    'columns/addColumn',
    async ({ boardId, columnName, token }, thunkAPI) => {
        try {
            const { data } = await axios.post(`/columns`, { title: columnName, boardId }, {
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
