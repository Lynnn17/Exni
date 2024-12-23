import React, { useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import LogoExni from "../../assets/logo/exni.svg";
import { Link } from "react-router-dom";
import StatusSelect from "./StatusSelect";
import EditableTextarea from "./EditableTextarea";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { StatusAlertService } from "react-status-alert";
import "react-status-alert/dist/status-alert.css";

const InfoLine = ({ label, value }) => (
  <div className="grid grid-cols-5 gap-1 items-center">
    <strong className="text-sm col-span-2">{label}</strong>
    <p className=":">:</p>
    <p className="-ml-12 text-sm col-span-2 mt-1">{value}</p>
  </div>
);

const Modal = ({ isOpen, onClose, data, fetchData }) => {
  if (!isOpen || !data) return null;

  const [isReadOnly, setIsReadOnly] = useState(true);

  const optionsPembayaran = [
    { value: "APPROVED", label: "Disetujui" },
    { value: "REJECTED", label: "Ditolak" },
  ];

  const validationSchema = Yup.object({
    note: Yup.string().required("Keterangan harus diisi"),
    status: Yup.string().required("Status harus diisi"),
  });

  const handleToggleReadOnly = () => setIsReadOnly(!isReadOnly);

  const handleSimpan = async (values, { setSubmitting }) => {
    try {
      console.log("values", values);
      await axios.put(
        `${import.meta.env.VITE_API_URL}transactions/${data.id}/status`,
        values,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      StatusAlertService.showSuccess("Data berhasil disimpan!");
      onClose();
      fetchData();
    } catch (error) {
      console.error("Error saving data:", error);
      StatusAlertService.showError("Terjadi kesalahan saat menyimpan data.");
    } finally {
      setSubmitting(false);
    }
  };

  const jenisPembayaranMapping = {
    INSTALLMENT: "Cicilan",
    CASH: "Lunas",
  };

  const statusMapping = {
    INITIATE: "Diajukan",
    PENDING: "Diproses",
    APPROVED: "Disetujui",
    REJECTED: "Ditolak",
  };

  const status = statusMapping[data.status] || "Tidak Diketahui";

  const jenisPembayaran =
    jenisPembayaranMapping[data.tipePembayaran] || "Tidak Diketahui";

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[26rem] relative">
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-black text-2xl"
          onClick={onClose}
        >
          <IoCloseSharp />
        </button>

        <div className="grid grid-cols-3 items-center mb-4 pt-3 gap-5">
          <p className="text-sm font-medium break-all ">{data.id}</p>
          <img className="" src={LogoExni} alt="Logo Exni" />
          <span className="text-sm font-medium">{data.tanggalPengajuan}</span>
        </div>

        <div className="mb-4">
          <h3 className="font-semibold underline">Tenant</h3>
          <div className="flex flex-col gap-1">
            <InfoLine label="Nama Aset" value={data.namaAset} />
            <InfoLine label="Nama Penyewa" value={data.namaPenyewa} />
            <InfoLine label="Masa Sewa" value={data.masaSewa} />
            <InfoLine label="Nominal Dibayar" value={data.nominalPengajuan} />
            <InfoLine label="Jenis Pembayaran" value={jenisPembayaran} />
            <InfoLine label="Cicilan Ke" value={data.lamaCicilan} />
            <InfoLine label="Tanggal Update" value={data.update} />
            <InfoLine label="Status Transaksi" value={status} />
          </div>
        </div>

        <Formik
          enableReinitialize
          initialValues={{
            note: data.catatan || "",
            status: "APPROVED" || "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSimpan}
        >
          {({ isSubmitting }) => (
            <Form>
              <div>
                <div className="md:w-[25vh] lg:w-[18rem]">
                  <label className="block  font-bold pb-2 text-sm">
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
                <div className="flex flex-col gap-1">
                  <label className="block font-bold text-sm">
                    Status Pembayaran
                  </label>
                  <Field
                    as={StatusSelect}
                    name="status"
                    options={optionsPembayaran}
                  />
                  <ErrorMessage
                    name="status"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
              </div>

              <div className="flex justify-between gap-5 pt-8">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-purple-600 text-white px-3 py-1 rounded hover:bg-purple-700 text-sm flex items-center gap-1"
                >
                  {isSubmitting ? "Menyimpan..." : "Simpan"}
                </button>

                <div className="flex justify-end gap-2 ">
                  <Link
                    to={`https://drive.google.com/file/d/${data.buktiTransfer}/view`}
                    target="_blank"
                    className="bg-purple-600 text-white px-3 py-1 rounded hover:bg-purple-700 text-sm flex items-center gap-1"
                  >
                    Bukti Transfer
                  </Link>
                  <Link
                    to={`https://drive.google.com/file/d/${data.beritaAcara}/view`}
                    target="_blank"
                    className="bg-purple-600 text-white px-3 py-1 rounded hover:bg-purple-700 text-sm flex items-center gap-1"
                  >
                    Berita Acara
                  </Link>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Modal;
