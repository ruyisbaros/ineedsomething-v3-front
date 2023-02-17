import React from 'react'
import LoginInput from './../../components/inputs/loginInput/LoginInput';
import { Formik, Form } from 'formik'
import * as Yup from "yup"
import { Link } from 'react-router-dom';

const ChangePassword = ({ password, setPassword, confirmPassword, setConfirmPassword }) => {
    const validateFunc = Yup.object({
        password: Yup.string().required("Password is required").min(6, "password must be min 6 characters"),
        confirmPassword: Yup.string().required("Please confirm password")
            .oneOf([Yup.ref("password"), "Passwords should match!"]),
    })
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
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default ChangePassword