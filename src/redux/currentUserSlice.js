
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
            state.loggedUser = action.payload;
        },
        updateCurrentUser: (state, action) => {
            state.loggedUser = action.payload.currentUser;
        },
        updateCurrentUserFriendShip: (state, action) => {
            state.loggedUser = action.payload;
        },
        updateCurrentUserProfilePic: (state, action) => {
            state.loggedUser = { ...state.loggedUser, picture: action.payload };
        },
        updateCurrentUserCoverPic: (state, action) => {
            state.loggedUser = { ...state.loggedUser, cover: action.payload }
        },
        updateCurrentDetails: (state, action) => {
            state.loggedUser = { ...state.loggedUser, details: action.payload }
        },
        refreshToken: (state, action) => {

            state.loggedUser = action.payload
        },
        authLogout: (state) => {
            state.loggedUser = null;
        },
    },
});

export const {
    userLoggedSuccess,
    refreshToken,
    activateUserAccount,
    authLogout,
    updateCurrentUser,
    updateCurrentUserProfilePic,
    updateCurrentUserCoverPic,
    updateCurrentDetails,
    updateCurrentUserFriendShip

} = currentUserSlicer.actions;

export default currentUserSlicer.reducer;
