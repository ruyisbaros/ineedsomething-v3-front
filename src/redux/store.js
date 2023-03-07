
import { configureStore } from "@reduxjs/toolkit";
import commentsSlice from "./commentsSlice";
import currentUserSlice from "./currentUserSlice";
import postsSlicer from "./postsSlicer";
import profileSlicer from "./profileSlicer";


export const store = configureStore({
    reducer: {
        currentUser: currentUserSlice,
        posts: postsSlicer,
        profile: profileSlicer,
        comments: commentsSlice
    },
});
