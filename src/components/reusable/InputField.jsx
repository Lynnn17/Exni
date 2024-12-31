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
  className = "px-2",
  accept = "*",
  setFieldValue,
}) => {
  const handlePriceChange = (e, setFieldValue) => {
    let inputValue = e.target.value;

    // Remove all non-numeric characters except commas
    inputValue = inputValue.replace(/[^\d,]/g, "");

    // Remove the commas and format the number
    const number = inputValue.replace(/[^\d]/g, "");
    const formattedValue = new Intl.NumberFormat("id-ID").format(number);

    // Update the price state with the formatted value
    setFieldValue(name, formattedValue);
  };

  const handlePriceBlur = (price, setFieldValue) => {
    if (!price) return;

    // Save the numeric value without the formatting
    const numericValue = price.replace(/[^\d]/g, "");

    // Use setFieldValue to update the raw numeric value in Formik state
    setFieldValue(name, numericValue);
  };

  const handleFileChange = (event, field, form) => {
    const files = Array.from(event.target.files);

    // Validate the number of files
    if (files.length > maxFiles) {
      StatusAlertService.showError(
        `Maksimal ${maxFiles} file yang dapat diunggah.`
      );
      return;
    }

    // Save file to Formik state
    form.setFieldValue(name, files);
  };

  return (
    <div className={`mb-4 ${className}`}>
      <label htmlFor={name} className="block text-black pl-1">
        {label}
      </label>
      {name === "price" || name === "harga" ? (
        <Field
          name={name}
          type="text"
          onChange={(e) => handlePriceChange(e, setFieldValue)}
          onBlur={(e) => handlePriceBlur(e.target.value, setFieldValue)}
          className=" w-full p-2 border rounded-md bg-white focus:ring-purple-500 focus:border-purple-500"
          placeholder="Rp. 0"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault(); // Mencegah Enter
            }
          }}
        />
      ) : type === "file" ? (
        <Field name={name}>
          {({ field, form }) => (
            <input
              accept={accept}
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
      <ErrorMessage name={name} component="div" className="text-red-500" />
    </div>
  );
};

export default InputField;
