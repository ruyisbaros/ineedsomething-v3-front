import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../axios";
import { toast } from 'react-toastify';


export const fetchProfileThunk = createAsyncThunk("user/getProfile", async (username, { thunk }) => {
    try {
        const { data } = await axios.get(`/users/get_profile/${username}`);
        //console.log(data)
        return data
    } catch (error) {
        toast.error(error.response.data.message)
    }

})

export const onlineStatusUpdate = async (userId) => {
    console.log(userId)
    try {
        const { data } = await axios.get(`/users/update_status_on/${userId}`);
        return data
    } catch (error) {
        toast.error(error.response.data.message)
    }
}
export const offlineStatusUpdate = async (userId) => {
    console.log(userId)
    try {
        const { data } = await axios.get(`/users/update_status_off/${userId}`);
        return data
    } catch (error) {
        toast.error(error.response.data.message)
    }
}