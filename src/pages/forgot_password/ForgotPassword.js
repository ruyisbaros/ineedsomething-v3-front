import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from "../../assets/output-onlinejpgtools (1).png"
import { useSelector, useDispatch } from 'react-redux';
import axios from './../../axios';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { authLogout } from '../../redux/currentUserSlice';
import SearchAccount from './SearchAccount';
import SendEmail from './SendEmail';
import CodeVerification from './CodeVerification';
import "./forgot.css"
import AuthFooter from './../../components/auth/AuthFooter';
import ChangePassword from './ChangePassword';

const ForgotPassword = () => {
    const { loggedUser } = useSelector(store => store.currentUser)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [visible, setVisible] = useState(0)
    const [code, setCode] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [tempUser, setTempUser] = useState(null)

    const handleLogout = async () => {
        try {
            await axios.get("/auth/logout")
            dispatch(authLogout())
            Cookies.set("user", "")
            navigate("/login")
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }


    const submitReset = () => { }
    return (
        <div className='reset'>
            <div className="reset_header">
                <img src={logo} alt="" />
                {loggedUser ?
                    <Link to="/profile" className="right_reset">
                        <img src={loggedUser?.user?.picture} alt="" />
                        <button onClick={handleLogout} className='blue_btn '>Logout</button>
                    </Link>
                    : <Link to="/login" className='right_reset'>
                        <button className='blue_btn '> Login</button>
                    </Link>}
            </div>
            <div className="reset_wrap">
                {visible === 0 && <SearchAccount email={email}
                    setEmail={setEmail}
                    setTempUser={setTempUser}
                    setVisible={setVisible}

                />}
                {visible === 1 && tempUser && <SendEmail user={tempUser} setVisible={setVisible} />}
                {visible === 2 && <CodeVerification code={code}
                    setCode={setCode} setVisible={setVisible} user={tempUser} />}
                {visible === 3 && <ChangePassword
                    user={tempUser}
                    password={password}
                    confirmPassword={confirmPassword}
                    setPassword={setPassword}
                    setConfirmPassword={setConfirmPassword}
                />}
            </div>
            <AuthFooter />
        </div>
    )
}

export default ForgotPassword