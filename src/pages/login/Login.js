import React from 'react'
import logo from "../../assets/needsmtg.jpg"

import "./login.css"

const Login = () => {
    return (
        <div className='login'>
            <div className="login_wrapper">
                <div className="login_wrap">
                    <div className="login_1">
                        <img src={logo} alt="" />
                        <span>iNeedSomething helps you connect and share with the people in your life.</span>
                    </div>
                    <div className="login_2">
                        <div className="login_2_wrap">
                            <form ></form>
                        </div>
                    </div>
                </div>
                <div className="register_wrap"></div>
            </div>
        </div>
    )
}

export default Login