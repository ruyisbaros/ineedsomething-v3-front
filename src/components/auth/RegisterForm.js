import { Form, Formik } from 'formik'
import React, { useState } from 'react'
import RegisterInput from '../inputs/registerInput/RegisterInput'
import * as Yup from "yup"
const RegisterForm = () => {
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
  /* console.log(years)
  console.log(months)
  console.log(days) */

  //console.log(registerUser)
  const registerValidation = Yup.object({
    first_name: Yup.string().required("What is your first name?").min(2, "First name must between 2 and 16 characters").max(16, "First name must between 2 and 16 characters").matches(/^[aA-zZ]+$/, "Numbers and special characters are not allowed!"),
    last_name: Yup.string().required("What is your surname?").min(2, "Last name must between 2 and 16 characters").max(16, "Last name must between 2 and 16 characters").matches(/^[aA-zZ]+$/, "Numbers and special characters are not allowed!"),
    email: Yup.string().required("You will need this when you log in and if you ever need to reset your password").email("Must be valid email"),
    password: Yup.string().required("Password is required").min(6)
  })
  return (
    <div className='blur'>
      <div className="register">
        <div className="register_header">
          <span className='close_register'>&times;</span>
          <span className='sign_title'>Sign Up</span>
          <span className='sign_text'>It's quick and easy</span>
        </div>
        <Formik
          enableReinitialize
          initialValues={
            { first_name, last_name, email, password, gender, bYear, bMonth, bDay }
          }
          validationSchema={registerValidation}
          onSubmit={() => { }}
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
                <div className="reg_grid" value={bDay}>
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
                </div>
              </div>
              <div className="reg_col">
                <div className="reg_line_header">
                  Gender <i className="info_icon"></i>
                </div>
                <div className="reg_grid">
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
                </div>
              </div>
              <div className="reg_infos">
                By clicking Sign up, you agree to our {" "}
                <span>Terms, Data Policy</span>
                {" "}You may receive SMS, email notifications from us
                and can opt out at any time.
              </div>
              <div className="reg_btn_wrapper">
                <button className='blue_btn open_signup'>Sign Up</button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default RegisterForm