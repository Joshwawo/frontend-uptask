import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import ModalEliminarTarea from "../components/ModalEliminarTarea";
import ModalFormularioTarea from "../components/ModalFormularioTarea";
import Tarea from "../components/Tarea";
import useProyectos from "../hooks/useProyectos";
import useAdmin from "../hooks/useAdmin";
import Alerta from "../components/Alerta";
import Colaborador from "../components/Colaborador";
import ModalEliminarColaborador from "../components/ModalEliminarColaborador";
import io from 'socket.io-client'
let socket;

const Proyecto = () => {
  const { obtenerProyecto, proyecto, cargando, handleModalTarea, 
          submitTareasProyecto,eliminarTareaProyecto,actualizarTareaProyecto,cambiarEstadoTarea } = useProyectos();
  const admin = useAdmin();
  const { id } = useParams();

  useEffect(() => {
    obtenerProyecto(id);
  }, []);

  //?Este useEfect es solo para abrir la conexion con socket.io, por eso tiene dependecias

  useEffect(()=>{
    socket = io(import.meta.env.VITE_BACKEND_URL)
    socket.emit('abrir-proyecto',id)
  },[])

  useEffect(()=>{
      socket.on('tarea-agregada',(tareaNueva)=>{
        // console.log(tareaNueva)
        if(tareaNueva.proyecto === proyecto._id){
        submitTareasProyecto(tareaNueva)

        }
      })

      socket.on('tarea-eliminada',(tareaEliminada)=>{
          if(tareaEliminada.proyecto === proyecto._id){
            eliminarTareaProyecto(tareaEliminada)
          }
      })

      socket.on('tarea-actualizada',(tareaActualizada)=>{
        if(tareaActualizada.proyecto._id === proyecto._id){
          actualizarTareaProyecto(tareaActualizada)
        }
      })
      socket.on('tarea-completada',(tareaCompletada)=>{
        if(tareaCompletada.proyecto._id === proyecto._id){
          cambiarEstadoTarea(tareaCompletada)
        }
      })

  })

  // useEffect(()=>{
  //     socket.on('respuesta',(persona)=>{
  //       console.log(persona)
  //     })
  // })
  
  // console.log(proyecto)
  
  if (cargando) return "Cargando....";
  return  (
    <>
      <div className="flex justify-between">
        <h1 className="font-black text-4xl">{proyecto.nombre}</h1>
        {
          admin && (
            <div className="flex items-center gap-2 text-gray-400 hover:text-black">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
            />
          </svg>
          <Link to={`/proyectos/editar/${id}`} className="uppercase font-bold">
            Editar
          </Link>
        </div>
          )
        }
      </div>
      {
        admin && (
          <button
        type="button"
        onClick={handleModalTarea}
        className="flex gap-2 items-center justify-center text-sm mt-5 px-5 py-3 w-full md:w-auto rounded-lg uppercase font-bold bg-sky-400 text-white text-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
        Nueva Tarea
      </button>
        )
      }
      <p className="font-bold text-xl mt-10">Tareas del proyecto</p>
      {/* <div className="flex justify-center ">
        <div className="w-full md:w-1/3 lg:w-1/4">
          {message && <Alerta alerta={alerta} />}
        </div>
      </div> */}
      <div className="bg-white shadow mt-10 rounded-lg">
        {proyecto.tareas?.length ? (
          proyecto.tareas?.map((tarea) => (
            <Tarea key={tarea._id} tarea={tarea} />
          ))
        ) : (
          <p className="text-center my-5 p-10">
            No hay tareas en este proyecto
          </p>
        )}
      </div>
      {
        admin && (
          <>
          <div className="flex items-center justify-between mt-10">
        <p className="font-bold text-xl mt-10">Colaboradores</p>
        <Link
          to={`/proyectos/nuevo-colaborador/${proyecto._id}`}
          className="text-gray-400 uppercase font-bold hover:text-black flex gap-1"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"
            />
          </svg>
          Añadir
        </Link>
      </div>
      <div className="bg-white shadow mt-10 rounded-lg">
        {proyecto.colaboradores?.length ? (
          proyecto.colaboradores?.map((colaborador) => (
            <Colaborador key={colaborador} colaborador={colaborador} />
          ))
        ) : (
          <p className="text-center my-5 p-10">
            No hay colaboradores en este proyecto
          </p>
        )}
      </div>
          </>
        )
      }

      <ModalFormularioTarea />
      <ModalEliminarTarea />
      <ModalEliminarColaborador />
    </>
  );
};

export default Proyecto;
