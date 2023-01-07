import { useContext } from "react";
import ProyectosProvider from "../context/ProyectosProvider";

const useProyectos = () => {
  return useContext(ProyectosProvider);
};
export default useProyectos