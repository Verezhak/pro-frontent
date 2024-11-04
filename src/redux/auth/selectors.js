export const selectIsLoggedIn = state => state.auth.isLoggedIn;

export const selectUser = state => state.auth.user;

export const selectUserId = state => state.auth.user._id;

export const selectToken = state => state.auth.token;

export const selectIsRefreshing = state => state.auth.isRefreshing;
