import { Link } from "react-router-dom";
import useProyectos from '../hooks/useProyectos'
import useAuth from '../context/AuthProvider'
import Busqueda from "./Busqueda";


const Header = () => {
  const {handleBuscador,cerrarSesionProyectos} = useProyectos()
  const {cerrarSesionAuth} = useAuth()

  const hanleCerrarSesion = ()=>{
    cerrarSesionAuth()
    cerrarSesionProyectos()
    localStorage.removeItem('token')
   
  }

  return (
    <header className="px-4 py-5 bg-white border-b">
      <div className="md:flex md:justify-between">
        <Link to={"/proyectos"}>
          <h2 className="text-4xl text-sky-600 font-black text-center mb-5 md:mb-0">
            UpTask
          </h2>
        </Link>
        {/* <div className="flex items-center">
          <input
            type="search"
            placeholder="Buscar Proyecto"
            className="rounded-lg outline-blue-500 lg:w-96 block p-2 border"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-600 cursor-pointer"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div> */}
        <div className="flex items-center md gap-4">
          <button onClick={handleBuscador} type="button" className="font-bold uppercase">Buscar Proyecto</button>
          <Link to={"/proyectos"} className="font-bold uppercase">
            Proyectos
          </Link>
          <button
            type="button"
            className="text-white text-sm bg-sky-600 hover:bg-red-500/80 p-3 rounded-md uppercase font-bold"
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
