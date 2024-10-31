const Button = ({ label, color, onClick }) => {
  return (
    <button
      className={`p-2 w-[6rem] rounded-xl text-white ${color}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;
