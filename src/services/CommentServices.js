
import axios from './../axios';
import { toast } from 'react-toastify';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchCommentsThunk = createAsyncThunk("post/comments", async (post, { thunk }) => {
    try {
        const { data } = await axios.get(`/post/comments/get_comments`);
        //console.log(data)
        return data
    } catch (error) {
        toast.error(error.response.data.message)
    }

})

export const addComment = async (comment, pic, path, commentPost, reply, tag, setLoading) => {
    try {
        setLoading(true)
        const { data } = await axios.post("/post/comments/add_comment", { comment, pic, path, commentPost, reply, tag })
        setLoading(false)
        return data

    } catch (error) {
        setLoading(false)
        toast.error(error.response.data.message)
    }

}
export const getPostComments = async (commentPost, setLoading) => {
    try {
        setLoading(true)
        const { data } = await axios.get(`/post/comments/get_post_comments/${commentPost}`)
        setLoading(false)
        return data

    } catch (error) {
        setLoading(false)
        toast.error(error.response.data.message)
    }

}
export const getAllComments = async (setLoading) => {
    try {
        setLoading(true)
        const { data } = await axios.get("/post/comments/get_comments")
        setLoading(false)
        return data

    } catch (error) {
        setLoading(false)
        toast.error(error.response.data.message)
    }

}
export const likeUnlikeComment = async (id) => {
    try {

        const { data } = await axios.get(`/post/comments/like_unlike_comment/${id}`)
        return data

    } catch (error) {
        toast.error(error.response.data.message)
    }

}
export const deleteComment = async (id) => {
    try {

        const { data } = await axios.delete(`/post/comments/delete_comment/${id}`)
        return data

    } catch (error) {
        toast.error(error.response.data.message)
    }

}