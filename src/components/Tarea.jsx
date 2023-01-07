import { formatearFecha } from "../helpers/FormatearFecha";
import useProyectos from "../hooks/useProyectos";
import useAdmin from "../hooks/useAdmin";

const Tarea = ({ tarea }) => {
  const { handleModalEditarTarea, handleModalEliminarTarea, completarTarea } =
    useProyectos();
  const admin = useAdmin();
  const { _id, nombre, descripcion, prioridad, fechaEntrega, estado } = tarea;
  return (
    <div className="border-b p-5 justify-between items-center md:flex md:gap-2 ">
      <div className="flex flex-col items-start">
        <p className="mb-2 text-xl">{nombre}</p>
        <p className="mb-2 text-sm text-gray-500 uppercase">{descripcion}</p>
        <p className="mb-2 text-sm">{formatearFecha(fechaEntrega)}</p>
        <p
          className={`mb-2 text-sm  ${
            prioridad === "Baja"
              ? "text-green-500"
              : prioridad === "Media"
              ? "text-yellow-500"
              : "text-red-500"
          }`}
        >
          Prioridad: {prioridad}
        </p>
        {estado && (<p className="text-xs text-green-500 bg-green-100 uppercase p-1 rounded-lg mb-2">Completada por: {tarea.completado.nombre}</p>)}
      </div>
      <div className="flex gap-2">
        {admin && (
          <button
            onClick={() => handleModalEditarTarea(tarea)}
            className="bg-indigo-600 px-4 py-3 text-white uppercase text-sm rounded-lg"
          >
            Editar
          </button>
        )}

        <button
          onClick={() => completarTarea(_id)}
          className={`${estado ? 'bg-green-500' :'bg-yellow-500'} px-4 py-3 text-white uppercase text-sm rounded-lg`}
        >
          {estado ? 'Completa' :'Incompleta'}
        </button>

        {admin && (
          <button
            onClick={() => handleModalEliminarTarea(tarea)}
            className="bg-red-600 px-4 py-3 text-white uppercase text-sm rounded-lg"
          >
            Eliminar
          </button>
        )}
      </div>
    </div>
  );
};

export default Tarea;
