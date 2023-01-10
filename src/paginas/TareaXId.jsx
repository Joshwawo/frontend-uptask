import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useProyectos from "../hooks/useProyectos";
import {formatearFecha} from '../helpers/FormatearFecha'
import Spinner from "../components/Spinner";
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

  if(cargando) return <Spinner/>

  return (
    <div className="mt-10 mx-4 font-bold">
      <div className="flex justify-between mb-10 text-2xl ">
        <h2 className="">Tarea: {nombre}</h2>
        <p>Proyecto: {proyecto?.nombre}</p>
      </div>
      <div className=" space-y-5 font-bold text-black/70">
      <p className="">Descripcion de la tarea: <span className="font-semibold text-gray-500">{descripcion}</span></p>
      <p className="">Estado: {estado ? <span>Completada</span> : <span className="bg-orange-200 text-orange-600 rounded px-2 py-0">Pendiente</span>}</p>
      <p className="">Fecha Entrega:  <span className="font-normal">{formatearFecha(fechaEntrega)} </span></p>
      <p className="">Prioridad: <span  className={`mb-2 text-sm  ${
            prioridad === "Baja"
              ? "text-green-500"
              : prioridad === "Media"
              ? "text-yellow-500"
              : "text-red-500"
          }`}>{prioridad}</span></p>
      </div>

      
    </div>
  );
};

export default TareaXId;
