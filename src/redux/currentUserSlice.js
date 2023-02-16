
import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialState = {
    loggedUser: Cookies.get("user") ? JSON.parse(Cookies.get("user")) : null,
};

const currentUserSlicer = createSlice({
    name: "currentUser",
    initialState,
    reducers: {
        userLoggedSuccess: (state, action) => {
            state.loggedUser = action.payload;

        },
        activateUserAccount: (state, action) => {

            state.loggedUser = { ...state.loggedUser.user, verified: true };
        },
        updateCurrentUser: (state, action) => {

            state.loggedUser = action.payload.currentUser;
        },
        refreshToken: (state, action) => {

            state.loggedUser = action.payload.currentUser;
        },
        authLogout: (state) => {
            state.loggedUser = null;
            state.token = "";
        },
    },
});

export const {
    userLoggedSuccess,
    refreshToken,
    activateUserAccount,
    authLogout,
    updateCurrentUser
} = currentUserSlicer.actions;

export default currentUserSlicer.reducer;
