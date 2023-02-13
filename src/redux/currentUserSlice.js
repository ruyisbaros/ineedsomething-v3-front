
import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialState = {
    currentUser: Cookies.get("user") ? JSON.parse(Cookies.get("user")) : null,
};

const currentUserSlicer = createSlice({
    name: "currentUser",
    initialState,
    reducers: {
        userLoggedSuccess: (state, action) => {
            state.currentUser = action.payload;

        },
        updateCurrentUser: (state, action) => {
            state.token = action.payload.token;
            state.currentUser = action.payload.currentUser;
        },
        refreshToken: (state, action) => {
            state.token = action.payload.token;
            state.currentUser = action.payload.currentUser;
        },
        authLogout: (state) => {
            state.currentUser = null;
            state.token = "";
        },
    },
});

export const {
    userLoggedSuccess,
    refreshToken,
    authLogout,
    updateCurrentUser
} = currentUserSlicer.actions;

export default currentUserSlicer.reducer;
