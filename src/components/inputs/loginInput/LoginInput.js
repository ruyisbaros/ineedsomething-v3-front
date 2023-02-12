import React from 'react'
import { useField, ErrorMessage } from 'formik'
import { RiErrorWarningFill } from "react-icons/ri"
import "./loginInput.css"

const LoginInput = ({ placeholder, bottom, ...props }) => {
    const [field, meta] = useField(props);
    return (
        <div className="input_wrap">
            {meta.touched && meta.error && !bottom && <div className='input_error'
                style={{ transform: "translateY(4px)" }}>
                {meta.touched && meta.error && <ErrorMessage name={field.name} />}
                {meta.touched && meta.error && <div className="error_arrow_top"></div>}
            </div>}
            <input
                className={meta.touched && meta.error ? "input_error_border" : ""}
                type={field.type}
                name={field.name}
                placeholder={placeholder}
                {...field}
                {...props}
            />
            {meta.touched && meta.error && bottom && <div className='input_error'>
                {meta.touched && meta.error && <ErrorMessage name={field.name} />}
                {meta.touched && meta.error && <div className="error_arrow_bottom"></div>}
            </div>}
            {meta.touched && meta.error && < RiErrorWarningFill className='err_i' size={15} style={{ color: "#b94a48", top: `${!bottom && "60%"}` }} />}
        </div>
    );
}

export default LoginInput