import useProyectos from "./useProyectos";
import useAuth from "../context/AuthProvider";

const useAdmin = () => {
  const { proyecto } = useProyectos();
  const { auth } = useAuth();
  return proyecto.creador === auth._id;
};

export default useAdmin;
