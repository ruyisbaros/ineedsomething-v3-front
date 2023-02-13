import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import logo from "../../assets/output-onlinejpgtools (1).png"
import { Formik, Form } from 'formik'
import * as Yup from "yup"
import LoginInput from '../inputs/loginInput/LoginInput';

const LoginForm = () => {
    const [login, setLogin] = useState({ email: "", password: "" })
    const { email, password } = login;
    //console.log(login);
    const handleLoginChange = (e) => {
        const { name, value } = e.target;
        setLogin({ ...login, [name]: value });
    };
    const loginValidation = Yup.object({
        email: Yup.string().required("Email address is required").email("Must be valid email"),
        password: Yup.string().required("Password is required").min(6)
    })
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
    )
}

export default LoginForm