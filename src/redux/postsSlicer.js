
import { createSlice } from "@reduxjs/toolkit";
//import Cookies from "js-cookie";

const initialState = {
    posts: [],
};

const postSlicer = createSlice({
    name: "posts",
    initialState,
    reducers: {
        addPostRedux: (state, action) => {
            state.posts = [action.payload, ...state.posts]
        },
        getAllPostsRedux: (state, action) => {
            state.posts = [...action.payload]
        }
    },
});

export const {
    addPostRedux,
    getAllPostsRedux
} = postSlicer.actions;

export default postSlicer.reducer;
