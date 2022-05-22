import React from "react";
import { ErrorMessage, useField } from "formik";

import "./textField.style.css"

/*
  this component represents all text feilds in register / login  forms
  where it recieve 

  - label
  - handle error msgs
  
*/

export const TextField = ({ label, ...props }) => {

  const [field, meta] = useField(props);

  return (
    <div className="mb-2 d-flex flex-column">
      <label htmlFor={field.name} className={`form-label`}>
        {label && label}
      </label>
      <input
        className={`${
          meta.touched && meta.error && "is-invalid "
        } custom-input-auth mt-3`}
        {...field}
        {...props}
        autoComplete="off"
      />
      <ErrorMessage
        component="div"
        name={field.name}
        className="invalid-feedback unvalid-text"
      />
    </div>
  );
};