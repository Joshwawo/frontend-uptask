import { formatearFecha } from "../helpers/FormatearFecha";
import useProyectos from "../hooks/useProyectos";
import useAdmin from "../hooks/useAdmin";
import { Link } from "react-router-dom";

const Tarea = ({ tarea }) => {
  const { handleModalEditarTarea, handleModalEliminarTarea, completarTarea,cargandoCompletar } =
    useProyectos();
  const admin = useAdmin();
  const { _id, nombre, descripcion, prioridad, fechaEntrega, estado } = tarea;
  return (
    <div className=" border-b-2  border-b-gray-200 last-of-type:border-none hover:bg-gray-200/50 shadow-gray-300 mt-2 p-5 justify-between items-center md:flex md:gap-2 ">
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
            className="bg-cyan-100 px-2 py-2 text-sky-500 font-bold uppercase text-sm rounded-lg"
          >
            Editar
          </button>
        )}

        <button
          onClick={() => completarTarea(_id)}
          disabled={cargandoCompletar}
          className={`${estado ? 'bg-green-200 text-green-500' :'bg-orange-100 text-orange-500'} px-2 py-2 text-white font-bold uppercase text-sm rounded-lg`}
        >
          {/* {estado ? 'Completada' : cargandoCompletar ? <Spinner/> : 'Completar 1' ? 'Completar 2' : 'Completar 3' } */}
          {estado ? 'Completada' : 'Pendiente'  }
          
          
        </button>

        {admin && (
          <button
            onClick={() => handleModalEliminarTarea(tarea)}
            className="bg-red-200 text-red-500 px-2 py-2 font-bold uppercase text-sm rounded-lg"
          >
            Eliminar
          </button>
        )}

        <Link to={`/proyectos/tarea/${_id}`} className="bg-purple-200 text-purple-500 px-2 py-2 font-bold uppercase text-sm rounded-lg">Ver</Link>
      </div>
    </div>
  );
};

export default Tarea;
