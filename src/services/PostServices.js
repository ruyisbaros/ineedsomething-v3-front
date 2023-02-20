import axios from './../axios';


export const createPostWithBackground = async (type, user, token, background, text, images, setLoading, setError) => {
    try {
        setLoading(true)
        const { data } = await axios.post("/posts/create", { type, background, text, images, user }, {
            headers: { "Authorization": `Bearer ${token}` }
        })
        setLoading(false)
        return data

    } catch (error) {
        setError(error.response.data.message)
        setLoading(false)
    }
}
export const createPostWithImage = async (type, user, token, background, text, images, setLoading, setError) => {
    try {
        setLoading(true)
        const { data } = await axios.post("/posts/create", { type, background, text, images, user }, {
            headers: { "Authorization": `Bearer ${token}` }
        })
        setLoading(false)
        return data

    } catch (error) {
        setError(error.response.data.message)
        setLoading(false)
    }

}
export const createPostWithText = async (type, user, token, background, text, images, setLoading, setError) => {
    try {
        setLoading(true)
        const { data } = await axios.post("/posts/create", { type, background, text, images, user }, {
            headers: { "Authorization": `Bearer ${token}` }
        })
        setLoading(false)
        return data

    } catch (error) {
        setError(error.response.data.message)
        setLoading(false)
    }

}