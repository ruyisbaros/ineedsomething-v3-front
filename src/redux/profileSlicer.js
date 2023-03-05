
import { createSlice } from "@reduxjs/toolkit";
//import Cookies from "js-cookie";
import { fetchProfileThunk } from './../services/profileServices';

const initialState = {
    profile: null,
    profilePosts: [],
    loading: false
};

const postSlicer = createSlice({
    name: "profile",
    initialState,
    reducers: {
        fetchProfile: (state, action) => {
            state.profile = action.payload;
        },
        updateProfile: (state, action) => {
            state.profile = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchProfileThunk.pending, (state) => {
            state.loading = true
        })
        builder.addCase(fetchProfileThunk.fulfilled, (state, action) => {
            state.loading = false
            state.profile = action.payload.user
            state.profilePosts = [...action.payload.posts]
        })
        builder.addCase(fetchProfileThunk.rejected, (state) => {
            state.loading = false
        })
    }

});

export const {
    fetchProfile,
    updateProfile
} = postSlicer.actions;

export default postSlicer.reducer;
