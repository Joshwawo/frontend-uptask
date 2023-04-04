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
    <header className="px-4 py-2 ">
      <div className="md:flex md:justify-between text-xs xl:text-base">
        <Link to={"/proyectos"} className="flex md:block items-end justify-between">
          <h2 className="text-3xl text-sky-400  font-black text-center  md:mb-0">
          TaskSync 
            
          </h2>
          <span className="font-semibold">{auth.nombre}</span>
          
        </Link>
        
        <div className="flex items-center md gap-4 text-gray-700 mt-5 md:mt-0">
          <button onClick={handleBuscador} type="button" className="font-bold uppercase">Buscar Proyecto <span></span></button>
          
           <Link
        to={"crear"}
        className=" p-3 rounded-md uppercase font-bold"
      >
        Nuevo Proyecto
      </Link>
      <Link to={"/proyectos/perfil"} className="font-bold uppercase">
            Perfil
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
