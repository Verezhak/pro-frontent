
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000';


export const fetchCards = createAsyncThunk(
    'cards/fetchCards',
    async ({ boardId,token }, thunkAPI) => {
        try {
            const response = await axios.get('/cards', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                params: { boardId }
            });
            console.log(response.data);
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
                },
            );
            return response.data;
        } catch (error) {
            console.error("Error response:", error.response);
            return thunkAPI.rejectWithValue(error.response.data.message);
        }
    }
);




export const updateCard = createAsyncThunk(
    'cards/updateCard',
    async ({ boardId, cardId,newColumnId,  token }, thunkAPI) => {
        try {

            const response = await axios.patch(`/cards/${cardId}`,
                { boardId, columnId: newColumnId }, 
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            
            );
            console.log("Response data:", response.data);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.message);
        }
    }
);


export const deleteCard = createAsyncThunk(
    'cards/deleteCard',
    async ({ cardId, token }, thunkAPI) => {
        try {
            await axios.delete(`/cards/${cardId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return cardId;
        } catch (error) {
            console.log("Delete card error:", error.response?.data || error.message);
            return thunkAPI.rejectWithValue(error.response.data.message);
        }
    }
);







// export const fetchCardById = createAsyncThunk(
//     'cards/fetchCardById',
//     async ({ boardId, cardId, token }, thunkAPI) => {
//         try {
//             const response = await axios.get(`/cards/${boardId}/${cardId}`, {
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                 },
//             });
//             return response.data.data;
//         } catch (error) {
//             return thunkAPI.rejectWithValue(error.response.data.message);
//         }
//     }
// );


export const moveCard = createAsyncThunk(
    'cards/moveCard',
    async ({ cardId, newColumnId, token }, thunkAPI) => {
      try {
        const response = await axios.patch(
          `/cards/${cardId}/move`,  // використовуємо новий роут
          { newColumnId },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        return response.data.data;  // повертаємо оновлену картку
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.message);
      }
    }
  );
  