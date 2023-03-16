
import { createSlice } from "@reduxjs/toolkit";
import { fetchFriendOffersThunk } from "../services/FriendOffers";


const initialState = {
    suggestions: [],
    loading: false
};

const offersSlicer = createSlice({
    name: "suggestions",
    initialState,
    reducers: {

        removeFromOffers: (state, action) => {
            state.suggestions = state.suggestions.filter(sg => sg._id !== action.payload);
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchFriendOffersThunk.pending, (state) => {
            state.loading = true
        })
        builder.addCase(fetchFriendOffersThunk.fulfilled, (state, action) => {
            state.loading = false
            state.suggestions = [...action.payload.users]
        })
        builder.addCase(fetchFriendOffersThunk.rejected, (state) => {
            state.loading = false
        })
    }

});

export const {
    removeFromOffers
} = offersSlicer.actions;

export default offersSlicer.reducer;
