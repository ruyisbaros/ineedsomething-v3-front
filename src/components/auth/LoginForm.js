import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import logo from "../../assets/output-onlinejpgtools (1).png"
import { Formik, Form } from 'formik'
import * as Yup from "yup"
import LoginInput from '../inputs/loginInput/LoginInput';
import { useDispatch, useSelector } from 'react-redux';
import axios from '../../axios'
import { toast } from 'react-toastify'
import CircleLoader from "react-spinners/CircleLoader"
import { userLoggedSuccess } from '../../redux/currentUserSlice';
import Cookies from "js-cookie"
import { onlineStatusUpdate } from '../../services/profileServices';
import { addToOnlineList, makeOnlineChatUser } from '../../redux/messageSlicer';

const LoginForm = ({ setVisible, visible, socket }) => {
    const { chatUsers } = useSelector(store => store.messages)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [login, setLogin] = useState({ email: "", password: "" })
    const { email, password } = login;
    const [loading, setLoading] = useState(false)
    //console.log(login);
    const handleLoginChange = (e) => {
        const { name, value } = e.target;
        setLogin({ ...login, [name]: value });
    };
    const loginValidation = Yup.object({
        email: Yup.string().required("Email address is required").email("Must be valid email"),
        password: Yup.string().required("Password is required").min(6)
    })
    const makeOnline = async (id) => {
        await onlineStatusUpdate(id)
        dispatch(addToOnlineList(id))
        chatUsers.map(usr => (
            socket?.emit("addOnlineList", { target: usr._id, me: id })
        ))
    }
    useEffect(() => {
        socket?.on("addOnlineListToClient", id => {
            dispatch(addToOnlineList(id))
            dispatch(makeOnlineChatUser(id))
        })

        return () => socket?.off("addOnlineListToClient")
    })
    const submitLogin = async () => {
        try {
            setLoading(true)
            const { data } = await axios.post("/auth/login", login)
            console.log(data)
            socket?.emit("joinUser", data?._id)
            dispatch(userLoggedSuccess(data))
            Cookies.set("user", JSON.stringify(data))
            navigate("/")
            await makeOnline(data?._id)
            setLoading(false)
        } catch (error) {
            setLoading(false)
            toast.error(error.response.data.message)
        }
    }
    return (
        <div className="login_wrap">
            <div className="login_1">
                <img src={logo} alt="" />
                <span>iNeedSomething helps you connect and share with the people in your life.</span>
            </div>
            <div className="login_2">
                <div className="login_2_wrap">
                    <Formik
                        enableReinitialize
                        initialValues={{
                            email,
                            password
                        }}
                        validationSchema={loginValidation}
                        onSubmit={() => {
                            submitLogin()
                        }}
                    >
                        {
                            (formik) => (
                                <Form>
                                    <LoginInput
                                        placeholder="Email address or phone number"
                                        type="text"
                                        name="email"
                                        onChange={handleLoginChange}
                                        bottom={false}
                                    />
                                    <LoginInput
                                        placeholder="Password"
                                        type="password"
                                        name="password"
                                        onChange={handleLoginChange}
                                        bottom={true}
                                    />
                                    <button type='submit' className='blue_btn'>{loading ? <CircleLoader color='#fff' loading={loading} size={30} /> : "Log In"}</button>
                                    {/*  <div style={{ display: "flex", justifyContent: "center" }}>
                                        <CircleLoader color='#1876f2' loading={loading} size={30} />
                                    </div> */}
                                </Form>
                            )
                        }
                    </Formik>
                    <Link to="/forgot_pwd" className='forgot_password' >Forgotten password ?</Link>
                    <div className="sign_splitter"></div>
                    <button onClick={() => setVisible(!visible)} className="blue_btn open_signup">Create Account</button>

                </div>
                <Link to="/" className='sign_extra'>
                    <b>Create a Page </b>
                    for a celebrity, brand or business.
                </Link>
            </div>
        </div>
    )
}

export default LoginForm