import React from "react";
import { LuPenSquare } from "react-icons/lu";
import { useField } from "formik";

const EditableTextarea = ({ isReadOnly, onToggleReadOnly, name }) => {
  const [field] = useField(name); // Menggunakan useField untuk mengakses Formik state

  return (
    <div className="relative">
      <textarea
        {...field} // Menghubungkan Formik dengan textarea
        className="text-sm w-full border border-gray-300 rounded-md px-3 pt-2 text-gray-700 h-[12vh] lg:h-[20vh] xl:h-[12vh] overflow-y-scroll resize-none no-scrollbar"
        rows={3}
        readOnly={isReadOnly}
      />
      <button
        type="button"
        className="absolute bottom-2 right-2 text-gray-500"
        onClick={onToggleReadOnly}
      >
        <LuPenSquare className="cursor-pointer mb-2 text-black text-xl " />
      </button>
    </div>
  );
};

export default EditableTextarea;
