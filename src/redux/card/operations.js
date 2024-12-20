
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// axios.defaults.baseURL = 'http://localhost:3000';


export const fetchCards = createAsyncThunk(
    'cards/fetchCards',
    async ({ boardId }, thunkAPI) => {
        try {
            const response = await axios.get(`/cards/${boardId}`);

            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);


export const addCard = createAsyncThunk(
    'cards/addCard',
    async ({
        title,
        description,
        priority,
        boardId,
        columnId
    }, thunkAPI) => {
        try {
            console.log("Request payload:", { boardId, columnId, title, description, priority });

            const response = await axios.post(
                '/cards',
                {
                    title,
                    description,
                    priority,
                    boardId,
                    columnId
                }
            );
            return response.data;
        } catch (error) {
            console.error("Error response:", error.response);
            return thunkAPI.rejectWithValue(error.response.data.message);
        }
    }
);




// export const updateCard = createAsyncThunk(
//     'cards/updateCard',
//     async ({ cardId, boardId, columnId, title, description, color, date, token }, thunkAPI) => {
//         try {

//             const response = await axios.patch(`/cards/${cardId}`,
//                 { boardId, columnId, title, description, color, date },
//                 {
//                     headers: {
//                         Authorization: `Bearer ${token}`,
//                     },
//                 },

//             );
//             console.log("Response data:", response.data);
//             return response.data;
//         } catch (error) {
//             console.error('Error updating card:', error);
//             return thunkAPI.rejectWithValue(error.response.data.message);
//         }
//     }
// );


export const deleteCard = createAsyncThunk(
    'cards/deleteCard',
    async ({ cardId}, { rejectWithValue }) => {
        try {
            await axios.delete(`/cards/${cardId}`);
            return cardId;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);



export const moveCard = createAsyncThunk(
    'cards/moveCard',
    async ({ cardId, columnId }, { rejectWithValue }) => {
        try {
            await axios.patch(`/cards/move/${cardId}`, { columnId });
            return { cardId, columnId };
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

