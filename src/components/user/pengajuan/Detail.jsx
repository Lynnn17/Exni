import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import StatusAlert, { StatusAlertService } from "react-status-alert";
import "react-status-alert/dist/status-alert.css";

const Detail = () => {
  const [metodePembayaran, setMetodePembayaran] = useState("Cicilan");
  const [fileProposal, setFileProposal] = useState("Jidan Slebeew.pdf");
  const [fileBeritaAcara, setFileBeritaAcara] = useState("Jidan Slebeew.pdf");
  const [keterangan, setKeterangan] = useState(
    "Pembayaran per tahun (Proses) Peralihan Sewa"
  );
  const [hargaPengajuan, setHargaPengajuan] = useState("Rp. 130.000.000,-");

  const handleFileUpload = (setFile) => (e) => {
    setFile(e.target.files[0]?.name || "");
  };

  const handleSimpan = () => {
    StatusAlertService.showSuccess("Data berhasil disimpan!");
  };
  const navigate = useNavigate();
  const handleBatal = () => {
    navigate(`/user/submission/`);
  };

  return (
    <main className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        <StatusAlert />
        {/* Header */}
        <button
          onClick={() => window.history.back()}
          className="flex items-center gap-2 text-gray-600 text-sm mb-6"
        >
          <FaArrowLeft />
          Kembali
        </button>

        <h1 className="text-xl font-semibold text-gray-800 mb-8">
          Detail Pengajuan
        </h1>

        {/* ID dan Tanggal Pengajuan */}
        <div className="grid grid-cols-2 gap-6 mb-6">
          <div>
            <p className="text-sm text-gray-500 font-medium">Id Pengajuan</p>
            <p className="text-gray-800 font-semibold">13213121</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">
              Tanggal Pengajuan
            </p>
            <p className="text-gray-800 font-semibold">12 Oktober 2024</p>
          </div>
        </div>

        {/* Detail Penyewa dan Properti */}
        <div className="grid grid-cols-2 gap-6 mb-6">
          <div>
            <p className="text-sm text-gray-500 font-medium">Penyewa</p>
            <p className="text-gray-800 font-semibold">PT. Sampoerna Tbk.</p>
            <p className="text-gray-500 text-sm">Aryeswara Jaya</p>
            <p className="text-gray-500 text-sm">0832632763232</p>
            <p className="text-gray-500 text-sm">
              Jl. Masjid besar Banda Neira 323823
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Properti</p>
            <p className="text-gray-800 font-semibold">
              Cv. Gracia Blue Logistic
            </p>
            <p className="text-gray-500 text-sm">
              Kantor Penjualan Ticket, Graha Pelni, Jl Pahlawan No.18, Surabaya
            </p>
          </div>
        </div>

        {/* Status Pengajuan dan Status Pembayaran */}
        <div className="grid grid-cols-2 gap-6 mb-6">
          <div>
            <p className="text-sm text-gray-500 font-medium">
              Status Pengajuan
            </p>
            <p className="bg-purple-100 text-purple-600 font-semibold text-sm px-3 py-1 rounded-full inline-block">
              Pengajuan
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">
              Status Pembayaran
            </p>
            <p className="bg-purple-100 text-purple-600 font-semibold text-sm px-3 py-1 rounded-full inline-block">
              Cicilan
            </p>
          </div>
        </div>

        {/* Jangka Waktu dan Harga */}
        <div className="grid grid-cols-2 gap-6 mb-6">
          <div>
            <p className="text-sm text-gray-500 font-medium">Jangka Waktu</p>
            <div className="flex items-center gap-2">
              <input
                type="date"
                className="border border-gray-300 rounded-md p-2 text-gray-800 text-sm"
                value="2024-08-05"
              />
              <span>-</span>
              <input
                type="date"
                className="border border-gray-300 rounded-md p-2 text-gray-800 text-sm"
                value="2024-08-05"
              />
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Harga Pengajuan</p>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-md p-2 text-gray-800 text-sm"
              value={hargaPengajuan}
              onChange={(e) => setHargaPengajuan(e.target.value)}
            />
          </div>
        </div>

        {/* Link Proposal dan Berita Acara */}
        <div className="grid grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm text-gray-500 font-medium mb-2">
              Link Proposal
            </label>
            <div className="flex items-center gap-2">
              <input
                type="file"
                className="hidden"
                id="proposalUpload"
                onChange={handleFileUpload(setFileProposal)}
              />
              <button
                className="bg-purple-50 text-purple-600 text-sm px-3 py-1 rounded-md"
                onClick={() =>
                  document.getElementById("proposalUpload").click()
                }
              >
                Upload
              </button>
              <span className="text-gray-800 text-sm">{fileProposal}</span>
              <button className="text-purple-600 text-sm underline">
                Lihat
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm text-gray-500 font-medium mb-2">
              Link Berita Acara
            </label>
            <div className="flex items-center gap-2">
              <input
                type="file"
                className="hidden"
                id="beritaAcaraUpload"
                onChange={handleFileUpload(setFileBeritaAcara)}
              />
              <button
                className="bg-purple-50 text-purple-600 text-sm px-3 py-1 rounded-md"
                onClick={() =>
                  document.getElementById("beritaAcaraUpload").click()
                }
              >
                Upload
              </button>
              <span className="text-gray-800 text-sm">{fileBeritaAcara}</span>
              <button className="text-purple-600 text-sm underline">
                Lihat
              </button>
            </div>
          </div>
        </div>

        {/* Keterangan */}
        <div className="mb-6">
          <label className="block text-sm text-gray-500 font-medium mb-2">
            Keterangan
          </label>
          <textarea
            className="w-full border border-gray-300 rounded-md p-2 text-gray-800 text-sm"
            value={keterangan}
            readOnly
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-4">
          <button
            onClick={handleBatal}
            className="px-6 py-2 border border-gray-300 rounded-md text-gray-700"
          >
            Batal
          </button>
          <button
            className="px-6 py-2 bg-purple-600 text-white rounded-md"
            onClick={handleSimpan}
          >
            Simpan
          </button>
        </div>
      </div>
    </main>
  );
};

export default Detail;
