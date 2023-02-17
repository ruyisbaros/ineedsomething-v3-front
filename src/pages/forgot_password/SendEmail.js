import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import CircleLoader from "react-spinners/CircleLoader"
import axios from './../../axios';

const SendEmail = ({ user, setVisible }) => {
    const [loading, setLoading] = useState(false)
    const handleSendMail = async () => {
        try {
            setLoading(true)
            const { data } = await axios.get(`/auth/send_verify_code/${user?.email}`)
            //console.log(data)
            toast.success(data.message)
            setVisible(2)
            setLoading(false)
        } catch (error) {
            setLoading(false)
            toast.error(error.response.data.message)
        }
    }
    return (
        <div className="reset_form dynamic_height">
            <div className="reset_form_header">Reset Your Password</div>
            <div className="reset_grid">
                <div className="reset_left">
                    <div className="reset_form_text">
                        How do you want to receive the code to reset your password?
                    </div>
                    <label htmlFor="email" className='hover1'>
                        <input type="radio" name="email" id="email" checked readOnly />
                        <div className="label_col">
                            <span>Send code via email</span>
                            <span>{user?.email}</span>
                        </div>
                    </label>
                </div>
                <div className="reset_right">
                    <img src={user?.picture} alt="" />
                    <span>{user?.email}</span>
                    <span>Active user</span>
                </div>
            </div>
            <div className="reset_form_btns">
                <Link to="/login" className='gray_btn'>Cancel</Link>
                <button onClick={handleSendMail} type='submit' className="blue_btn ">Continue</button>
            </div>
            <div className="animator">
                <CircleLoader color="#1876f2" loading={loading} size={30} />
            </div>
        </div>

    )
}

export default SendEmail