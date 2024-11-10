
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// axios.defaults.baseURL = 'http://localhost:3000';


export const fetchColumns = createAsyncThunk(
    'columns/fetchColumns',
    async ({ boardId}, thunkAPI) => {
        try {
            const { data } = await axios.get(`/columns/${boardId}`);
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const addColumn = createAsyncThunk(
    'columns/addColumn',
    async ({ boardId, columnName}, thunkAPI) => {
        try {
            const { data } = await axios.post(
                `/columns/${boardId}`,
                { title: columnName }
            );
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);



