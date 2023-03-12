import { toast } from "react-toastify"
import axios from "../axios"

export const getFriendInfo = async (setLoading) => {
    try {
        setLoading(true)
        const { data } = await axios.get(`/users/user_friends_info`)
        setLoading(false)
        return data
    } catch (error) {
        setLoading(false)
        toast.error(error.response.data.message)
    }
}