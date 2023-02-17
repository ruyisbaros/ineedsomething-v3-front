import React, { useState } from 'react'
import LoginInput from './../../components/inputs/loginInput/LoginInput';
import { Formik, Form } from 'formik'
import * as Yup from "yup"
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import CircleLoader from "react-spinners/CircleLoader"
import axios from './../../axios';


const ChangePassword = ({ password, setPassword, confirmPassword, setConfirmPassword, user }) => {
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const validateFunc = Yup.object({
        password: Yup.string().required("Password is required").min(6, "password must be min 6 characters"),
        confirmPassword: Yup.string().required("Please confirm password")
            .oneOf([Yup.ref("password"), "Passwords should match!"]),
    })
    const handleChangePassword = async () => {
        if (password === confirmPassword) {
            try {
                setLoading(true)
                const { data } = await axios.post(`/auth/reset_password`, { email: user.email, password })
                //console.log(data)
                toast.success(data.message)
                setLoading(false)
                setTimeout(() => {
                    navigate("/login")
                }, 1500)
            } catch (error) {
                setLoading(false)
                toast.error(error.response.data.message)
            }
        } else {
            toast.error("Passwords should match!")
        }
    }
    return (
        <div className="reset_form password_height">
            <div className="reset_form_header">Change Password</div>
            <div className="reset_form_text">
                Select a strong password!
            </div>
            <Formik
                enableReinitialize
                initialValues={{
                    password,
                    confirmPassword
                }}
                validationSchema={validateFunc}
                onSubmit={() => {
                    handleChangePassword()
                }}
            >
                {(form) => (
                    <Form>
                        <LoginInput
                            placeholder="New password"
                            type="password"
                            name="password"
                            onChange={(e) => setPassword(e.target.value)}
                            bottom={false}
                        />
                        <LoginInput
                            placeholder="Confirm new password"
                            type="password"
                            name="confirmPassword"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            bottom={false}
                        />
                        <div className="reset_form_btns">
                            <Link to="/login" className='gray_btn'>Cancel</Link>
                            <button type='submit' className="blue_btn ">Continue</button>
                        </div>
                        <div className="animator">
                            <CircleLoader color="#1876f2" loading={loading} size={30} />
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default ChangePassword