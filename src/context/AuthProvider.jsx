import { useState, useEffect, createContext, useContext } from "react";
import {useNavigate} from 'react-router-dom'
import clienteAxios from "../config/clienteAxios";

const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [cargando, setCargando] = useState(true);

  const navigate = useNavigate()


  useEffect(() => {
    const autenticarUsuario = async () => {
      const getToken = localStorage.getItem("token");

      if (!getToken) {
        setCargando(false)
        return;
      }

      const config = {
        headers: {
          "content-Type": "application/json",
          Authorization: `Bearer ${getToken}`,
        },
      };

      try {
        const { data } = await clienteAxios.get("/api/usuarios/perfil", {
          headers: {
            "content-Type": "application/json",
            Authorization: `Bearer ${getToken}`,
          },
        });
        setAuth(data);
        // navigate('/proyectos')
        // console.log(data);
      } catch (error) {
        console.log(error);
        setAuth({})
      }finally{
        setCargando(false)
      }
    };

    return () => autenticarUsuario();
  }, []);

  const cerrarSesionAuth = ()=>{
    setAuth({})
  }

  return (
    <AuthContext.Provider
      value={{
        setAuth,
        auth,
        cargando,
        cerrarSesionAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

//gola
// export default AuthContext;

const useAuth = () => {
  return useContext(AuthContext);
};
export { AuthProvider };

export default useAuth;
