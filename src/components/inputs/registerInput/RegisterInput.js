import React from 'react'
import { useField, ErrorMessage } from 'formik'
import { useMediaQuery } from "react-responsive"
import "./registerInput.css"

const RegisterInput = ({ placeholder, bottom, ...props }) => {
    const [field, meta] = useField(props);
    const desktopView1 = useMediaQuery({
        query: "(min-width:539px)"
    })
    const desktopView2 = useMediaQuery({
        query: "(min-width:850px)"
    })
    const desktopView3 = useMediaQuery({
        query: "(min-width:1170px)"
    })
    return (
        <div className="input_wrap register_input_wrap">

            <input
                className={meta.touched && meta.error ? "input_error_border" : ""}
                style={{
                    width: `${desktopView1 && (field.name === "first_name" || field.name === "last_name") ? "100%"
                        : desktopView1 && (field.name === "email" || field.name === "password") ? "370px" : "300px"
                        }`
                }}
                type={field.type}
                name={field.name}
                placeholder={placeholder}
                {...field}
                {...props}
            />
            {meta.touched && meta.error && <div className='input_error'>
                {meta.touched && meta.error && <ErrorMessage name={field.name} />}
                {meta.touched && meta.error && <div className="error_arrow_bottom"></div>}
            </div>}
            {meta.touched && meta.error && <i className='error_icon'></i>}
        </div>
    );
}

export default RegisterInput