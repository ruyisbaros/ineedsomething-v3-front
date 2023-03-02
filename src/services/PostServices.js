import axios, { APP_ENVIRONMENT } from './../axios';

let ORIGIN = '';

if (APP_ENVIRONMENT === 'local') {
    ORIGIN = 'http://localhost:3000';
} else if (APP_ENVIRONMENT === 'development') {
    ORIGIN = 'https://ineedsomething.org';
} 

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
export const createPostWithImage = async (type, user, background, text, images, setLoading, setError) => {
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