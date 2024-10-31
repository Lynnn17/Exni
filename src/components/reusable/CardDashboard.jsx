const Card = ({ count, label, icon: Icon }) => {
  return (
    <div className="bg-white p-8 rounded-lg shadow-xl">
      <p className="text-2xl uppercase font-bold">{count}</p>
      <p className="text-md  font-medium">{label}</p>
      <div className="flex items-center justify-end">
        <Icon className="text-4xl" />
      </div>
    </div>
  );
};

export default Card;
