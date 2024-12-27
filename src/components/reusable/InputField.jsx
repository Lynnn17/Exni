import React from "react";
import { Field, ErrorMessage } from "formik";
import StatusAlert, { StatusAlertService } from "react-status-alert";
import "react-status-alert/dist/status-alert.css";

const InputField = ({
  name,
  label,
  type,
  placeholder,
  maxFiles = 1,
  onChange,
  className = "px-2",
}) => {
  const handleFileChange = (event, field, form) => {
    const files = Array.from(event.target.files);

    // Validasi jumlah file
    if (files.length > maxFiles) {
      StatusAlertService.showError(
        `Maksimal ${maxFiles} file yang dapat diunggah.`
      );

      return;
    }

    // Simpan file ke Formik state
    form.setFieldValue(name, files);
  };

  return (
    <div className={`mb-4 ${className}`}>
      <label htmlFor={name} className="block text-black pl-1">
        {label}
      </label>
      {type === "file" ? (
        <Field name={name}>
          {({ field, form }) => (
            <input
              id={name}
              type="file"
              placeholder={placeholder}
              onChange={(e) => handleFileChange(e, field, form)}
              multiple={maxFiles > 1}
              className="mt-2 block w-full border border-gray-300 p-2 rounded"
            />
          )}
        </Field>
      ) : (
        <Field
          name={name}
          type={type}
          placeholder={placeholder}
          className="mt-2 block w-full border border-gray-300 p-2 rounded"
        />
      )}
      <ErrorMessage name={name} component="div" className="text-red-500 " />
    </div>
  );
};

export default InputField;
