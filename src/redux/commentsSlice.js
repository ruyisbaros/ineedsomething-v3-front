
import { createSlice } from "@reduxjs/toolkit";
//import Cookies from "js-cookie";
import { fetchCommentsThunk } from './../services/CommentServices';

const initialState = {
    comments: [],
    loading: false
};

const commentSlicer = createSlice({
    name: "comments",
    initialState,
    reducers: {
        addCommentRedux: (state, action) => {
            state.comments = [action.payload, ...state.comments];
        },
        updateCommentRedux: (state, action) => {
            state.comments = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCommentsThunk.pending, (state) => {
            state.loading = true
        })
        builder.addCase(fetchCommentsThunk.fulfilled, (state, action) => {
            state.loading = false
            state.comments = [...action.payload]
        })
        builder.addCase(fetchCommentsThunk.rejected, (state) => {
            state.loading = false
        })
    }

});

export const {
    addCommentRedux,
    updateCommentRedux,
} = commentSlicer.actions;

export default commentSlicer.reducer;
