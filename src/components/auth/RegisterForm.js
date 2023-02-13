import React, { useState, useRef } from 'react'
import { Form, Formik } from 'formik'
import RegisterInput from '../inputs/registerInput/RegisterInput'
import * as Yup from "yup"
import { toast } from 'react-toastify'
import CircleLoader from "react-spinners/CircleLoader"
import axios from '../../axios'
import { useDispatch } from 'react-redux'
import { userLoggedSuccess } from '../../redux/currentUserSlice'
import Cookies from "js-cookie"
import { useNavigate } from 'react-router-dom'
import { useOutsideClick } from './../../utils/helpers';


const RegisterForm = ({ visible, setVisible }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [registerUser, setRegisterUser] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    gender: "",
    bYear: new Date().getFullYear(),
    bMonth: new Date().getMonth() + 1,
    bDay: new Date().getDate()
  })
  const { first_name, last_name, email, password, gender, bYear, bMonth, bDay } = registerUser
  const [dateError, setDateError] = useState("")
  const [genderError, setGenderError] = useState("")
  const [loading, setLoading] = useState(false)
  const handleRegister = (e) => {
    const { name, value } = e.target
    setRegisterUser({ ...registerUser, [name]: value })
  }
  const tempYear = new Date().getFullYear()
  const years = Array.from(new Array(80), (val, index) => tempYear - index)
  const months = Array.from(new Array(12), (val, index) => 1 + index)
  const getDays = () => {
    return new Date(bYear, bMonth, 0).getDate()
  }
  const days = Array.from(new Array(getDays()), (val, index) => 1 + index)
  const registerValidation = Yup.object({
    first_name: Yup.string().required("What is your first name?").min(2, "First name must between 2 and 16 characters").max(16, "First name must between 2 and 16 characters").matches(/^[aA-zZ]+$/, "Numbers and special characters are not allowed!"),
    last_name: Yup.string().required("What is your surname?").min(2, "Last name must between 2 and 16 characters").max(16, "Last name must between 2 and 16 characters").matches(/^[aA-zZ]+$/, "Numbers and special characters are not allowed!"),
    email: Yup.string().required("You will need this when you log in and if you ever need to reset your password").email("Must be valid email"),
    password: Yup.string().required("Password is required").min(6)
  })

  /* Outside click close */
  const el = useRef(null)
  useOutsideClick(el, () => {
    setVisible(!visible)
  })

  const submitRegister = async () => {
    /* e.preventDefault() */
    try {
      setLoading(true)
      const { data } = await axios.post("/auth/register", registerUser)
      console.log(data)
      dispatch(userLoggedSuccess(data))
      Cookies.set("user", JSON.stringify(data))
      navigate("/")
      setLoading(false)
      toast.info("Register success! Please check your email and activate your account.")
    } catch (error) {
      setLoading(false)
      toast.error(error.response.data.message)
    }

  }
  return (
    <div className='blur'>
      <div className="register" ref={el}>
        <div className="register_header">
          <span onClick={() => setVisible(!visible)} className='close_register'>&times;</span>
          <span className='sign_title'>Sign Up</span>
          <span className='sign_text'>It's quick and easy</span>
        </div>
        <Formik
          enableReinitialize
          initialValues={
            { first_name, last_name, email, password, gender, bYear, bMonth, bDay }
          }
          validationSchema={registerValidation}
          onSubmit={() => {
            let currentDate = new Date()
            let pickDate = new Date(bYear, bMonth - 1, bDay)
            let atLeast14 = new Date(1970 + 14, 0, 1)
            if (currentDate - pickDate < atLeast14) {
              setDateError("Age strict! You are not elder than 14")
            } else if (gender === "") {
              setDateError("")
              setGenderError("Please choose a gender!")
            } else {
              setDateError("")
              setGenderError("")
              submitRegister()
            }
          }}
        >
          {(formik) => (
            <Form className='register_form'>
              <div className="reg_line">
                <RegisterInput
                  type="text"
                  placeholder="First name"
                  name="first_name"
                  bottom={false}
                  onChange={handleRegister}
                />
                <RegisterInput
                  type="text"
                  placeholder="Last name"
                  name="last_name"
                  bottom={false}
                  onChange={handleRegister}
                />
              </div>

              <div className="reg_line">
                <RegisterInput
                  type="text"
                  placeholder="Email address"
                  name="email"
                  bottom={false}
                  onChange={handleRegister}
                />
              </div>
              <div className="reg_line">
                <RegisterInput
                  type="password"
                  placeholder="New password"
                  name="password"
                  bottom={false}
                  onChange={handleRegister}
                />
              </div>
              <div className="reg_col">
                <div className="reg_line_header">
                  Date of birth <i className="info_icon"></i>
                </div>
                <div className="reg_grid"
                  style={{ marginBottom: `${dateError && "70px"}` }}>
                  <select name="bDay" value={bDay} onChange={handleRegister}>
                    {days.map((day, index) => (
                      <option key={index} value={day}>{day}</option>
                    ))}
                  </select>
                  <select name="bMonth" value={bMonth} onChange={handleRegister}>
                    {months.map((month, index) => (
                      <option key={index} value={month}>{month}</option>
                    ))}
                  </select>
                  <select name="bYear" value={bYear} onChange={handleRegister}>
                    {years.map((year, index) => (
                      <option key={index} value={year}>{year}</option>
                    ))}
                  </select>
                  {dateError && <div className='input_error'>
                    <div className="error_arrow_bottom"></div>
                    {dateError}</div>}
                </div>
              </div>
              <div className="reg_col">
                <div className="reg_line_header">
                  Gender <i className="info_icon"></i>
                </div>
                <div className="reg_grid"
                  style={{ marginBottom: `${genderError && "70px"}` }}>
                  <label htmlFor="male">
                    Male
                    <input type="radio" name="gender" id='male' value="male" onChange={handleRegister} />
                  </label>
                  <label htmlFor="female">
                    Female
                    <input type="radio" name="gender" id='female' value="female" onChange={handleRegister} />
                  </label>
                  <label htmlFor="other">
                    Other
                    <input type="radio" name="gender" id='other' value="other" onChange={handleRegister} />
                  </label>
                  {genderError && <div className='input_error'>
                    <div className="error_arrow_bottom"></div>
                    {genderError}</div>}
                </div>
              </div>
              <div className="reg_infos">
                By clicking Sign up, you agree to our {" "}
                <span>Terms, Data Policy</span>
                {" "}You may receive SMS, email notifications from us
                and can opt out at any time.
              </div>
              <div className="reg_btn_wrapper">
                <button type='submit' className='blue_btn open_signup'>Sign Up</button>
              </div>
              <CircleLoader color='#1876f2' loading={loading} size={30} />
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default RegisterForm