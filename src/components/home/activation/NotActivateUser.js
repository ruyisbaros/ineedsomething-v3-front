import React, { useState } from 'react'
import { toast } from 'react-toastify';
import axios from './../../../axios';
import PropagateLoader from "react-spinners/PropagateLoader"
import "./notActivateUser.css"

const NotActivateUser = () => {
    const [emailStatus, setEmailStatus] = useState("")
    const [loading, setLoading] = useState(false)

    const reSendActivateMail = async () => {
        try {
            setLoading(true)
            const { data } = await axios.post("/auth/resend_activate_email", {})
            setLoading(false)
            setEmailStatus(data.message)
        } catch (error) {
            setLoading(false)
            setEmailStatus(error.response.data.message)
            toast.error(error.response.data.message)
        }
    }
    return (
        <>
            {loading ? <div className='animator'><PropagateLoader color='#1876f2' loading={loading} size={15} /></div> :
                (<div className='send_verification'>
                    <span>Your account is still not activated! Did you check your email after registration? </span>
                    <br />
                    <span onClick={reSendActivateMail}>We can re-send verification mail. Please click.</span>
                    <p>{emailStatus}</p>
                </div>)}
        </>
    )
}

export default NotActivateUser