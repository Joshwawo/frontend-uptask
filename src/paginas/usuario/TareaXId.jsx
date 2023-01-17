import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useProyectos from "../../hooks/useProyectos";
import { formatearFecha } from "../../helpers/FormatearFecha";
import Spinner from "../../components/Spinner";
const TareaXId = () => {
  const { obtenerTarea, tareaXId, cargando } = useProyectos();
  const { id } = useParams();

  useEffect(() => {
    obtenerTarea(id);
  }, []);

  const {
    _id,
    nombre,
    descripcion,
    estado,
    fechaEntrega,
    prioridad,
    proyecto,
  } = tareaXId;

  if (cargando) return <Spinner />;

  return (
    <div className="mt-10 mx-4 font-bold">
      <div className="flex justify-between mb-10 text-2xl ">
        <h2 className="">Tarea: {nombre}</h2>
        <p>Proyecto: {proyecto?.nombre}</p>
      </div>
      <div className=" space-y-5 font-bold text-black/70">
        <p className="">
          Descripcion de la tarea:{" "}
          <span className="font-semibold text-gray-500">{descripcion}</span>
        </p>
        <p className="flex items-center gap-2">
          Estado:{" "}
          {estado ? (
            <span>Completada</span>
          ) : (
            <span className="bg-orange-200 text-orange-600 rounded px-2 py-0">
              Pendiente
            </span>
          )}
        </p>
        <p className="">
          Fecha Entrega:{" "}
          <span className="font-normal">{formatearFecha(fechaEntrega)} </span>
        </p>
        <p className="flex gap-2 ">
          Prioridad:{" "}
          <span
            className={`mb-2   ${
              prioridad === "Baja"
                ? "text-green-500 bg-green-200 rounded px-2 py-0"
                : prioridad === "Media"
                ? "text-yellow-500 bg-yellow-200 rounded px-2 py-0"
                : "text-red-500 bg-red-100 rounded px-2 py-0"
            }`}
          >
            {prioridad}
          </span>
        </p>
      </div>
    </div>
  );
};

export default TareaXId;
