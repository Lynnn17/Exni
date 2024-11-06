import { MdKeyboardBackspace } from "react-icons/md";
import { Link } from "react-router-dom";
const HeaderForm = ({ title, link }) => {
  return (
    <>
      <div className="flex items-center gap-2">
        <Link to={link}>
          <MdKeyboardBackspace className="text-2xl" />
        </Link>
        <p className="text-lg font-medium">{title}</p>
      </div>
      <div className="w-full h-[1px] bg-teks mt-2"></div>
    </>
  );
};

export default HeaderForm;
