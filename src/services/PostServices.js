import axios from './../axios';
import { toast } from 'react-toastify';

export const createPostWithBackground = async (type, user, background, text, images, setLoading, setError) => {
    try {
        setLoading(true)
        const { data } = await axios.post("/posts/create", { type, background, text, images, user })
        setLoading(false)
        return data

    } catch (error) {
        setError(error.response.data.message)
        setLoading(false)
    }
}
export const createPostWithImage = async (path, user, background, text, images, setLoading, setError) => {
    try {
        setLoading(true)
        const { data } = await axios.post("/posts/create", { path, background, text, images, user })
        setLoading(false)
        return data

    } catch (error) {
        setError(error.response.data.message)
        setLoading(false)
    }

}
export const createPostWithText = async (type, user, background, text, images, setLoading, setError) => {
    try {
        setLoading(true)
        const { data } = await axios.post("/posts/create", { type, background, text, images, user })
        setLoading(false)
        return data

    } catch (error) {
        setError(error.response.data.message)
        setLoading(false)
    }

}

export const savePost = async (postId) => {
    try {
        const { data } = await axios.get(`/posts/save_post/${postId}`)
        toast.success(data.message)
        return data

    } catch (error) {
        toast.error(error.response.data.message)
    }
}

export const deletePost = async (postId, email) => {
    try {
        const { data } = await axios.delete(`/posts/delete_post/${postId}/${email}`)
        toast.success(data.message)
        return data

    } catch (error) {
        toast.error(error.response.data.message)
    }
}