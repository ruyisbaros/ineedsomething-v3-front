import { toast } from "react-toastify"
import axios from "../axios"

export const getFriendInfo = async () => {
    try {
        const { data } = await axios.get(`/users/user_friends_info`)
        return data
    } catch (error) {
        toast.error(error.response.data.message)
    }
}