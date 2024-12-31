import React, { useState, useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import InputField from "../../reusable/InputField";
import EditableTextarea from "../../reusable/EditableTextarea";
import StatusAlert, { StatusAlertService } from "react-status-alert";
import "react-status-alert/dist/status-alert.css";
import axios from "axios";
import Loading from "../../reusable/Loading";
import Moment from "moment";

const Detail = () => {
  const { id } = useParams();

  const [isReadOnly, setIsReadOnly] = useState(true);
  const [durationMonths, setDurationMonths] = useState(0);

  const handleToggleReadOnly = () => {
    setIsReadOnly(!isReadOnly);
  };

  const handlePaymentMethodChange = (e, setFieldValue) => {
    const selectedPaymentMethod = e.target.value;
    setFieldValue("paymentMethod", selectedPaymentMethod);
    if (selectedPaymentMethod === "CASH") {
      setFieldValue("installmentCount", 1);
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
      // Handle error
    }
  };

  const [data, setData] = useState(null); // Ganti dengan null untuk menandakan data belum tersedia
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const handleBatal = () => {
    navigate(`/user/submission/`);
  };

  const [initialValues, setInitialValues] = useState({
    startDate: "",
    endDate: "",
    paymentMethod: "",
    installmentCount: "",
    fileProposal: [],
    price: "",
    note: "",
    beritaAcara: [],
  });

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}applications/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const applicationData = response.data.data.application;
      setData(applicationData);

      const startDate = new Date(applicationData.rent_start_date)
        .toISOString()
        .slice(0, 16);
      const endDate = new Date(applicationData.rent_end_date)
        .toISOString()
        .slice(0, 16);

      // Update initialValues with the fetched data
      setInitialValues({
        startDate: startDate || "",
        endDate: endDate || "",
        paymentMethod: applicationData.payment_type || "",
        installmentCount: applicationData.installment_count || "",
        price: applicationData.proposed_price || "",
        note: applicationData.note || "-",
        fileProposal: [],
        beritaAcara: [],
      });

      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const validationSchema = Yup.object({
    startDate: Yup.date().required("Tanggal awal diperlukan"),
    endDate: Yup.date()
      .required("Tanggal akhir diperlukan")
      .test(
        "is-one-month-later",
        "Tanggal akhir harus minimal 1 bulan setelah tanggal mulai",
        function (value) {
          const { startDate } = this.parent;
          if (!startDate || !value) return true;
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
      .max(1, "Minimal 1 dokumen")
      .required("Proposal is required"),
    beritaAcara: Yup.array()
      .of(
        Yup.mixed().test(
          "type",
          "Harus berupa file pdf",
          (value) => value && ["application/pdf"].includes(value.type)
        )
      )
      .max(1, "Minimal 1 dokumen")
      .required("Berita Acara is required"),
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
      if (values.fileProposal[0]) {
        formData.append("proposal", values.fileProposal[0]);
      }
      if (values.beritaAcara[0]) {
        formData.append("minutesOfMeeting", values.beritaAcara[0]);
      }

      await axios.put(
        `${import.meta.env.VITE_API_URL}applications/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
          timeout: 60000,
        }
      );

      resetForm();
      StatusAlertService.showSuccess("Pengajuan berhasil diupdate!");
      navigate("/user/submission");
    } catch (error) {
      console.error(error);
      StatusAlertService.showError("Gagal mengupdate pengajuan");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="pt-4 bg-gray-50 ">
      <div className="w-[95%] lg:w-full bg-white shadow-md mx-auto rounded-lg p-6">
        <StatusAlert />
        {/* Header */}
        <button
          onClick={() => navigate("/user/submission")}
          className="flex items-center gap-2 text-gray-600 text-sm mb-6"
        >
          <FaArrowLeft />
          Kembali
        </button>

        <h1 className="text-xl font-semibold text-gray-800 mb-8">
          Detail Pengajuan
        </h1>
        {loading ? (
          <Loading />
        ) : (
          <>
            {data.length === 0 ? (
              <div className="flex items-center justify-center h-screen">
                <p className="text-gray-800 font-semibold">
                  Belum ada data pengajuan
                </p>
              </div>
            ) : (
              <>
                <div className="xs:w-full md:w-[80%] flex flex-row justify-between">
                  <div className="flex justify-between">
                    <div className="flex flex-col gap-6">
                      <div>
                        <p className="text-sm text-gray-500 font-medium">
                          Id Pengajuan
                        </p>
                        <p className="text-gray-800 font-semibold">{data.id}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 font-medium">
                          Tipe
                        </p>
                        <p className="text-gray-800 font-semibold">
                          {data.asset?.type}
                        </p>
                      
                        <p className="text-sm text-gray-500 font-medium">
                          Nama Properti
                        </p>
                        <p className="text-gray-800 font-semibold">
                          {data.asset?.name}
                        </p>
                        <p className="text-gray-500 text-sm">
                          {data?.asset?.properties?.address ||
                            data?.asset?.tenants?.address}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-6 mb-6">
                    <div>
                      <p className="text-sm text-gray-500 font-medium">
                        Tanggal Pengajuan (Update Terakhir)
                      </p>
                      <p className="text-gray-800 font-semibold">
                        {Moment(data.updatedAt).format("DD-MM-YYYY HH:mm")}
                      </p>
                    </div>
                    {/* Detail Penyewa dan Properti */}
                    <div className="flex flex-col">
                      <div>
                        <p className="text-sm text-gray-500 font-medium">
                          Penyewa
                        </p>
                        <p className="text-gray-800 font-semibold">
                          {data.user.company}
                        </p>
                        <p className="text-gray-500 text-sm">{data.user.pic}</p>
                        <p className="text-gray-500 text-sm">
                          {data.user.contact}
                        </p>
                        <p className="text-gray-500 text-sm">
                          {data.user.address}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Status Pengajuan dan Status Pembayaran */}
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={onSubmit}
                  enableReinitialize={true}
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
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6 mt-8">
                        <div>
                          <p className="text-sm text-gray-500 font-medium mb-2">
                            Status Pengajuan
                          </p>
                          <p className="bg-blue-500 text-white font-semibold text-sm px-3 py-1 rounded-full inline-block">
                            {data.status}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 font-medium mb-2">
                            Status Pembayaran
                          </p>
                          <Field
                            as="select"
                            name="paymentMethod"
                            className={`w-full lg:w-[55%] p-2 border ${
                              touched.paymentMethod && errors.paymentMethod
                                ? "border-red-500"
                                : "border-gray-300"
                            } rounded-md bg-white focus:ring-purple-500 focus:border-purple-500`}
                            onChange={(e) =>
                              handlePaymentMethodChange(e, setFieldValue)
                            }
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

                      {/* Cicilan */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                        <div>
                          <p className="text-sm text-gray-500 font-medium mb-2">
                            Jumlah Cicilan
                          </p>
                          <div className="flex items-center gap-1">
                            <Field
                              as="select"
                              name="installmentCount"
                              className={`w-full lg:w-[55%] p-2 border ${
                                touched.installmentCount &&
                                errors.installmentCount
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
                        </div>
                        <div className=" w-full lg:w-[55%]">
                          <p className="text-sm text-gray-500 font-medium mb-2">
                            Harga Pengajuan
                          </p>
                          <Field
                            name="price"
                            type="text"
                            onChange={(e) =>
                              handlePriceChange(e, setFieldValue)
                            }
                            onBlur={() =>
                              handlePriceBlur(setFieldValue, values.price)
                            }
                            className="w-full p-2 border rounded-md bg-white focus:ring-purple-500 focus:border-purple-500"
                            placeholder="Rp. 0"
                          />
                          <ErrorMessage
                            name="price"
                            component="p"
                            className="text-sm text-red-500"
                          />
                        </div>
                      </div>

                      {/* Jangka Waktu dan Harga */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                        <div className="">
                          <p className="text-sm text-gray-500 font-medium mb-2">
                            Durasi (Bulan)
                          </p>
                          <Field
                            type="number"
                            min="0"
                            name="installmentCount"
                            value={durationMonths}
                            onChange={(e) =>
                              handleDurationChange(e, setFieldValue)
                            }
                            className="w-full lg:w-[55%] p-2 border rounded-md bg-white focus:ring-purple-500 focus:border-purple-500"
                          />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 font-medium mb-2">
                            Jangka Waktu
                          </p>
                          <div className="flex items-center gap-1">
                            <div className="flex items-center w-[45%]">
                              <Field
                                type="datetime-local"
                                name="startDate"
                                className={` w-full p-2 border ${
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
                        </div>
                      </div>
                      {/* Link Proposal dan Berita Acara */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                        <div>
                          <label className="block text-sm text-gray-500 font-medium mb-2">
                            Link Proposal
                          </label>
                          <div className="flex items-center gap-2">
                            <InputField
                              type="file"
                              name="fileProposal"
                              className="px-0 mb-0 text-sm"
                              onChange={(e) =>
                                setFieldValue(
                                  "fileProposal",
                                  Array.from(e.target.files)
                                )
                              }
                            />
                            <Link
                              target="_blank"
                              to={`https://drive.google.com/file/d/${data.proposal}`}
                              className="text-purple-600 text-sm underline"
                            >
                              Lihat
                            </Link>
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm text-gray-500 font-medium mb-2">
                            Link Berita Acara
                          </label>
                          <div className="flex items-center gap-2">
                            <InputField
                              type="file"
                              name="beritaAcara"
                              className="px-0 mb-0 text-sm"
                              onChange={(e) =>
                                setFieldValue(
                                  "beritaAcara",
                                  Array.from(e.target.files)
                                )
                              }
                            />
                            <Link
                              target="_blank"
                              to={`https://drive.google.com/file/d/${data.minutesOfMeeting}`}
                              className="text-purple-600 text-sm underline"
                            >
                              Lihat
                            </Link>
                          </div>
                        </div>
                      </div>

                      {/* Keterangan */}
                      <div className="mb-6 w-full lg:w-[55%]">
                        <label className="block text-sm text-gray-500 font-medium mb-2">
                          Keterangan
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

                      {/* Buttons */}
                      <div className="flex justify-center gap-4">
                        <button
                          onClick={handleBatal}
                          className="px-6 py-2 border border-gray-300 rounded-md text-gray-700"
                        >
                          Batal
                        </button>
                        <button
                          className="px-6 py-2 bg-purple-600 text-white rounded-md"
                          type="submit"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? "Menyimpan..." : "Simpan"}
                        </button>
                      </div>
                    </Form>
                  )}
                </Formik>
              </>
            )}
          </>
        )}
        {/* ID dan Tanggal Pengajuan */}
      </div>
    </main>
  );
};

export default Detail;
