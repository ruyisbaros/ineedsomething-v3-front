import React from 'react'
import LoginInput from './../../components/inputs/loginInput/LoginInput';
import { Formik, Form } from 'formik'
import * as Yup from "yup"
import { Link } from 'react-router-dom';

const CodeVerification = ({ code, setCode }) => {
    const validateFunc = Yup.object({
        code: Yup.string().required("Code is required")
            .min(5, "Must be min 5 characters")
            .max(5, "Must be max 5 characters")
    })
    return (
        <div className="reset_form">
            <div className="reset_form_header">Code verification</div>
            <div className="reset_form_text">
                Please enter your code that has been sent to your email.
            </div>
            <Formik
                enableReinitialize
                initialValues={{
                    code
                }}
                validationSchema={validateFunc}
                onSubmit={() => {

                }}
            >
                {(form) => (
                    <Form>
                        <LoginInput
                            placeholder="Code"
                            type="text"
                            name="code"
                            onChange={(e) => setCode(e.target.value)}
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

export default CodeVerification