import React, { useState, useEffect, useCallback } from 'react'
import Header from './../../components/header/Header';
import { useSelector, useDispatch } from 'react-redux';
import HomeLeft from '../../components/home/left/HomeLeft';
import HomeRight from './../../components/home/right/HomeRight';
import Stories from '../../components/home/stories/Stories';
import CreatePost from '../../components/post/create_post/CreatePost';
import { useParams, useNavigate } from 'react-router-dom';
import Popup from '../../components/popup/Popup';
import axios from './../../axios';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import "./home.css"
import { activateUserAccount } from '../../redux/currentUserSlice';
import { useEffectOnce } from './../../utils/helpers';

const Activate = () => {
    const { user, token: token1 } = useSelector(store => store.currentUser.loggedUser)
    const { token } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    //console.log(token)
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")
    const [loading, setLoading] = useState(false)

    const activateAccount = useCallback(async () => {
        try {
            setLoading(true)
            const { data } = await axios.post("/auth/activate_account", { token }, {
                headers: { "Authorization": `Bearer ${token1}` }
            })
            setLoading(false)
            setSuccess("Account has been activated successfully")
            Cookies.set("user", JSON.stringify(data))
            dispatch(activateUserAccount(data))
            setTimeout(() => {
                navigate("/")
            }, 3000)
        } catch (error) {
            setLoading(false)
            setError(error.response.data.message)
            toast.error(error.response.data.message)
            setTimeout(() => {
                navigate("/")
            }, 3000)
        }
    }, [token1, token, dispatch, navigate])

    useEffectOnce(() => {
        activateAccount()
    })

    return (
        <div className='home'>
            {success && <Popup
                type="success"
                header="Account verification succeeded"
                text={success}
                loading={loading}
            />}
            {error && <Popup
                type="error"
                header="Account verification failed!"
                text={error}
                loading={loading}
            />}
            <Header />
            <HomeLeft user={user} />
            <div className="home_middle">
                <Stories />
                <CreatePost user={user} />
            </div>
            <HomeRight user={user} />
        </div>
    )
}

export default Activate