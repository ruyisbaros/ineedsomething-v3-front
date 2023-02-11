import React from 'react'
import logo from "../../assets/output-onlinejpgtools (1).png"
import { Formik, Form } from 'formik'
import "./login.css"
import { Link } from 'react-router-dom'

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
                            <Formik >
                                {
                                    (formik) => (
                                        <Form>
                                            <input type="text" />
                                            <input type="text" />
                                            <button type='submit' className='blue_btn'>Log In</button>
                                        </Form>
                                    )
                                }
                            </Formik>
                            <Link to="/forgot_pwd" className='forgot_password' >Forgotten password ?</Link>
                            <div className="sign_splitter"></div>
                            <button className="blue_btn open_signup">Create Account</button>

                        </div>
                        <Link to="/" className='sign_extra'>
                            <b>Create a Page </b>
                            for a celebrity, brand or business.
                        </Link>
                    </div>
                </div>
                <div className="register_wrap"></div>
            </div>
        </div>
    )
}

export default Login