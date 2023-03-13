
import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialState = {
    darkTheme: Cookies.get("darkTheme") ? JSON.parse(Cookies.get("darkTheme")) : false,
};

const screenSlicer = createSlice({
    name: "screenTheme",
    initialState,
    reducers: {
        setDarkTheme: (state, action) => {
            state.darkTheme = true
        },
        setLightTheme: (state, action) => {
            state.darkTheme = false
        },

    },
});

export const {
    setDarkTheme,
    setLightTheme
} = screenSlicer.actions;

export default screenSlicer.reducer;
