import StatusAlert, { StatusAlertService } from "react-status-alert";
import "react-status-alert/dist/status-alert.css";
import React, { useState, useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";

const Detail = () => {
  const [metodePembayaran, setMetodePembayaran] = useState("Cicilan");
  const [jumlahCicilan, setJumlahCicilan] = useState("6X");
  const [cicilanKe, setCicilanKe] = useState("3");
  const [fileName, setFileName] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [submissionId, setSubmissionId] = useState("");
  const [tanggalPengajuan, setTanggalPengajuan] = useState("");
  const [harga, setHarga] = useState(114000000);
  const [nominal, setNominal] = useState(0);

  useEffect(() => {
    // Simulasi pengambilan data dari tabel pengajuan
    const fetchData = async () => {
      const mockData = {
        transactionId: "TRX123456",
        submissionId: "SUBM987654",
        tanggalPengajuan: "30 November 2024",
      };
      setTransactionId(mockData.transactionId);
      setSubmissionId(mockData.submissionId);
      setTanggalPengajuan(mockData.tanggalPengajuan);
    };

    fetchData();
  }, []);

  // Sinkronisasi nominal bawah dengan nominal atas jika opsi Lunas dipilih
  useEffect(() => {
    if (metodePembayaran === "Lunas") {
      setNominal(harga);
    }
  }, [metodePembayaran, harga]);

  const handleFileChange = (e) => {
    setFileName(e.target.files[0]?.name || "No file chosen");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    StatusAlertService.showSuccess("Transaksi berhasil disubmit!");
  };

  return (
    <main className="pt-4">
      <div className="w-full mx-auto bg-white shadow-md rounded-lg p-6">
        {/* Komponen StatusAlert */}
        <StatusAlert />

        {/* Back Button */}
        <button
          onClick={() => window.history.back()}
          className="flex items-center gap-2 text-gray-600 text-sm mb-6"
        >
          <FaArrowLeft />
          Kembali
        </button>

        {/* Header */}
        <h1 className="text-xl font-semibold text-gray-800 mb-8">Transaksi</h1>

        {/* ID Transaksi, ID Pengajuan, dan Tanggal Pengajuan */}
        <div className="grid grid-cols-2 gap-8 mb-6">
          <div>
            <p className="text-sm text-gray-500 font-medium">ID Transaksi</p>
            <p className="text-gray-800 font-semibold">{transactionId}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">ID Pengajuan</p>
            <p className="text-gray-800 font-semibold">{submissionId}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">
              Tanggal Pengajuan
            </p>
            <p className="text-gray-800 font-semibold">{tanggalPengajuan}</p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* Penyewa dan Properti Details */}
          <div className="grid grid-cols-2 gap-8 mb-6">
            <div>
              <p className="text-sm text-gray-500 font-medium">Penyewa</p>
              <p className="text-gray-800 font-semibold">PT. SAMPOERNA Tbk.</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Properti</p>
              <p className="text-gray-800 font-semibold">
                Cv. Gracia Blue Logistic
              </p>
              <p className="text-gray-500 text-sm">
                Graha Pelni, Jl Pahlawan No.18, Surabaya
              </p>
            </div>
          </div>

          {/* Nominal */}
          <div className="grid grid-cols-2 gap-8 mb-6">
            <div>
              <p className="text-sm text-gray-500 font-medium">Nominal</p>
              <p className="text-gray-800 font-semibold">
                Rp. {harga.toLocaleString("id-ID")},-
              </p>
            </div>
          </div>

          {/* Metode Pembayaran, Jumlah Cicilan, etc. */}
          <div className="grid grid-cols-2 gap-8 mb-6">
            <div>
              <label className="block text-sm text-gray-500 font-medium mb-2">
                Metode Pembayaran
              </label>
              <select
                className="w-full border border-gray-300 rounded-md p-2"
                value={metodePembayaran}
                onChange={(e) => setMetodePembayaran(e.target.value)}
              >
                <option value="Cicilan">Cicilan</option>
                <option value="Lunas">Lunas</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-500 font-medium mb-2">
                Jumlah Cicilan
              </label>
              <select
                className="w-full border border-gray-300 rounded-md p-2"
                value={jumlahCicilan}
                onChange={(e) => setJumlahCicilan(e.target.value)}
                disabled={metodePembayaran === "Lunas"}
              >
                <option value="6X">6X</option>
                <option value="12X">12X</option>
              </select>
            </div>
          </div>

          {/* Pembayaran Cicilan Ke and Nominal */}
          <div className="grid grid-cols-2 gap-8 mb-6">
            <div>
              <label className="block text-sm text-gray-500 font-medium mb-2">
                Pembayaran Cicilan Ke
              </label>
              <select
                className="w-full border border-gray-300 rounded-md p-2"
                value={cicilanKe}
                onChange={(e) => setCicilanKe(e.target.value)}
                disabled={metodePembayaran === "Lunas"}
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-500 font-medium mb-2">
                Nominal
              </label>
              <input
                type="number"
                className="w-full border border-gray-300 rounded-md p-2"
                value={nominal}
                onChange={(e) => setNominal(Number(e.target.value))}
                disabled={metodePembayaran === "Lunas"}
              />
            </div>
          </div>

          {/* Rekening and Upload */}
          <div className="grid grid-cols-2 gap-8 mb-8">
            <div>
              <p className="text-sm text-gray-500 font-medium">Rekening</p>
              <p className="text-gray-800 font-semibold">7328195989</p>
              <p className="text-gray-500 text-sm">
                BCA / PT Pelayanan Nasional Indonesia
              </p>
            </div>
            <div>
              <label className="block text-sm text-gray-500 font-medium mb-2">
                Upload Bukti Transfer
              </label>
              <input
                type="file"
                className="block w-full text-sm text-gray-500
                          file:mr-4 file:py-2 file:px-4
                          file:rounded-lg file:border-0
                          file:text-sm file:font-semibold
                          file:bg-purple-50 file:text-purple-700
                          hover:file:bg-purple-100"
                onChange={handleFileChange}
              />
              <p className="text-gray-700 text-sm mt-2">{fileName}</p>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-4">
            <button
              onClick={() => window.history.back()}
              type="button"
              className="px-6 py-2 border border-gray-300 rounded-md text-gray-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-purple-600 text-white rounded-md"
            >
              Bayar
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Detail;
