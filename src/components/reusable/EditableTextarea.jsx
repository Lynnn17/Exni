import React from "react";
import { LuPenSquare } from "react-icons/lu";

const EditableTextarea = ({ isReadOnly, onToggleReadOnly, defaultValue }) => (
  <div className="relative">
    <textarea
      className="text-sm w-full border border-gray-300 rounded-md px-3 pt-2 text-gray-700 h-[12vh] lg:h-[20vh] xl:h-[12vh] overflow-y-scroll resize-none no-scrollbar"
      rows={3}
      readOnly={isReadOnly}
      defaultValue={defaultValue}
    />
    <button
      className="absolute bottom-2 right-2 text-gray-500"
      onClick={onToggleReadOnly}
    >
      <LuPenSquare className="cursor-pointer mb-2 text-black text-xl " />
    </button>
  </div>
);

export default EditableTextarea;
