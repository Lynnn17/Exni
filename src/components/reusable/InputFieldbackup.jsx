import React from "react";
import { Field, ErrorMessage } from "formik";
import Input from "./Input";

const InputField = ({ name, label, type, placeholder }) => (
  <div className="mb-4">
    <Field
      name={name}
      as={Input}
      type={type}
      label={label}
      placeholder={placeholder}
    />
    <ErrorMessage name={name} component="div" className="text-red-500 pl-4" />
  </div>
);

export default InputField;
