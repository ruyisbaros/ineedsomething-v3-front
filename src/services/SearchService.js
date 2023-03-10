import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "../axios";

export const useDebounce = (value, delay) => {
    const [debounceValue, setDebounceValue] = useState(value)

    useEffect(() => {
        const timer = setTimeout(() => setDebounceValue(value), delay || 500)

        return () => {
            clearTimeout(timer)
        }
    }, [delay, value])

    return debounceValue
}

export const searchUsersRegex = async (search, setLoading) => {
    try {
        setLoading(false)
        const { data } = await axios.get(`/users/search_users/${search}`)
        setLoading(false)
        return data?.searchedUsers
    } catch (error) {
        setLoading(false)
        toast.error(error.response.data.message)
    }
}
