
import { toast } from 'react-toastify';
import axios from './../axios';

/* export const uploadImages = async (formData, path, token, setLoading, setImgUrls) => {
    try {
        setLoading(true)
        const { data } = await axios.post("/images/upload", formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                "content-type": "multipart/form-data",
            }
        })
        setLoading(false)
        console.log(data)
        setImgUrls([...data])
        return data
    } catch (error) {
        setLoading(false)
        //toast.error(error.response.data.message)
    }
} */