import React, { useState, useEffect } from "react";
import HeaderForm from "../../../reusable/HeaderForm";
import SectionDivider from "../../../reusable/SectionDivider";
import TenantInfo from "../../../reusable/TenantInfo";
import PaymentTable from "../../../reusable/PaymentTable";
import Loading from "../../../reusable/Loading";
import StatusAlert from "react-status-alert";
import { useParams } from "react-router-dom";
import axios from "axios";
import Moment from "moment";
import { NumericFormat } from "react-number-format";
import "react-status-alert/dist/status-alert.css";

const Detail = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}rents/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        setData(response.data.data.rent);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const formatTransactionData = (transactions = []) =>
    transactions.map((item, index) => ({
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
          renderText={(value) => <div>{value}</div>}
        />
      ),
    }));

  const renderAssetDetails = (asset) => {
    if (!asset) return null;

    const isProperty = asset.type === "PROPERTY";
    const { name, type, properties, tenants } = asset;

    return (
      <div className="flex flex-wrap gap-2">
        <div className="w-full md:w-[65%] bg-white border border-gray-200 mt-5 p-4">
          <div className="md:grid md:grid-cols-2 md:gap-3">
            <div>
              <SectionDivider title="Properti" />
              <div className="pt-2 flex flex-col gap-2">
                <TenantInfo label="Nama" value={name} />
                <TenantInfo label="Tipe" value={type} />
                {isProperty ? (
                  <>
                    <TenantInfo
                      label="Alokasi"
                      value={properties?.allocation}
                    />
                    <TenantInfo label="Alamat" value={properties?.address} />
                    <div className="flex gap-8">
                      <TenantInfo
                        label="Luas Tanah"
                        value={`${properties?.landArea || 0} m²`}
                      />
                      <TenantInfo
                        label="Luas Gedung"
                        value={`${properties?.buildingArea || 0} m²`}
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <TenantInfo label="Tenant" value={tenants?.tenant} />
                    <TenantInfo label="Alamat" value={tenants?.address} />
                    <div className="flex gap-8">
                      <TenantInfo label="Bangunan" value={tenants?.building} />
                      <TenantInfo
                        label="Lantai"
                        value={`${tenants?.floor || 0} Lantai`}
                      />
                    </div>
                  </>
                )}
              </div>
            </div>
            <div>
              <SectionDivider title="Sewa" />
              <div className="pt-2 flex flex-col gap-2">
                <TenantInfo label="Id Sewa" value={data?.id} />
                <TenantInfo
                  label="Jangka Waktu"
                  value={`${Moment(data?.application?.rent_start_date).format(
                    "D MMM YYYY"
                  )} - ${Moment(data?.application?.rent_end_date).format(
                    "D MMM YYYY"
                  )}`}
                />
                <TenantInfo
                  label="Harga Seluruhnya"
                  value={
                    <NumericFormat
                      value={data?.total_price}
                      displayType="text"
                      thousandSeparator
                      prefix="Rp "
                      renderText={(value) => <div>{value}</div>}
                    />
                  }
                />
              </div>
            </div>
          </div>
        </div>
        <div className="w-full md:w-[33.8%] mt-5">
          <img
            className="w-full h-full object-cover"
            src={asset.albums}
            alt="Asset"
            loading="lazy"
          />
        </div>
      </div>
    );
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <main>
      <StatusAlert />
      <div className="w-full px-3 py-5 bg-white mt-4 h-full rounded-lg">
        <HeaderForm title="Detail Aset Sewa" link="/user/asset/sewa-asset" />
        {renderAssetDetails(data?.application?.asset)}
        <div className="bg-white border border-gray-200 mt-5 p-4 w-full">
          <SectionDivider title="Riwayat Transaksi" />
          <PaymentTable
            data={formatTransactionData(data?.Transaction)}
            type="user"
          />
        </div>
      </div>
    </main>
  );
};

export default Detail;
