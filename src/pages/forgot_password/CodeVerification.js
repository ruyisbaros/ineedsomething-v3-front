import React, { useState } from 'react'
import LoginInput from './../../components/inputs/loginInput/LoginInput';
import { Formik, Form } from 'formik'
import * as Yup from "yup"
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import CircleLoader from "react-spinners/CircleLoader"
import axios from './../../axios';

const CodeVerification = ({ code, setCode, setVisible, user }) => {
    const [loading, setLoading] = useState(false)
    const validateFunc = Yup.object({
        code: Yup.string().required("Code is required")
            .min(10, "Must be min 10 characters")
            .max(10, "Must be max 10 characters")
    })

    const handleCodeVerify = async () => {
        try {
            setLoading(true)
            const { data } = await axios.get(`/auth/validate_verify_code/${code}/${user?.email}`)
            //console.log(data)
            toast.success(data.message)
            setVisible(3)
            setLoading(false)
        } catch (error) {
            setLoading(false)
            toast.error(error.response.data.message)
        }
    }
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
                    handleCodeVerify()
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
                        <div className="animator">
                            <CircleLoader color="#1876f2" loading={loading} size={30} />
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

export default CodeVerification