import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import LoginInput from './../../components/inputs/loginInput/LoginInput';
import { Formik, Form } from 'formik'
import * as Yup from "yup"
import axios from './../../axios';
import { toast } from 'react-toastify';
import CircleLoader from "react-spinners/CircleLoader"

const SearchAccount = ({ email, setEmail, setTempUser, setVisible }) => {
    const [loading, setLoading] = useState(false)

    const validateFunc = Yup.object({
        email: Yup.string().required("Email address is required").email("Must be valid email"),
    })

    const searchUser = async () => {
        try {
            setLoading(true)
            const { data } = await axios.get(`/users/find_user_email/${email}`)
            console.log(data)
            setTempUser(data)
            setVisible(1)
            setLoading(false)
        } catch (error) {
            setLoading(false)
            toast.error(error.response.data.message)
        }
    }

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
                    searchUser()
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
                        <div className="animator" style={{ marginBottom: "7px" }}>
                            <CircleLoader color="#1876f2" loading={loading} size={30} />
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default SearchAccount