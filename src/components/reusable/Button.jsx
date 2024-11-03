const Button = ({ label, color, onClick, type }) => {
  return (
    <button
      className={`p-2 w-[6rem] rounded-xl text-white ${color}`}
      onClick={onClick}
      type={type}
    >
      {label}
    </button>
  );
};

export default Button;
