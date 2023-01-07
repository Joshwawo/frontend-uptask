const Alerta = ({ alerta }) => {
  return (
    <div
      className={`${
        alerta.error ? "bg-red-100 text-red-500 font-bold" : "bg-emerald-100 text-emerald-500"
      } bg-gradient-to-br text-center p-3 rounded-xl uppercase  font-bold text-sm my-5`}
    >
      {alerta.message}
    </div>
  );
};

export default Alerta;
