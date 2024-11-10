import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
// axios.defaults.baseURL = 'https://pr5-ltp-rn-back.onrender.com';
// axios.defaults.baseURL = 'http://localhost:3000';
axios.defaults.baseURL = 'https://pro-back-o62o.onrender.com';


// Utility to add JWT

export const setAuthHeader = token => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
}; 

// Utility to remove JWT
const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = '';
};

/*
 * POST @ /users/signup
 * body: { name, email, password }
 */
export const register = createAsyncThunk(
  'auth/register',
  async (credentials, thunkAPI) => {
    try {
      const res = await axios.post('/auth/register', credentials);
      const { token, _id } = res.data.data;  // Отримуємо _id з відповіді

      // Якщо токен присутній, встановлюємо його в заголовок авторизації
      if (token) {
        setAuthHeader(token);
      }

      // Повертаємо _id користувача разом з іншими даними
      return { ...res.data.data, _id };
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Реєстрація не вдалася';
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

/*
 * POST @ /users/login
 * body: { email, password }
 */
export const login = createAsyncThunk(
  'auth/login',
  async (credentials, thunkAPI) => {
    try {
      const res = await axios.post('/auth/login', credentials);
      const { accessToken, userId } = res.data.data;  // Отримуємо userId з відповіді

      // Якщо токен присутній, встановлюємо його в заголовок авторизації
      if (accessToken) {
        setAuthHeader(accessToken);
        localStorage.setItem('token', accessToken);

      }

      // Повертаємо userId разом з іншими даними
      return { ...res.data.data, userId };
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Логін не вдалося';
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);


/*
 * POST @ /users/logout
 * headers: Authorization: Bearer token
 */
export const logout = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    await axios.post('/auth/logout');
    localStorage.removeItem('token');
    clearAuthHeader();
    // After a successful logout, remove the token from the HTTP header
    // clearAuthHeader();
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

/*
 * GET @ /users/current
 * headers: Authorization: Bearer token
 */
export const refreshUser = createAsyncThunk(
  'auth/refresh',
  async (_, thunkAPI) => {
    // Reading the token from the state via getState()
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token;

    if (persistedToken === null) {
      // If there is no token, exit without performing any request
      return thunkAPI.rejectWithValue('Unable to fetch user');
    }

    try {
      // If there is a token, add it to the HTTP header and perform the request
      setAuthHeader(persistedToken);
      const res = await axios.get('/users/current');
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
