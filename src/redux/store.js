
import { configureStore } from "@reduxjs/toolkit";
import commentsSlice from "./commentsSlice";
import currentUserSlice from "./currentUserSlice";
import friendOffersSlice from "./friendOffersSlice";
import notificationSlice from "./notificationSlice";
import postsSlicer from "./postsSlicer";
import profileSlicer from "./profileSlicer";
import screenModeSlicer from "./screenModeSlicer";
import socketsSlicer from "./socketsSlicer";


export const store = configureStore({
    reducer: {
        currentUser: currentUserSlice,
        posts: postsSlicer,
        profile: profileSlicer,
        comments: commentsSlice,
        notifications: notificationSlice,
        screenTheme: screenModeSlicer,
        suggestions: friendOffersSlice,
        sockets: socketsSlicer
    },
});
