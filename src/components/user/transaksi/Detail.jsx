import StatusAlert, { StatusAlertService } from "react-status-alert";
import "react-status-alert/dist/status-alert.css";
import React, { useState, useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";
import Loading from "../../reusable/Loading";
import moment from "moment";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import InputField from "../../reusable/InputField";

const Detail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}transactions/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(response.data.data);
      setData(response.data.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      StatusAlertService.showError("Error fetching data");
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const onSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const formData = new FormData();
      formData.append("amount", values.price);
      formData.append("receipt", values.buktiTransfer[0]);

      await axios.put(
        `${import.meta.env.VITE_API_URL}transactions/${id}/receipt`,
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
      StatusAlertService.showSuccess("Transaksi berhasil dikirim!");
      navigate("/user/transaction");
    } catch (error) {
      console.error(error);
      StatusAlertService.showError("Gagal mengirimkan transaksi");
    } finally {
      setSubmitting(false);
      resetForm();
    }
  };

  const initialValues = {
    price: "",
    buktiTransfer: [],
  };

  const validationSchema = Yup.object({
    price: Yup.number()
      .typeError("Harga must be a number")
      .required("Harga diperlukan")
      .positive("Harga harus lebih dari 0"),
    buktiTransfer: Yup.array()
      .of(
        Yup.mixed().test(
          "type",
          "Harus berupa file foto",
          (value) =>
            value &&
            ["image/jpg", "image/jpeg", "image/png", "image/webp"].includes(
              value.type
            )
        )
      )
      .max(1, "Maksimal 1 foto")
      .required("Bukti Transfer is required"),
  });

  return (
    <main className=" pt-4 bg-gray-50">
      <div className="w-[95%] lg:w-full mx-auto bg-white shadow-md rounded-lg p-6">
        <StatusAlert />

        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 text-sm mb-6"
        >
          <FaArrowLeft />
          Kembali
        </button>
        {/* Header */}
        <h1 className="text-xl font-semibold text-gray-800 mb-8">Transaksi</h1>

        {loading ? (
          <Loading />
        ) : (
          <>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <p className="text-sm text-gray-500 font-medium">
                  ID Transaksi
                </p>
                <p className="text-gray-800 font-semibold">{data?.id}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">ID Sewa</p>
                <p className="text-gray-800 font-semibold">{data?.rent_id}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">
                  Tanggal Pengajuan (Update)
                </p>
                <p className="text-gray-800 font-semibold">
                  {moment(data?.updated_at).format("DD MMMM YYYY HH:mm")}
                </p>
              </div>
            </div>

            {/* Form */}

            {/* Penyewa dan Properti Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6">
              <div>
                <p className="text-sm text-gray-500 font-medium">Penyewa</p>
                <p className="text-gray-800 font-semibold">
                  PT. SAMPOERNA Tbk. nunggu backend
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">
                  Properti nunggu backend
                </p>
                <p className="text-gray-800 font-semibold">
                  Cv. Gracia Blue Logistic
                </p>
                <p className="text-gray-500 text-sm">
                  Graha Pelni, Jl Pahlawan No.18, Surabaya
                </p>
              </div>
            </div>

            {/* Pembayaran Cicilan Ke and Nominal */}
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
            >
              {({ isSubmitting, setFieldValue }) => (
                <Form>
                  <div className=" grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                    <div>
                      <label className="block text-sm text-gray-500 font-medium mb-2">
                        Pembayaran Cicilan Ke
                      </label>
                      <input
                        type="text"
                        className="w-full border border-gray-300 rounded-md p-2"
                        value={data?.number_of_trans}
                        disabled
                      />
                    </div>

                    <div>
                      <label className="block text-sm text-gray-500 font-medium mb-2">
                        Nominal Pembayaran
                      </label>
                      <InputField
                        name="price"
                        type="text"
                        placeholder="Enter your price"
                        setFieldValue={setFieldValue}
                        className="px-0"
                      />
                    </div>
                  </div>

                  {/* Rekening and Upload */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-8">
                    {/* Rekening Section */}
                    <div>
                      <p className="text-sm text-gray-500 font-medium">
                        Nomor Rekening
                      </p>
                      <div className="flex items-center gap-2">
                        <p className="text-gray-800 font-semibold">
                          7328195989
                        </p>
                        <button
                          className="text-purple-700 text-sm font-medium hover:underline"
                          onClick={() => {
                            navigator.clipboard
                              .writeText("7328195989")
                              .then(() => {
                                StatusAlertService.showSuccess(
                                  "Nomor rekening berhasil disalin!"
                                );
                              })
                              .catch(() => {
                                StatusAlertService.showError(
                                  "Gagal menyalin nomor rekening."
                                );
                              });
                          }}
                        >
                          Salin
                        </button>
                      </div>
                      <p className="text-gray-500 text-sm">
                        BCA / PT Pelayanan Nasional Indonesia
                      </p>
                    </div>

                    {/* Upload Bukti Transfer */}
                    <div>
                      <label className="block text-sm text-gray-500 font-medium mb-2">
                        Upload Bukti Transfer
                      </label>
                      <InputField
                        type="file"
                        name="buktiTransfer"
                        accept=".pdf"
                        className="px-0"
                        onChange={(e) =>
                          setFieldValue(
                            "buktiTransfer",
                            Array.from(e.target.files)
                          )
                        }
                      />
                    </div>
                  </div>

                  {/* Buttons */}
                  <div
                    className="flex justify-center
           gap-4"
                  >
                    <Link
                      to="/user/transaction"
                      type="button"
                      className="px-6 py-2 border border-gray-300 rounded-md text-gray-700"
                    >
                      Batal
                    </Link>
                    <button
                      type="submit"
                      className="px-6 py-2 bg-purple-600 text-white rounded-md"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Loading..." : "Submit"}
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </>
        )}
      </div>
    </main>
  );
};

export default Detail;
