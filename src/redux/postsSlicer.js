
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
            state.posts = [...state.posts, action.payload]
        }
    },
});

export const {
    addPostRedux
} = postSlicer.actions;

export default postSlicer.reducer;
