import { useContext } from "react";
import AuthContext from "../context/AuthProvider";

//TODO: Mover esto al provider porque aqui truena xd

const useAuth = () => {
  return useContext(AuthContext);
};

export default useAuth;
