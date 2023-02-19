
import { configureStore } from "@reduxjs/toolkit";
import currentUserSlice from "./currentUserSlice";
import postsSlicer from "./postsSlicer";


export const store = configureStore({
    reducer: {
        currentUser: currentUserSlice,
        posts: postsSlicer
    },
});
