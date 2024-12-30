import React, { useState, useEffect } from "react";
import HeaderForm from "../../../../reusable/HeaderForm";
import SectionDivider from "../../../../reusable/SectionDivider";
import { useParams, Link } from "react-router-dom";
import TenantInfo from "../../../../reusable/TenantInfo";
import PaymentTable from "../../../../reusable/PaymentTable";
import axios from "axios";
import Moment from "moment";
import { NumericFormat } from "react-number-format";
import Loading from "../../../../reusable/Loading";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import InputField from "../../../../reusable/InputField";
import EditableTextarea from "../../../../reusable/EditableTextarea";
import StatusAlert, { StatusAlertService } from "react-status-alert";
import "react-status-alert/dist/status-alert.css";
import { FaFileContract } from "react-icons/fa";
import { MdOutlineCommentsDisabled } from "react-icons/md";
import Modal from "../../../../reusable/Modal";
import StatusButton from "../../../../reusable/StatusButton";

const Detail = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isReadOnly, setIsReadOnly] = useState(true);
  const { id } = useParams();
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedData, setSelectedData] = useState(null);

  const handleToggleReadOnly = () => {
    setIsReadOnly(!isReadOnly);
  };

  const fetchData = async () => {
    try {
      setIsLoading(true); // Set loading menjadi true
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}rents/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("res", response.data.data);
      setData(response.data.data.rent);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false); // Set loading menjadi false setelah selesai
    }
  };

  const initialValues = {
    noContract: data?.no_contract || "",
    note: data?.information || "",
    fileContract: [],
  };

  const validationSchema = Yup.object({
    noContract: Yup.string().required("Nomer Kontrak is required"),
    note: Yup.string().required("Catatan is required"),
    fileContract: Yup.array()
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

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    console.log("Data submitted:", values);

    try {
      // Buat objek FormData
      const formData = new FormData();

      // Append semua field ke FormData

      formData.append("noContract", values.noContract);
      formData.append("information", values.note);

      values.fileContract.forEach((file) => formData.append("contract", file));

      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}rents/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      resetForm();
      fetchData();
      StatusAlertService.showSuccess("Kontrak berhasil diupdate!");
    } catch (error) {
      console.error("Error saving data:", error);
      StatusAlertService.showError("Data Gedung gagal disimpan!");
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const datas = data?.Transaction?.map((item, index) => ({
    id: item.id,
    no: index + 1,
    note: item.note,
    number_of_trans: item.number_of_trans,
    receipt: item.receipt,
    status: item.status,
    updatedAt: Moment(item.updatedAt).format("D MMM YYYY HH:mm:ss"),
    amount: (
      <NumericFormat
        value={item.amount}
        displayType="text"
        thousandSeparator
        prefix="Rp "
        renderText={(value) => <div readOnly>{value} </div>}
      />
    ),
    // buat modal
    nominalPengajuan: (
      <NumericFormat
        value={item.amount}
        displayType="text"
        thousandSeparator
        prefix="Rp "
        renderText={(value) => <div readOnly>{value} </div>}
      />
    ),
    lamaCicilan: item.number_of_trans,
    tipePembayaran: data.status,
    statusValue: <StatusButton status={item.status} />,
    namaAset: data.application.asset.name,
    namaPenyewa: data.application.user.company,
    masaSewa:
      Moment(data.application.rent_start_date).format("D MMM YYYY  HH:mm:ss") +
      " - " +
      Moment(data.application.rent_end_date).format("D MMM YYYY HH:mm:ss"),
    catatan: item.note,
    buktiTransfer: item.receipt,
  }));

  const handleOpenModal = (item) => {
    setSelectedData(item);
    setModalOpen(true);
  };

  return (
    <main>
      <StatusAlert />
      <div className="w-full px-3 py-5 bg-white mt-4 h-full rounded-lg">
        <HeaderForm
          title="Detail Aset Sewa"
          link="/admin/asset/sewa-building"
        />
        {isLoading ? ( // Tampilkan indikator loading saat isLoading true
          <Loading />
        ) : (
          <div className="flex flex-wrap gap-2">
            <div className="w-full md:w-[65%] bg-white border border-gray-200 mt-5 p-4">
              <div className="md:grid md:grid-cols-2 md:gap-3">
                <div className="w-full">
                  <SectionDivider title="Properti" />
                  <div className="pt-2 flex flex-col gap-2">
                    <TenantInfo
                      label="Nama"
                      value={data?.application?.asset?.name}
                    />
                    <TenantInfo
                      label="Tipe"
                      value={data?.application?.asset?.type}
                    />
                    <TenantInfo
                      label="Alokasi"
                      value={data?.application?.asset?.properties?.allocation}
                    />
                    <TenantInfo
                      label="Alamat"
                      value={data?.application?.asset?.properties?.address}
                    />
                    <div className="flex gap-8">
                      <TenantInfo
                        label="Luas Tanah"
                        value={`${data?.application?.asset?.properties?.landArea}m2`}
                      />
                      <TenantInfo
                        label="Luas Gedung"
                        value={`${data?.application?.asset?.properties?.buildingArea}m2`}
                      />
                    </div>
                  </div>
                </div>
                <div className="pt-4 md:pt-0 w-full">
                  <SectionDivider title="Sewa" />
                  <div className="pt-2 flex flex-col gap-2">
                    <TenantInfo label="Id Sewa" value={data?.id} />

                    <TenantInfo
                      label="Jangka Waktu"
                      value={
                        Moment(data?.application?.rent_start_date).format(
                          "D MMM YYYY  HH:mm:ss"
                        ) +
                        " - " +
                        Moment(data?.application?.rent_end_date).format(
                          "D MMM YYYY HH:mm:ss"
                        )
                      }
                    />
                    <TenantInfo
                      label="Harga Seluruhnya"
                      value={
                        <NumericFormat
                          value={data?.total_price}
                          displayType="text"
                          thousandSeparator
                          prefix="Rp "
                          renderText={(value) => <div readOnly>{value} </div>}
                        />
                      }
                    />
                  </div>
                </div>
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={handleSubmit}
                >
                  {({ isSubmitting }) => (
                    <Form>
                      <div className="pt-4 md:pt-0 w-full">
                        <SectionDivider title="Kontrak" />
                        <div className="pt-2 flex flex-col gap-2">
                          {/* <TenantInfo
                      label="Nomor Kontrak"
                      value={data?.no_contract || "-"}
                    /> */}
                          <InputField
                            type="text"
                            name="noContract"
                            label="Nomor Kontrak"
                            placeholder="Masukan Nomor Kontrak"
                            className="px-0 mb-0 text-sm"
                          />
                          <label htmlFor="note">
                            <span className="block text-black text-sm">
                              Catatan
                            </span>
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
                          <InputField
                            type="file"
                            name="fileContract"
                            label="File Kontrak"
                            className="px-0 mb-0 text-sm"
                            onChange={(e) =>
                              setFieldValue(
                                "fileContract",
                                Array.from(e.target.files)
                              )
                            }
                          />
                        </div>
                        <div className="flex justify-between   pt-5">
                          <button
                            type="submit"
                            className="bg-[#5641BA] text-white w-[8rem] p-2 rounded-md mt-4"
                            disabled={isSubmitting}
                          >
                            {isSubmitting ? "Submit..." : "Submit"}
                          </button>
                          {data?.contract ? (
                            <Link
                              to={`https://drive.google.com/file/d/${data?.contract}/view`}
                              className="mt-4"
                              target="_blank"
                            >
                              <FaFileContract className="text-4xl text-[#5641BA] " />
                            </Link>
                          ) : (
                            <div className=" text-4xl mt-4">
                              <MdOutlineCommentsDisabled />
                            </div>
                          )}
                        </div>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
            <div className="w-full md:w-[33.8%] mt-5">
              <img
                className="w-full h-full object-cover"
                // src={data?.application?.asset?.albums[0]}
                alt=""
                srcset=""
                loading="lazy"
              />
            </div>
            <div className="bg-white border border-gray-200 mt-5 p-4 w-full">
              <div className="w-full h-full">
                <SectionDivider title="Riwayat Transaksi" />
                <PaymentTable
                  data={datas}
                  modal={(item) => handleOpenModal(item)}
                />
              </div>
            </div>
          </div>
        )}
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        data={selectedData}
        fetchData={fetchData}
      />
    </main>
  );
};

export default Detail;
