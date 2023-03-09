import axios from './../axios';
import { toast } from 'react-toastify';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchNotificationsThunk = createAsyncThunk("user/notifications", async (post, { thunk }) => {
    try {
        const { data } = await axios.get(`/user/notifications/get_notifies`);
        //console.log(data)
        return data
    } catch (error) {
        toast.error(error.response.data.message)
    }

})