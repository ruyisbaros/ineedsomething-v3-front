
import { createSlice } from "@reduxjs/toolkit";
import { fetchNotificationsThunk } from "../services/NotificationService";

const initialState = {
    notifications: [],
    loading: false,
    unRead: 0
};

const notifySlicer = createSlice({
    name: "notifications",
    initialState,
    reducers: {
        addNotifyRedux: (state, action) => {
            state.notifications = [action.payload, ...state.notifications];
        },
        updateNotifyRedux: (state, action) => {
            state.notifications = action.payload;
        },
        unReadCount: (state, action) => {
            state.unRead = state.notifications.filter(a => a.read === false).length
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchNotificationsThunk.pending, (state) => {
            state.loading = true
        })
        builder.addCase(fetchNotificationsThunk.fulfilled, (state, action) => {
            state.loading = false
            state.notifications = [...action.payload]
        })
        builder.addCase(fetchNotificationsThunk.rejected, (state) => {
            state.loading = false
        })
    }

});

export const {
    addNotifyRedux,
    updateNotifyRedux,
    unReadCount
} = notifySlicer.actions;

export default notifySlicer.reducer;
