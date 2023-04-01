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

export const createNotify = async (not) => {
    const { data } = await axios.post(`/user/notifications/create_notify`, { ...not })
    //console.log(data)
    return data
}

export const viewNotify = async (id) => {
    await axios.patch(`/user/notifications/view_notify/${id}`, {})

}
export const deleteNotify = async (id) => {
    const { data } = await axios.delete(`/user/notifications/delete_notify/${id}`)
    return data
}