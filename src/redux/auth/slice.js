import { createSlice } from '@reduxjs/toolkit';
import { register, logIn, logOut, refreshUser } from './operations';
const initialState = {
    user: {
        name: '',
        email: '',
    },
    token: '',
    isLoggedIn: false,
    isRefreshing: false,
};

const handlePending = (state) => {
    state.isLoggedIn = true;
    state.error = null;
};

const handleRejected = (state, action) => {
    state.isLoggedIn = false;
    state.error = action.error.message;
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(register.fulfilled, (state, action) => {
                state.user = action.payload.user;
                state.token = action.payload.token;
                state.isLoggedIn = true;
            })
            .addCase(register.pending, handlePending)
            .addCase(register.rejected, handleRejected)
            .addCase(logIn.fulfilled, (state, action) => {
                state.user = action.payload.user;
                state.token = action.payload.token;
                state.isLoggedIn = true;
            })
            .addCase(logIn.pending, handlePending)
            .addCase(logIn.rejected, handleRejected)
            .addCase(logOut.fulfilled, () => {
                return initialState;
            })
            .addCase(logOut.pending, handlePending)
            .addCase(logOut.rejected, handleRejected)

            .addCase(refreshUser.pending, (state) => {
                state.isRefreshing = true;
            })
            .addCase(refreshUser.fulfilled, (state, action) => {
                state.user = action.payload;
                state.isLoggedIn = true;
                state.isRefreshing = false;
            })
            .addCase(refreshUser.rejected, (state) => {
                state.isRefreshing = false;
            });
    },
});

export const authReducer = authSlice.reducer;