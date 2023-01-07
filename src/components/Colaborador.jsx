import useProyectos from '../hooks/useProyectos'

const Colaborador = ({ colaborador }) => {
  const { nombre, email } = colaborador;
  const {handleModalEliminarColaborador} = useProyectos()

  return (
    <>
      <div className="border-b p-5 flex justify-between items-center">
        <div className="">
          <p className="font-semibold text-lg">{nombre}</p>
          <p className="text-sm text-gray-700">{email}</p>
        </div>
        <div className="">
          <button
            type="button"
            onClick={()=> handleModalEliminarColaborador(colaborador)}
            className="bg-red-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg"
          >
            Eliminar
          </button>
        </div>
      </div>
    </>
  );
};

export default Colaborador;
