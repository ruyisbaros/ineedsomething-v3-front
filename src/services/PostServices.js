import axios from './../axios';
import { toast } from 'react-toastify';


export const createPostWithBackground = async (type, user, token, background, text, images, setLoading) => {
    try {
        setLoading(true)
        const { data } = await axios.post("/posts/create", { type, background, text, images, user }, {
            headers: { "Authorization": `Bearer ${token}` }
        })
        setLoading(false)
        return data

    } catch (error) {
        setLoading(false)
        toast.error(error.response.data.message)
    }
}
export const createPostWithImage = async () => {

}