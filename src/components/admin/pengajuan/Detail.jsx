import React, { useState, useEffect } from "react";
import Pagination from "../Pagination";
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

const Detail = () => {
  const { id } = useParams();
  const [isReadOnly, setIsReadOnly] = useState(true);
  const [statusPengajuan, setStatusPengajuan] = useState("pengajuan");
  const [statusPembayaran, setStatusPembayaran] = useState("cicilan");

  const [data, setData] = useState({});

  const optionsPengajuan = [
    { value: "PROCESS", label: "Process" },
    { value: "APPROVED", label: "Disetujui" },
    { value: "PENDING", label: "Pending" },
    { value: "REJECTED", label: "Ditolak" },
  ];

  const handleToggleReadOnly = () => setIsReadOnly(!isReadOnly);

  const handleSimpan = () => {
    StatusAlertService.showSuccess("Data berhasil disimpan!");
  };

  const navigate = useNavigate();
  const handleBatal = () => {
    navigate(`/admin/submission/`);
  };

  useEffect(() => {
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
        console.error(error);
      }
    };

    fetchData();
  }, []);
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
              value={
                Moment(data?.rent_start_date).format("D MMM YYYY") +
                " - " +
                Moment(data?.rent_end_date).format("D MMM YYYY")
              }
            />
            <DetailInfo
              label="Nominal"
              value={
                <NumericFormat
                  value={data?.proposed_price}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"Rp "}
                  renderText={(value) => value}
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
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"Rp "}
                      renderText={(value) => value}
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
              </div>
            </div>
          </div>

          <div className="p-1 md:p-4 md:flex md:gap-5">
            <div className="md:w-[25vh] lg:w-[18rem]">
              <label className="block text-gray-700 font-medium pb-2">
                Keterangan
              </label>
              <EditableTextarea
                isReadOnly={isReadOnly}
                onToggleReadOnly={handleToggleReadOnly}
                defaultValue={data?.note}
              />
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex flex-row gap-5 pt-4 md:gap-20">
                <div>
                  <div className="flex flex-col gap-1">
                    <label className="block text-gray-700 font-medium">
                      Status Pengajuan
                    </label>
                    <StatusSelect
                      value={data.status}
                      onChange={(e) => setStatusPengajuan(e.target.value)}
                      options={optionsPengajuan}
                    />
                  </div>
                </div>
                <div className="flex gap-5">
                  <div>
                    <p>Proposal</p>
                    <Link
                      to={`https://drive.google.com/file/d/${data.proposal}/view`}
                      className="w-max px-3 py-1 bg-ungu rounded-lg text-white text-xs flex items-center gap-2"
                    >
                      Lihat <FaArrowRight />
                    </Link>
                  </div>
                  <div>
                    <p>Berita Acara</p>
                    <Link className="w-max px-3 py-1 bg-ungu rounded-lg text-white text-xs flex items-center gap-2">
                      Lihat <FaArrowRight />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Buttons */}
          <div className="flex justify-center pt-6 pb-4 gap-4">
            <button
              onClick={handleBatal}
              className="px-6 py-2 border border-gray-300 rounded-md text-gray-700"
            >
              Batal
            </button>
            <button
              className="px-4 py-2 bg-purple-600 text-white rounded-md"
              onClick={handleSimpan}
            >
              Simpan
            </button>
          </div>
        </div>
        <Pagination />
      </div>
    </main>
  );
};

export default Detail;
