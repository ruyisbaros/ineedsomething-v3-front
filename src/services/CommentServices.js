
import axios from './../axios';
import { toast } from 'react-toastify';

export const addComment = async (comment, pic, path, commentPost) => {
    try {
        const { data } = await axios.post("/post/comments/add_comment", { comment, pic, path, commentPost })
        return data

    } catch (error) {
        toast.error(error.response.data.message)
    }

}