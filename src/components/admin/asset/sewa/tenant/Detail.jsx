import React, { useState, useEffect } from "react";
import HeaderForm from "../../../../reusable/HeaderForm";
import SectionDivider from "../../../../reusable/SectionDivider";
import { useParams } from "react-router-dom";
import TenantInfo from "../../../../reusable/TenantInfo";
import PaymentTable from "../../../../reusable/PaymentTable";
import axios from "axios";
import Moment from "moment";
import { NumericFormat } from "react-number-format";
import Loading from "../../../../reusable/Loading";

const Detail = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // State untuk loading
  const { id } = useParams();

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
  }));

  return (
    <main>
      <div className="w-full px-3 py-5 bg-white mt-4 h-full rounded-lg">
        <HeaderForm title="Detail Aset Sewa" link="/admin/asset/sewa-aset" />
        {isLoading ? ( // Tampilkan indikator loading saat isLoading true
          <Loading />
        ) : (
          <div className="flex flex-wrap gap-2">
            <div className="w-full md:w-[65%] bg-white border border-gray-200 mt-5 p-4">
              <div className="md:flex md:gap-3">
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
                        value={`${data?.application?.asset?.properties?.landArea}m2`}
                      />
                    </div>
                  </div>
                </div>
                <div className="pt-4 md:pt-0 w-full">
                  <SectionDivider title="Sewa" />
                  <div className="pt-2 flex flex-col gap-2">
                    <TenantInfo label="Id Sewa" value={data?.id} />
                    <TenantInfo
                      label="Nomor Kontrak"
                      value={data?.no_contract || "-"}
                    />
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
              </div>
            </div>
            <div className="w-full md:w-[33.8%] mt-5">
              <img
                className="w-full h-full object-cover"
                src={data?.application?.asset?.albums[0]}
                alt=""
                srcset=""
                loading="lazy"
              />
            </div>
            <div className="bg-white border border-gray-200 mt-5 p-4 w-full">
              <div className="w-full h-full">
                <SectionDivider title="Riwayat Transaksi" />
                <PaymentTable data={datas} />
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default Detail;
