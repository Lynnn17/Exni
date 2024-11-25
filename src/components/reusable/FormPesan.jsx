import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

const FormComponent = () => {
  const [fileName, setFileName] = useState("");

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setFileName(e.target.files[0].name);
      formik.setFieldValue("file", e.target.files[0]);
    } else {
      setFileName("");
      formik.setFieldValue("file", "");
    }
  };

  const formik = useFormik({
    initialValues: {
      startDate: "",
      endDate: "",
      paymentMethod: "cicilan",
      installmentCount: "6x",
      file: null,
    },
    validationSchema: Yup.object({
      startDate: Yup.date().required("Tanggal awal diperlukan"),
      endDate: Yup.date().required("Tanggal akhir diperlukan"),
      paymentMethod: Yup.string().required("Metode pembayaran diperlukan"),
      installmentCount: Yup.string().required("Jumlah cicilan diperlukan"),
      file: Yup.mixed().required("File proposal diperlukan"),
    }),
    onSubmit: (values) => {
      alert("Formulir berhasil dikirim!");
      console.log(values);
    },
  });

  return (
    <div className=" mx-auto  bg-white rounded-lg shadow-md">
      <form onSubmit={formik.handleSubmit}>
        {/* Jangka Waktu */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Jangka Waktu
          </label>
          <div className="flex items-center gap-2">
            <input
              type="date"
              name="startDate"
              className={`w-full p-2 border ${
                formik.touched.startDate && formik.errors.startDate
                  ? "border-red-500"
                  : "border-gray-300"
              } rounded-md bg-white focus:ring-purple-500 focus:border-purple-500`}
              placeholder="Tanggal Awal"
              value={formik.values.startDate}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <span className="text-gray-500">to</span>
            <input
              type="date"
              name="endDate"
              className={`w-full p-2 border ${
                formik.touched.endDate && formik.errors.endDate
                  ? "border-red-500"
                  : "border-gray-300"
              } rounded-md bg-white focus:ring-purple-500 focus:border-purple-500`}
              placeholder="Tanggal Akhir"
              value={formik.values.endDate}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>
          {formik.touched.startDate && formik.errors.startDate && (
            <p className="text-sm text-red-500">{formik.errors.startDate}</p>
          )}
          {formik.touched.endDate && formik.errors.endDate && (
            <p className="text-sm text-red-500">{formik.errors.endDate}</p>
          )}
        </div>

        {/* Pengajuan Harga */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Pengajuan Harga
          </label>
          <input
            type="text"
            value="Rp. 132.000.000"
            readOnly
            className="w-full p-2 border border-gray-300 rounded-md bg-gray-100"
          />
        </div>

        {/* Metode Pembayaran */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Metode Pembayaran
          </label>
          <select
            name="paymentMethod"
            className={`w-full p-2 border ${
              formik.touched.paymentMethod && formik.errors.paymentMethod
                ? "border-red-500"
                : "border-gray-300"
            } rounded-md bg-white focus:ring-purple-500 focus:border-purple-500`}
            value={formik.values.paymentMethod}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          >
            <option value="cicilan">Cicilan</option>
            <option value="tunai">Tunai</option>
          </select>
          {formik.touched.paymentMethod && formik.errors.paymentMethod && (
            <p className="text-sm text-red-500">
              {formik.errors.paymentMethod}
            </p>
          )}
        </div>

        {/* Jumlah Cicilan */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Jumlah Cicilan
          </label>
          <select
            name="installmentCount"
            className={`w-full p-2 border ${
              formik.touched.installmentCount && formik.errors.installmentCount
                ? "border-red-500"
                : "border-gray-300"
            } rounded-md bg-white focus:ring-purple-500 focus:border-purple-500`}
            value={formik.values.installmentCount}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          >
            <option value="6x">6X</option>
            <option value="12x">12X</option>
            <option value="24x">24X</option>
          </select>
          {formik.touched.installmentCount &&
            formik.errors.installmentCount && (
              <p className="text-sm text-red-500">
                {formik.errors.installmentCount}
              </p>
            )}
        </div>

        {/* Upload Proposal Pengajuan */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Upload Proposal Pengajuan
          </label>
          <div className="flex items-center">
            <input
              type="file"
              name="file"
              onChange={handleFileChange}
              className="hidden"
              id="fileUpload"
            />
            <label
              htmlFor="fileUpload"
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg cursor-pointer hover:bg-gray-300"
            >
              Choose File
            </label>
            <span className="ml-4 text-sm text-gray-700">
              {fileName || "Belum ada file"}
            </span>
          </div>
          {formik.touched.file && formik.errors.file && (
            <p className="text-sm text-red-500">{formik.errors.file}</p>
          )}
        </div>

        {/* Buttons */}
        <div className="flex gap-4">
          <button
            type="submit"
            className="w-full py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600"
          >
            Bayar
          </button>
          <button
            type="button"
            className="w-full py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
            onClick={() => formik.resetForm()}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormComponent;
