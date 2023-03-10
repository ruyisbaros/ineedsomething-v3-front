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
        setLoading(true)
        const { data } = await axios.get(`/users/search_users/${search}`)
        setLoading(false)
        return data?.searchedUsers
    } catch (error) {
        setLoading(false)
        toast.error(error.response.data.message)
    }
}
export const addSearchHistory = async (id) => {
    try {
        await axios.patch(`/users/add_search_history/${id}`, {})

    } catch (error) {
        toast.error(error.response.data.message)
    }
}
export const getSearchHistory = async () => {
    try {
        const { data } = await axios.get(`/users/get_search_history`,)
        return data?.history
    } catch (error) {
        toast.error(error.response.data.message)
    }
}
export const deleteFromSearchHistory = async (id) => {
    try {
        const { data } = await axios.patch(`/users/delete_search_history/${id}`, {})
        return data?.history
    } catch (error) {
        toast.error(error.response.data.message)
    }
}

