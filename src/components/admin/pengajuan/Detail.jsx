import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import HeaderForm from "../../reusable/HeaderForm";
import StatusSelect from "../../reusable/StatusSelect";
import DetailInfo from "../../reusable/DetailInfo";
import SectionDivider from "../../reusable/SectionDivider";
import TenantInfo from "../../reusable/TenantInfo";
import EditableTextarea from "../../reusable/EditableTextarea";
import { FaArrowRight } from "react-icons/fa";
import StatusAlert, { StatusAlertService } from "react-status-alert";
import "react-status-alert/dist/status-alert.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { NumericFormat } from "react-number-format";
import Moment from "moment";
import Modal from "../../reusable/ModalFile";
import Loading from "../../reusable/Loading";

const Detail = () => {
  const { id } = useParams();
  const [isReadOnly, setIsReadOnly] = useState(true);
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  const [selectIdFile, setSelectedIdFIle] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [typeModal, setTypeModal] = useState(null);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);

  const optionsPengajuan = [
    { value: "APPROVED", label: "Disetujui" },
    { value: "REJECTED", label: "Ditolak" },
  ];

  const handleToggleReadOnly = () => setIsReadOnly(!isReadOnly);

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
      console.log(response.data.data.application);
      setData(response.data.data.application);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const validationSchema = Yup.object({
    note: Yup.string().required("Keterangan harus diisi"),
    status: Yup.string().required("Status harus diisi"),
  });

  const handleSimpan = async (values, { setSubmitting }) => {
    try {
      // Update status aplikasi
      await axios.put(
        `${import.meta.env.VITE_API_URL}applications/${id}/status`,
        values,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      // Refresh data setelah status diperbarui
      fetchData();
      // Jika status adalah "APPROVED", buat data penyewaan
      if (values.status === "APPROVED") {
        try {
          await axios.post(
            `${import.meta.env.VITE_API_URL}rents`,
            {
              applicationId: id,
            },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          StatusAlertService.showSuccess("Data berhasil disimpan!");
        } catch (error) {
          console.error("Error saving data:", error);
          if (error.response?.data?.message !== "Asset is already rented") {
            StatusAlertService.showError("Asset sudah disewa.");
          }
        }
      } else {
        StatusAlertService.showSuccess("Status berhasil diperbarui!");
      }
    } catch (error) {
      console.error("Error updating application status:", error);
      StatusAlertService.showError("Terjadi kesalahan saat menyimpan data.");
    } finally {
      // Pastikan setSubmitting selalu dipanggil untuk mengakhiri loading
      setSubmitting(false);
    }
  };

  const handleBatal = () => navigate(`/admin/submission/`);

  if (!data) return <Loading />;

  return (
    <main>
      <div className="w-full px-3 py-5 bg-white mt-4 h-full rounded-lg">
        <StatusAlert />
        <HeaderForm title="Detail Pengajuan" link="/admin/submission" />
        <div className="bg-white border border-gray-200 mt-5 p-4 rounded-lg">
          <div className="w-[95%] mx-auto grid grid-cols-2 md:flex gap-4 md:gap-10 lg:gap-12 xl:gap-24">
            <DetailInfo label="ID Pengajuan" value={data?.id} />
            <DetailInfo
              label="Jangka Waktu"
              value={`${Moment(data?.rent_start_date).format(
                "D MMM YYYY"
              )} - ${Moment(data?.rent_end_date).format("D MMM YYYY")}`}
            />
            <DetailInfo
              label="Nominal"
              value={
                <NumericFormat
                  value={data?.proposed_price}
                  displayType="text"
                  thousandSeparator
                  prefix="Rp "
                />
              }
            />
          </div>

          <div className="p-4 bg-white border border-gray-200 mt-5 rounded-lg md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-2 xl:gap-92">
            <div>
              <SectionDivider title="Penyewa" />
              <div className="pt-2 flex flex-col gap-2">
                <TenantInfo label="Nama PT" value={data?.user?.company} />
                <TenantInfo label="PIC" value={data?.user?.pic} />
                <TenantInfo label="Kontak" value={data?.user?.contact} />
                <TenantInfo label="Alamat" value={data?.user?.address} />
              </div>
            </div>
            <div className="md:pt-0 pt-4">
              <SectionDivider title="Properti" />
              <div className="pt-2 flex flex-col gap-2">
                <TenantInfo label="Tenant" value={data?.asset?.name} />
                <TenantInfo
                  label={data?.asset?.type === "TENANT" ? "Gedung" : "Alokasi"}
                  value={
                    data?.asset?.type === "TENANT"
                      ? data?.asset?.tenants?.building
                      : data?.asset?.properties?.allocation
                  }
                />
                <TenantInfo
                  label="Alamat"
                  value={
                    data?.asset?.type === "TENANT"
                      ? data?.asset?.tenants?.address
                      : data?.asset?.properties?.address
                  }
                />
                {data?.asset?.type === "TENANT" ? (
                  <TenantInfo
                    label="Lantai"
                    value={data?.asset?.tenants?.floor}
                  />
                ) : (
                  <div className="flex gap-8">
                    <TenantInfo
                      label="Luas Gedung"
                      value={data?.asset?.properties?.buildingArea}
                    />
                    <TenantInfo
                      label="Luas Tanah"
                      value={data?.asset?.properties?.landArea}
                    />
                  </div>
                )}
              </div>
            </div>
            <div className="md:pt-0 pt-4">
              <SectionDivider title="Pengajuan" />
              <div className="pt-2 flex flex-col gap-2">
                <TenantInfo
                  label="Tipe Pembayaran"
                  value={data?.payment_type}
                />
                <TenantInfo
                  label="Jumlah Cicilan"
                  value={data?.installment_count}
                />
                <TenantInfo
                  label="Harga Pengajuan"
                  value={
                    <NumericFormat
                      value={data?.proposed_price}
                      displayType="text"
                      thousandSeparator
                      prefix="Rp "
                    />
                  }
                />
                <TenantInfo
                  label="Tanggal Pengajuan"
                  value={Moment(data?.createdAt).format("D MMM YYYY")}
                />
                <TenantInfo
                  label="Tanggal Update"
                  value={Moment(data?.updatedAt).format("D MMM YYYY")}
                />
                <TenantInfo label="Status Pengajuan" value={data?.status} />
              </div>
            </div>
          </div>

          <Formik
            enableReinitialize
            initialValues={{
              note: data?.note || "",
              status: "APPROVED" || "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleSimpan}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="p-1 md:p-4 md:flex md:gap-5">
                  <div className="md:w-[25vh] lg:w-[18rem]">
                    <label className="block text-gray-700 font-medium pb-2">
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
                  <div className="flex flex-col gap-3">
                    <div className="flex flex-row gap-5 pt-4 md:gap-20">
                      <div>
                        <div className="flex flex-col gap-1">
                          <label className="block text-gray-700 font-medium">
                            Status Pengajuan
                          </label>
                          <Field
                            as={StatusSelect}
                            name="status"
                            options={optionsPengajuan}
                          />
                          <ErrorMessage
                            name="status"
                            component="div"
                            className="text-red-500 text-sm"
                          />
                        </div>
                      </div>
                      <div className="flex gap-5">
                        <div>
                          <p>Link Proposal/Lampiran</p>

                          <button
                            type="button"
                            onClick={() => {
                              setSelectedIdFIle(data?.proposal);
                              setModalOpen(true);
                              setTypeModal("proposal");
                            }}
                            className="w-max px-3 py-1 bg-ungu rounded-lg text-white text-xs flex items-center gap-2"
                          >
                            Lihat/Edit <FaArrowRight />
                          </button>
                        </div>
                        <div>
                          <p>Berita Acara</p>
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedIdFIle(data?.minutesOfMeeting);
                              setModalOpen(true);
                              setTypeModal("minutesOfMeeting");
                            }}
                            className="w-max px-3 py-1 bg-ungu rounded-lg text-white text-xs flex items-center gap-2"
                          >
                            Lihat/Edit <FaArrowRight />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end gap-4 mt-4">
                  {data.status !== "APPROVED" && data.status !== "REJECTED" && (
                    <>
                      <button
                        type="button"
                        className="px-4 py-2 bg-gray-300 rounded-lg"
                        onClick={handleBatal}
                      >
                        Batal
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Menyimpan..." : "Simpan"}
                      </button>
                    </>
                  )}
                </div>
              </Form>
            )}
          </Formik>

          <Modal
            isOpen={isModalOpen}
            onClose={() => setModalOpen(false)}
            idFile={[selectIdFile]}
            idData={data.id}
            type={typeModal}
            style="applications"
          />
        </div>
      </div>
    </main>
  );
};

export default Detail;
