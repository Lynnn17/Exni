import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePageClick = (page) => {
    if (page > 0 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return (
    <div className="flex justify-center mt-5">
      <div className="flex items-center gap-4">
        {/* Tombol Sebelumnya */}
        <button
          className={`text-sm ${currentPage === 1 ? "text-gray-400" : ""}`}
          disabled={currentPage === 1}
          onClick={() => handlePageClick(currentPage - 1)}
        >
          Sebelumnya
        </button>

        {/* Nomor Halaman */}
        {Array.from({ length: totalPages }, (_, index) => {
          const page = index + 1;
          return (
            <button
              key={page}
              className={`px-3 py-2 rounded ${
                page === currentPage
                  ? "bg-blue-700 text-white"
                  : "bg-gray-200 text-black"
              }`}
              onClick={() => handlePageClick(page)}
            >
              {page}
            </button>
          );
        })}

        {/* Tombol Selanjutnya */}
        <button
          className={`text-sm ${
            currentPage === totalPages ? "text-gray-400" : ""
          }`}
          disabled={currentPage === totalPages}
          onClick={() => handlePageClick(currentPage + 1)}
        >
          Selanjutnya
        </button>
      </div>
    </div>
  );
};

export default Pagination;
