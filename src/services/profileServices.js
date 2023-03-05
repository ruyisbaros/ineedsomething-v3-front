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