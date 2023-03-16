import axios from './../axios';
import { toast } from 'react-toastify';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchFriendOffersThunk = createAsyncThunk("user/suggestions", async (user, { thunk }) => {
    try {
        const { data } = await axios.get(`/users/friend_offers`);
        //console.log(data)
        return data
    } catch (error) {
        toast.error(error.response.data.message)
    }

})