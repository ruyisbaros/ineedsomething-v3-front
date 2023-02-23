
import { createSlice } from "@reduxjs/toolkit";
//import Cookies from "js-cookie";

const initialState = {
    profile: null,
};

const postSlicer = createSlice({
    name: "profile",
    initialState,

    extraReducers: {}
});

export const {

} = postSlicer.actions;

export default postSlicer.reducer;
