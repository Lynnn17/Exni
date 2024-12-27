import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const FormComponent = () => {
  const [fileName, setFileName] = useState("");

  const handleFileChange = (e, setFieldValue) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      setFieldValue("file", file);
    } else {
      setFileName("");
      setFieldValue("file", null);
    }
  };

  const initialValues = {
    startDate: "",
    endDate: "",
    paymentMethod: "cicilan",
    installmentCount: "3",
    file: null,
  };

  const validationSchema = Yup.object({
    startDate: Yup.date().required("Tanggal awal diperlukan"),
    endDate: Yup.date().required("Tanggal akhir diperlukan"),
    paymentMethod: Yup.string().required("Metode pembayaran diperlukan"),
    installmentCount: Yup.string().required("Jumlah cicilan diperlukan"),

    file: Yup.array()
      .of(
        Yup.mixed().test(
          "type",
          "Harus berupa file pdf",
          (value) => value && ["application/pdf"].includes(value.type)
        )
      )
      .max(1, "Minimal 1 dokumen")
      .required("File kontrak is required"),
  });

  const onSubmit = (values, { setSubmitting, resetForm }) => {
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
      setSubmitting(false);
      resetForm();
    }, 400);
  };

  return (
    <div className="rounded-lg shadow-md">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({
          values,
          errors,
          touched,
          isSubmitting,
          setFieldValue,
          resetForm,
        }) => (
          <Form>
            {/* Jangka Waktu */}
            <div className="p-4 w-[50%]">
              <label className="text-sm font-medium text-gray-700">
                Jangka Waktu
              </label>
              <div className="flex items-center">
                <Field
                  type="date"
                  name="startDate"
                  className={`w-full p-2 border ${
                    touched.startDate && errors.startDate
                      ? "border-red-500"
                      : "border-gray-300"
                  } rounded-md bg-white focus:ring-purple-500 focus:border-purple-500`}
                />
                <span className="text-gray-500 p-2">to</span>
                <Field
                  type="date"
                  name="endDate"
                  className={`w-full p-2 border ${
                    touched.endDate && errors.endDate
                      ? "border-red-500"
                      : "border-gray-300"
                  } rounded-md bg-white focus:ring-purple-500 focus:border-purple-500`}
                />
              </div>
              <ErrorMessage
                name="startDate"
                component="p"
                className="text-sm text-red-500"
              />
              <ErrorMessage
                name="endDate"
                component="p"
                className="text-sm text-red-500"
              />
            </div>

            <div className="flex flex-col md:flex-row md:gap-8 ">
              {/* Pengajuan Harga */}
              <div className="p-4 md:w-[50%]">
                <label className="block text-sm font-medium text-gray-700 mb-2">
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
              <div className="p-4 md:w-[50%]">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Metode Pelunasan
                </label>
                <Field
                  as="select"
                  name="paymentMethod"
                  className={`w-full p-2 border ${
                    touched.paymentMethod && errors.paymentMethod
                      ? "border-red-500"
                      : "border-gray-300"
                  } rounded-md bg-white focus:ring-purple-500 focus:border-purple-500`}
                >
                  <option value="cicilan">Cicilan</option>
                  <option value="tunai">Tunai</option>
                </Field>
                <ErrorMessage
                  name="paymentMethod"
                  component="p"
                  className="text-sm text-red-500"
                />
              </div>
            </div>

            <div className="flex flex-col md:flex-row md:gap-8">
              {/* Jumlah Cicilan */}
              <div className="p-4 md:w-[50%]">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Jumlah Cicilan
                </label>
                <Field
                  as="select"
                  name="installmentCount"
                  className={`w-full p-2 border ${
                    touched.installmentCount && errors.installmentCount
                      ? "border-red-500"
                      : "border-gray-300"
                  } rounded-md bg-white focus:ring-purple-500 focus:border-purple-500`}
                >
                  <option value="3">3X</option>
                  <option value="6">6X</option>
                  <option value="12">12X</option>
                  <option value="24">24X</option>
                </Field>
                <ErrorMessage
                  name="installmentCount"
                  component="p"
                  className="text-sm text-red-500"
                />
              </div>

              {/* Upload Proposal Pengajuan */}
              <div className="p-4 md:w-[50%]">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload Proposal Pengajuan
                </label>
                <div className="flex items-center">
                  <input
                    type="file"
                    name="file"
                    onChange={(e) => handleFileChange(e, setFieldValue)}
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
                <ErrorMessage
                  name="file"
                  component="p"
                  className="text-sm text-red-500"
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="flex w-full p-8 justify-center">
              <div className="w-[65%] md:w-[50%] flex flex-row gap-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600"
                >
                  {isSubmitting ? "Mengirimkan..." : "Kirim"}
                </button>
                <button
                  type="button"
                  onClick={() => resetForm()}
                  className="w-full py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default FormComponent;
