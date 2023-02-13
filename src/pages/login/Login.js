import React from 'react'
import "./login.css"
import LoginForm from '../../components/auth/LoginForm'
import AuthFooter from '../../components/auth/AuthFooter'
import RegisterForm from '../../components/auth/RegisterForm'

const Login = () => {

    return (
        <div className='login'>
            <div className="login_wrapper">
                <LoginForm />
                <RegisterForm />
                <AuthFooter />

            </div>
        </div>
    )
}

export default Login