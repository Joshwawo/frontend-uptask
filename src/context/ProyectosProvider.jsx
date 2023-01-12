import { useState, useEffect, createContext } from "react";
import clienteAxios from "../config/clienteAxios";
import { useNavigate } from "react-router-dom";
import io from 'socket.io-client'
import useAuth from '../context/AuthProvider'
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import UpdateIcon from "../components/svgs/UpdateIcon";



let socket;
const ProyectosContext = createContext();

const ProyectosProvider = ({ children }) => {
  const [proyectos, setProyectos] = useState([]);
  const [proyecto, setProyecto] = useState({});
  const [alerta, setAlerta] = useState({});
  const [cargando, setCargando] = useState(false);
  const [modalFormularioTarea, setModalFormularioTarea] = useState(false);
  const [tarea, setTarea] = useState({});
  const [ModalEliminarTarea, setModalEliminarTarea] = useState(false);
  const [colaborador, setColaborador] = useState({})
  const [modalEliminarColaborador, setModalEliminarColaborador] = useState(false)
  const [modalBuscador, setModalBuscador] = useState(false)
  const [cargandoCompletar, setCargandoCompletar] = useState(false)
  const [tareaXId, setTareaXId] = useState({})
  
  const navigate = useNavigate();
  const {auth} = useAuth()

  useEffect(() => {
    const obtenerProyectos = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;
        const config = {
          headers: {
            "content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
        const { data } = await clienteAxios.get("/api/proyectos", config);
        // console.log(data)
        setProyectos(data);
      } catch (error) {
        console.log(error);
      }
    };
    obtenerProyectos();
  }, [auth]);

  useEffect(()=>{
    socket = io(import.meta.env.VITE_BACKEND_URL)

  },[])

  const mostrarAlerta = (alerta) => {
    setAlerta(alerta);
    setTimeout(() => {
      setAlerta({});
    }, 5000);
  };

  const submitProyecto = async (proyecto) => {
    if (proyecto.id) {
      await editarProyecto(proyecto);
    } else {
      await nuevoProyecto(proyecto);
    }
    // console.log(proyecto);
    return;
  };

  const editarProyecto = async (proyecto) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const { data } = await clienteAxios.put(
        `/api/proyectos/${proyecto.id}`,
        proyecto,
        {
          headers: {
            "content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      //sincronizar el state
      const proyectosActualizados = proyectos.map((proyectoState) =>
        proyectoState._id === data._id ? data : proyectoState
      );
      // console.log(proyectosActualizados)
      setProyectos(proyectosActualizados);
      //mostrar la alerta
      // setAlerta({
      //   message: "Proyecto actualizado correctamente",
      //   error: false,
      // });

      toast.info('Proyecto actualizado correctamente', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        style: {
          background: 'rgb(155, 218, 249,0.9)',
          color: 'rgb(12, 141, 206, 0.8)',
          fontWeight: "bolder",
          colorScheme: 'light',

        },
        icon: ()=> <UpdateIcon/>
    
      })

      navigate("/proyectos");

      setTimeout(() => {
        setAlerta({});
      }, 2000);
      //redireccionar
      // console.log(data);
    } catch (error) {
      // console.log(error.response.data.message);
      toast.error(`${error.response.data.message === undefined ? 'Error inesperado D:' : error.response.data.message}`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        className: 'bg-red-200 text-red-500 rounded-md'

      })
    }
  };

  const nuevoProyecto = async (proyecto) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const { data } = await clienteAxios.post("/api/proyectos", proyecto, {
        headers: {
          "content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      setProyectos([...proyectos, data]);
      // setAlerta({
      //   message: "Proyecto creado correctamente",
      //   error: false,
      // });

      toast.success('Proyecto creado correctamente', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
    
      })

      setTimeout(() => {
        setAlerta({});
        navigate("/proyectos");
      }, 500);

      // console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const obtenerProyecto = async (id) => {
    setCargando(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios.get(`/api/proyectos/${id}`, config);
      setProyecto(data);
      setAlerta({})
      // console.log(data)
    } catch (error) {
      // console.log(error);
      navigate('/proyectos')
      setAlerta({
        message:error.response.data.message,
        error:true
      })
      setTimeout(() => {
        setAlerta({})
      }, 2000);
    } finally {
      setCargando(false);
    }
  };

  const eliminarProyecto = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await clienteAxios.delete(
        `/api/proyectos/${id}`,
        config
      );
      setAlerta({
        message: data.message,
        error: false,
      });

      //Sincronizar el state
      const proyectosActualizados = proyectos.filter(
        (proyectoState) => proyectoState._id !== id
      );
      setProyectos(proyectosActualizados);

      setTimeout(() => {
        setAlerta({});
        navigate("/proyectos");
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };

  const handleModalTarea = () => {
    setModalFormularioTarea(!modalFormularioTarea);
    setTarea({});
  };

  const submiTarea = async (tarea) => {
    if (tarea?.id) {
      await editarTarea(tarea);
    } else {
      await crearTarea(tarea);
    }
  };

  const crearTarea = async (tarea) => {
    setCargandoCompletar(true)
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await clienteAxios.post(`/api/tareas`, tarea, config);
      // console.log(data);
      //Agregar la tarea al state
      //!Deprecated - Esto se quito de aqui y ahora se le asignara a socket.io, pero dejo el codigo por si acaso
      // const proyectosActualizado = { ...proyecto };
      // proyectosActualizado.tareas = [...proyecto.tareas, data];
      // setProyecto(proyectosActualizado);

      setAlerta({});
      setModalFormularioTarea(false);

      toast.success('Tarea creada correctamente', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });




      //*SOCKET IO
      socket.emit('nueva-tarea', data)
    } catch (error) {
      console.log(error);
    }finally{
      setCargandoCompletar(false)
      // setTimeout(() => {
      //   setCargandoCompletar(false)
      // }, 2000);
    }
  };

  const editarTarea = async (tarea) => {
    setCargandoCompletar(true)
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await clienteAxios.put(
        `/api/tareas/${tarea.id}`,
        tarea,
        config
      );
      // console.log(data);
      //!Deprecated - Esto se quito de aqui y ahora se le asignara a socket.io, pero dejo el codigo por si acaso      
      // const proyectosActualizado = { ...proyecto };
      // proyectosActualizado.tareas = proyectosActualizado.tareas.map(
      //   (tareaState) => (tareaState._id === data._id ? data : tareaState)
      // );
      // setProyecto(proyectosActualizado);
      
      setAlerta({});
      setModalFormularioTarea(false);
      //Socket Io
      socket.emit('actualizar-tarea',data)
    } catch (error) {
      console.log(error);
    }finally{
      setCargandoCompletar(false)
    }
  };

  const handleModalEditarTarea = (tarea) => {
    setTarea(tarea);
    setModalFormularioTarea(true);
  };

  const handleModalEliminarTarea = (tarea) => {
    setTarea(tarea);
    setModalEliminarTarea(!ModalEliminarTarea);
  };
  const eliminarTarea = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await clienteAxios.delete(
        `/api/tareas/${tarea._id}`,
        config
      );
      // console.log(data);
      setAlerta({
        message: data.message,
        error: false,
      });
      //!Deprecated - Esto se quito de aqui y ahora se le asignara a socket.io, pero dejo el codigo por si acaso
      // const proyectosActualizado = { ...proyecto };
      // proyectosActualizado.tareas = proyectosActualizado.tareas.filter(
      //   (tareaState) => tareaState._id !== tarea._id
      // );
      // setProyecto(proyectosActualizado);
      setModalEliminarTarea(false);
      
      //SOCKET IO
      socket.emit('eliminar-tarea',tarea)
      setTarea({});

      setTimeout(() => {
        setAlerta({});
      }, 2000);
      
    } catch (error) {
      console.log(error);
    }
  };

  const submitColaborador = async (email) => {
    // console.log(email);
    setCargando(true)
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios.post(
        `/api/proyectos/colaboradores`,
        { email },
        config
      );
      // console.log(data);
      setColaborador(data)
      setAlerta({})
      // setCargando(false)
    } catch (error) {
      setAlerta({
        message: error.response.data.message,
        error: true,
      });
      // console.log(error.response.data.message);

      setTimeout(() => {
        setAlerta({});
      }, 2000);
    }finally{
      setCargando(false)
    }
  };

  const agregarColaborador = async(email)=>{
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await clienteAxios.post(`/api/proyectos/colaborador/${proyecto._id}`, email ,config);
      setAlerta({
        message: 'Colaborador Agregado Correctamente',
        error:false
      })
      setColaborador({})
      setTimeout(() => {
        setAlerta({})
      }, 2000);
      // setAlerta({})
      // console.log(data)
      
    } catch (error) {
      console.log(error)
      setAlerta({
        message:error.response.data.message,
        error:true
      })
      setTimeout(() => {
        setAlerta({})
      }, 2000);
    }finally{

    }
  }

  const handleModalEliminarColaborador = (colaborador) =>{
    setModalEliminarColaborador(!modalEliminarColaborador)
    setColaborador(colaborador)
    // console.log(colaborador)
  }
  const eliminarColaborador = async()=>{
    // console.log(colaborador)
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await clienteAxios.post(`/api/proyectos/eliminar-colaboradore/${proyecto._id}`, {id:colaborador._id} ,config);
      const proyectoActualizado = {...proyecto}
      proyectoActualizado.colaboradores = proyectoActualizado.colaboradores.filter(colaboradorState => colaboradorState._id !== colaborador._id)
      setProyecto(proyectoActualizado)
      setAlerta({
        message:data.message,
        error:false
      })
      setColaborador({})
      setModalEliminarColaborador(false)
      setTimeout(() => {
        setAlerta({})
      }, 2000);
    } catch (error) {
      console.log(error.response)
    }
  }
  const completarTarea = async(id)=>{
    // console.log(id)
    setCargandoCompletar(true)
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const {data} = await clienteAxios.post(`/api/tareas/estado/${id}`,{},config)
      //!Deprecated - Esto se quito de aqui y ahora se le asignara a socket.io, pero dejo el codigo por si acaso 
      // const proyectoActualizado = {...proyecto} 
      // proyectoActualizado.tareas = proyectoActualizado.tareas.map((tareaState) =>tareaState._id === data._id ? data :tareaState)
      // setProyecto(proyectoActualizado)

      //socket io     
      setTarea({})
      setAlerta({})
      socket.emit('cambiar-estado',data)
      
    } catch (error) {
      console.log(error.response)
    }finally{
      setCargandoCompletar(false)
    }
  }

  const handleBuscador = ()=>{
    setModalBuscador(!modalBuscador)
  }

  //Socket io
  const submitTareasProyecto = (tarea)=>{
    //Agregar la tarea al state para todos en el room
    const proyectosActualizado = { ...proyecto };
    proyectosActualizado.tareas = [...proyectosActualizado.tareas, tarea];
    setProyecto(proyectosActualizado);
  }

  const eliminarTareaProyecto = (tarea)=>{
    // const proyectoActualizado = { ...proyecto };
    //   proyectoActualizado.tareas = proyectoActualizado.tareas.filter((tareaState) => tareaState._id !== tarea._id);
    //   setProyecto(proyectoActualizado);
    const proyectoActualizado = {...proyecto}
        proyectoActualizado.tareas = proyectoActualizado.tareas.filter(tareaState => tareaState._id !== tarea._id )
        // console.log(proyectoActualizado)
        setProyecto(proyectoActualizado)
  }

  const actualizarTareaProyecto = (tarea)=>{
      const proyectosActualizado = { ...proyecto };
      proyectosActualizado.tareas = proyectosActualizado.tareas.map(
        (tareaState) => (tareaState._id === tarea._id ? tarea : tareaState)
      );
      setProyecto(proyectosActualizado);
  }
  const cambiarEstadoTarea = (tarea)=>{
      const proyectoActualizado = {...proyecto} 
      proyectoActualizado.tareas = proyectoActualizado.tareas.map((tareaState) =>tareaState._id === tarea._id ? tarea :tareaState)
      setProyecto(proyectoActualizado)
  }

  const cerrarSesionProyectos = ()=>{
    setProyectos([])
    setProyecto({})
    setAlerta({})

  }
  const obtenerTarea = async (id) => {
    setCargando(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios.get(`/api/tareas/${id}`, config)
      // console.log(data)
      setTareaXId(data);
      setAlerta({})
      // console.log(data)
    } catch (error) {
      console.log(error);
      // navigate('/proyectos')
      setAlerta({
        message:error.response.data.message,
        error:true
      })
      setTimeout(() => {
        setAlerta({})
      }, 2000);
    } finally {
      setCargando(false);
    }
  };

  return (
    <ProyectosContext.Provider
      value={{
        proyectos,
        mostrarAlerta,
        alerta,
        submitProyecto,
        obtenerProyecto,
        proyecto,
        cargando,
        eliminarProyecto,
        modalFormularioTarea,
        handleModalTarea,
        submiTarea,
        handleModalEditarTarea,
        tarea,
        ModalEliminarTarea,
        handleModalEliminarTarea,
        eliminarTarea,
        submitColaborador,
        colaborador,
        agregarColaborador,
        handleModalEliminarColaborador,
        modalEliminarColaborador,
        eliminarColaborador,
        completarTarea,
        handleBuscador,
        modalBuscador,
        submitTareasProyecto,
        eliminarTareaProyecto,
        actualizarTareaProyecto,
        cambiarEstadoTarea,
        cerrarSesionProyectos,
        cargandoCompletar,
        obtenerTarea,
        tareaXId,


        


      }}
    >
      {children}
    </ProyectosContext.Provider>
  );
};

export { ProyectosProvider };

export default ProyectosContext;
