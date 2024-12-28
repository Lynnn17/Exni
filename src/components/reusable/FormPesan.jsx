import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useParams, useNavigate } from "react-router-dom";
import InputField from "./InputField";
import EditableTextarea from "./EditableTextarea";
import StatusAlert, { StatusAlertService } from "react-status-alert";
import "react-status-alert/dist/status-alert.css";
import axios from "axios";

const FormComponent = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { user_id } = JSON.parse(localStorage.getItem("user"));
  const [isReadOnly, setIsReadOnly] = useState(true);
  const [durationMonths, setDurationMonths] = useState(0);
  const localDate = new Date();
  const currentDate = localDate
    .toLocaleString("sv-SE", { timeZoneName: "short" })
    .slice(0, 16);
  // const currentDate = new Date().toISOString().slice(0, 16); // Truncate to remove seconds and milliseconds

  const handleToggleReadOnly = () => {
    setIsReadOnly(!isReadOnly);
  };

  const handlePaymentMethodChange = (e, setFieldValue) => {
    const selectedPaymentMethod = e.target.value;
    setFieldValue("paymentMethod", selectedPaymentMethod);

    // If "CASH" is selected, set installmentCount to 1 and disable the select
    if (selectedPaymentMethod === "CASH") {
      setFieldValue("installmentCount", 1); // Set default installment count to 1
    }
  };

  const handlePriceChange = (e, setFieldValue) => {
    let inputValue = e.target.value;

    // Remove all non-numeric characters except commas
    inputValue = inputValue.replace(/[^\d,]/g, "");

    // Remove the commas and format the number
    const number = inputValue.replace(/[^\d]/g, "");
    const formattedValue = new Intl.NumberFormat("id-ID").format(number);

    // Update the price state with the formatted value
    setFieldValue("price", formattedValue);
  };

  const handlePriceBlur = (setFieldValue, price) => {
    // Save the numeric value without the formatting
    const numericValue = price.replace(/[^\d]/g, "");

    // Use setFieldValue to update the raw numeric value in Formik state
    setFieldValue("price", numericValue);
  };

  const handleDurationChange = (e, setFieldValue) => {
    try {
      const months = parseInt(e.target.value, 10);
      setDurationMonths(months);

      // Update endDate based on startDate and duration
      const startDate = new Date(e.target.form.startDate.value);
      const endDate = new Date(startDate);
      endDate.setMonth(startDate.getMonth() + months);
      setFieldValue("endDate", endDate.toISOString().slice(0, 16)); // Format as 'YYYY-MM-DDTHH:mm'
    } catch (error) {
      // console.error("Error in handleDurationChange:", error);
    }
  };

  const initialValues = {
    startDate: currentDate,
    endDate: "",
    paymentMethod: "INSTALLMENT",
    installmentCount: "3",
    fileProposal: "",
    user_id: user_id,
    asset_id: id,
    price: "",
    note: "-",
  };

  const validationSchema = Yup.object({
    startDate: Yup.date().required("Tanggal awal diperlukan"),
    endDate: Yup.date()
      .required("Tanggal akhir diperlukan")
      .test(
        "is-one-month-later",
        "Tanggal akhir harus minimal 1 bulan setelah tanggal mulai",
        function (value) {
          const { startDate } = this.parent; // Ambil nilai startDate
          if (!startDate || !value) return true; // Jika salah satu kosong, lewati validasi
          const start = new Date(startDate);
          const end = new Date(value);
          const oneMonthLater = new Date(start.setMonth(start.getMonth() + 1));
          return end >= oneMonthLater;
        }
      ),
    paymentMethod: Yup.string().required("Metode pembayaran diperlukan"),
    installmentCount: Yup.string().required("Jumlah cicilan diperlukan"),

    price: Yup.number()
      .typeError("Harga must be a number")
      .required("Harga diperlukan")
      .positive("Harga harus lebih dari 0"),
    note: Yup.string().required("Catatan diperlukan"),
    fileProposal: Yup.array()
      .of(
        Yup.mixed().test(
          "type",
          "Harus berupa file pdf",
          (value) => value && ["application/pdf"].includes(value.type)
        )
      )
      .min(1, "Minimal 1 dokumen")
      .required("File kontrak is required"),
  });

  const onSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const formData = new FormData();
      formData.append(
        "rentStartDate",
        new Date(values.startDate).toISOString()
      );
      formData.append("rentEndDate", new Date(values.endDate).toISOString());
      formData.append("paymentType", values.paymentMethod);
      formData.append("installmentCount", values.installmentCount);
      formData.append("proposedPrice", values.price);
      formData.append("note", values.note);
      formData.append("userId", values.user_id);
      formData.append("assetId", values.asset_id);
      values.fileProposal.forEach((file) => formData.append("proposal", file));

      await axios.post(
        `${import.meta.env.VITE_API_URL}applications`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
          timeout: 60000, // 30 detik (atur sesuai kebutuhan)
        }
      );

      resetForm();
      StatusAlertService.showSuccess("Pengajuan berhasil dikirim!");
      navigate("/user/submission");
    } catch (error) {
      console.error(error);
      StatusAlertService.showError("Gagal mengirimkan proposal");
    } finally {
      setSubmitting(false);
      // resetForm();
    }
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
            <StatusAlert />
            {/* Jangka Waktu */}
            <div className="p-4 w-[50%] flex flex-col">
              <label className="text-sm font-medium text-gray-700">
                Jangka Waktu
              </label>
              <div className="flex items-center">
                <Field
                  type="datetime-local"
                  name="startDate"
                  className={`w-full p-2 border ${
                    touched.startDate && errors.startDate
                      ? "border-red-500"
                      : "border-gray-300"
                  } rounded-md bg-white focus:ring-purple-500 focus:border-purple-500`}
                />
                <span className="text-gray-500 p-2">to</span>
                <Field
                  type="datetime-local"
                  name="endDate"
                  disabled
                  className={`w-full p-2 border ${
                    touched.endDate && errors.endDate
                      ? "border-red-500"
                      : "border-gray-300"
                  } rounded-md bg-white focus:ring-purple-500 focus:border-purple-500`}
                />
              </div>
            </div>
            <div className="px-4 -mt-2">
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
              <div className="p-4">
                <label className="text-sm font-medium text-gray-700">
                  Durasi (bulan)
                </label>
                <Field
                  type="number"
                  name="installmentCount"
                  value={durationMonths}
                  onChange={(e) => handleDurationChange(e, setFieldValue)}
                  className="w-full p-2 border rounded-md bg-white focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
            </div>

            <div className="flex flex-col md:flex-row md:gap-8 ">
              {/* Pengajuan Harga */}
              <div className="p-4 md:w-[50%]">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pengajuan Harga
                </label>

                <Field
                  name="price"
                  type="text"
                  onChange={(e) => handlePriceChange(e, setFieldValue)}
                  onBlur={() => handlePriceBlur(setFieldValue, values.price)}
                  className="w-full p-2 border rounded-md bg-white focus:ring-purple-500 focus:border-purple-500"
                  placeholder="Rp. 0"
                />
                <ErrorMessage
                  name="price"
                  component="p"
                  className="text-sm text-red-500"
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
                  onChange={(e) => handlePaymentMethodChange(e, setFieldValue)}
                >
                  <option value="INSTALLMENT">Cicilan</option>
                  <option value="CASH">Tunai</option>
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
                  disabled={values.paymentMethod === "CASH"}
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
              <div className="p-4 w-[50%]">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload Proposal Pengajuan
                </label>
                <div className="flex items-center w-80  md:w-max">
                  <InputField
                    type="file"
                    name="fileProposal"
                    accept=".pdf"
                    onChange={(e) =>
                      setFieldValue("fileProposal", Array.from(e.target.files))
                    }
                  />
                </div>

                {/* <Field
                    type="file"
                    name="fileContract"
                    accept=".pdf"
                    onChange={(e) => {
                      setFieldValue(
                        "fileContract",
                        Array.from(e.target.files[0])
                      ),
                        setFileName(e.target.files[0].name);
                    }}
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
                /> */}
              </div>
              <div className="p-4 w-full">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Catatan
                </label>

                <Field
                  as={EditableTextarea}
                  isReadOnly={isReadOnly}
                  onToggleReadOnly={handleToggleReadOnly}
                  name="note"
                />
                <ErrorMessage
                  name="note"
                  component="div"
                  className="text-red-500 text-sm"
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
