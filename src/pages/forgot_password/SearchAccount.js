import React from 'react'
import { Link } from 'react-router-dom';
import LoginInput from './../../components/inputs/loginInput/LoginInput';
import { Formik, Form } from 'formik'
import * as Yup from "yup"

const SearchAccount = ({ email, setEmail }) => {
    const validateFunc = Yup.object({
        email: Yup.string().required("Email address is required").email("Must be valid email"),
    })

    return (
        <div className="reset_form">
            <div className="reset_form_header">Find Your Account</div>
            <div className="reset_form_text">
                Please enter your email address to search your account!
            </div>
            <Formik
                enableReinitialize
                initialValues={{
                    email
                }}
                validationSchema={validateFunc}
                onSubmit={() => {

                }}
            >
                {(form) => (
                    <Form>
                        <LoginInput
                            placeholder="Email address"
                            type="text"
                            name="email"
                            onChange={(e) => setEmail(e.target.value)}
                            bottom={false}
                        />
                        <div className="reset_form_btns">
                            <Link to="/login" className='gray_btn'>Cancel</Link>
                            <button type='submit' className="blue_btn ">Search</button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default SearchAccount