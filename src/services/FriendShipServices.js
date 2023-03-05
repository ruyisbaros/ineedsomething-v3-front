import { toast } from 'react-toastify';
import axios from '../axios';

export const addFriendRequest = async (id) => {
    try {
        const { data } = await axios.patch(`/users/send_friend_request/${id}`)
        return data
    } catch (error) {
        toast.error(error.response.data.message)
    }
}
export const cancelFriendRequest = async (id) => {
    try {
        const { data } = await axios.patch(`/users/cancel_friend_request/${id}`)
        //console.log(data)
        return data
    } catch (error) {
        toast.error(error.response.data.message)
    }
}
export const acceptFriendRequest = async (id) => {
    try {
        const { data } = await axios.patch(`/users/accept_friend_request/${id}`)
        return data
    } catch (error) {
        toast.error(error.response.data.message)
    }
}
export const ignoreFriendRequest = async (id) => {
    try {
        const { data } = await axios.patch(`/users/delete_friend_request/${id}`)
        return data
    } catch (error) {
        toast.error(error.response.data.message)
    }
}
export const followUnFollow = async (id) => {
    try {
        const { data } = await axios.patch(`/users/follow_un_follow/${id}`)
        return data
    } catch (error) {
        toast.error(error.response.data.message)
    }
}
export const unFriend = async (id) => {
    try {
        const { data } = await axios.patch(`/users/un_friend/${id}`)
        return data
    } catch (error) {
        toast.error(error.response.data.message)
    }
}