
import { createSlice } from "@reduxjs/toolkit";
//import Cookies from "js-cookie";

const initialState = {
    socket: null,
};

const socketSlicer = createSlice({
    name: "sockets",
    initialState,
    reducers: {
        addSocketRedux: (state, action) => {
            state.socket = action.payload
        },

    },
});

export const {
    addSocketRedux,

} = socketSlicer.actions;

export default socketSlicer.reducer;
