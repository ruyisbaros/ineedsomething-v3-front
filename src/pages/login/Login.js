import React, { useState } from 'react'
import "./login.css"
import LoginForm from '../../components/auth/LoginForm'
import AuthFooter from '../../components/auth/AuthFooter'
import RegisterForm from '../../components/auth/RegisterForm'

const Login = () => {
    const [visible, setVisible] = useState(false)
    return (
        <div className='login'>
            <div className="login_wrapper">
                <LoginForm visible={visible} setVisible={setVisible} />
                {visible && <RegisterForm visible={visible} setVisible={setVisible} />}
                <AuthFooter />

            </div>
        </div>
    )
}

export default Login