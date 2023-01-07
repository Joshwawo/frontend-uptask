import {useEffect} from 'react'
import { Link } from "react-router-dom";
import useProyectos from '../hooks/useProyectos'
import useAuth from '../context/AuthProvider'
import Busqueda from "./Busqueda";


const Header = () => {
  const {handleBuscador,cerrarSesionProyectos} = useProyectos()
  const {cerrarSesionAuth, auth} = useAuth()
  {document.title = `UpTask - ${auth.nombre}`}
  
  const hanleCerrarSesion = ()=>{
    cerrarSesionAuth()
    cerrarSesionProyectos()
    localStorage.removeItem('token')
   
  }

  useEffect(()=>{
    const handleKeyDown = (e)=>{
      if(e.ctrlKey && e.key === 'i'){
        handleBuscador()
      }
    }
    window.addEventListener('keydown',handleKeyDown)
    return ()=>{
      window.removeEventListener('keydown',handleKeyDown)
    }
  },[])
  return (
    <header className="px-4 py-5 bg-white border-b">
      <div className="md:flex md:justify-between">
        <Link to={"/proyectos"} className="flex md:block items-center gap-1">
          <h2 className="text-4xl text-sky-400  font-black text-center mb-5 md:mb-0">
            UpTask
            
          </h2>
          <span className="font-semibold ">{auth.nombre}</span>
          
        </Link>
        
        <div className="flex items-center md gap-4">
          <button onClick={handleBuscador} type="button" className="font-bold uppercase">Buscar Proyecto <span></span></button>
          <Link to={"/proyectos"} className="font-bold uppercase">
            Proyectos
          </Link>
           <Link
        to={"crear"}
        className=" p-3 rounded-md uppercase font-bold"
      >
        Nuevo Proyecto
      </Link>
          <button
            type="button"
            className="text-sm bg-sky-60 hover:bg-red-200 hover:text-red-500 p-3 rounded-md uppercase font-bold"
            onClick={hanleCerrarSesion}
          >
            Cerrar Sesión
          </button>
        </div>
      </div>
      <Busqueda/>
    </header>
  );
};

export default Header;
