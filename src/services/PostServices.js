import axios from './../axios';

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