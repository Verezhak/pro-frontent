import { createSlice } from '@reduxjs/toolkit';
import { register, login, logout, refreshUser } from './operations';


const initialState = {
  user: {
    name: null,
    email: null,
    theme: null,
    _id: null,
  },
  token: null,
  isLoggedIn: false,
};
const authSlice = createSlice({
  name: 'auth', initialState,
  // initialState: {
  //   user: {
  //     name: null,
  //     email: null,
  //     _id: null,
  //   },
  //   data: {
  //     accessToken: null,
  //   },
  //   isLoggedIn: false,
  //   isRefreshing: false,
  // },
  extraReducers: builder => {
    builder
      .addCase(register.fulfilled, (state, action) => {
        state.user = {
          name: action.payload.data.name,
          email: action.payload.data.email,
          theme: action.payload.data.theme,
          _id: action.payload.data._id,
        };
        state.isLoggedIn = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = {
          name: action.payload.data.name,
          email: action.payload.data.email,
          theme: action.payload.data.theme,
          _id: action.payload.data.userId,
        };
        state.token = action.payload.data.accessToken;
        state.isLoggedIn = true;
      })
      .addCase(logout.fulfilled, () => initialState)
      .addCase(refreshUser.pending, state => {
        state.isRefreshing = true;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoggedIn = true;
        state.isRefreshing = false;
      })
      .addCase(refreshUser.rejected, state => {
        state.isRefreshing = false;
      });
  },
});

export const authReducer = authSlice.reducer;
