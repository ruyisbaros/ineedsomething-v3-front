
import axios from './../axios';
import { toast } from 'react-toastify';

export const addPostReact = async (react, postId) => {
    try {
        const { data } = await axios.post(`/post/reacts/add_react`, { react, postId })
        //console.log(data)
        return data
    } catch (error) {
        toast.error(error.response.data.message)
    }
}