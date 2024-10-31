const Pagination = () => {
  return (
    <div className="flex justify-center mt-5">
      <div className="flex items-center gap-2">
        <p className="text-sm">Sebelumnya</p>
        <p className="text-sm font-semibold bg-blue-700 text-white px-2 py-1 rounded">
          1
        </p>
        <p className="text-sm">2</p>
        <p className="text-sm">3</p>
        <p className="text-sm">4</p>
        <p className="text-sm">5</p>
        <p className="text-sm">Selanjutnya</p>
      </div>
    </div>
  );
};

export default Pagination;
