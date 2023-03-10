
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
        updateProfileCoverPic: (state, action) => {
            state.profile = { ...state.profile, cover: action.payload }
        },
        removeFromProfilePosts: (state, action) => {
            state.profilePosts = state.profilePosts.filter(post => post._id !== action.payload);
        },
        updateProfilePosts: (state, action) => {
            state.profilePosts = [action.payload, ...state.profilePosts];
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
    updateProfile,
    updateProfilePosts,
    removeFromProfilePosts,
    updateProfileCoverPic
} = postSlicer.actions;

export default postSlicer.reducer;
