import { Outlet, Navigate } from "react-router-dom";
import Header from "../components/Header";
import SideBar from "../components/SideBar";
import useAuth from "../context/AuthProvider";
import Spinner from '../components/Spinner'

const RutaProtegida = () => {
  const { auth, cargando } = useAuth();

  if (cargando) return <Spinner/>


  return (
    <>
      {auth?._id ? (
        <div className="bg-gray-100">
          <Header />
          <div className="md:flex md:min-h-screen">
            {/* <SideBar /> */}
            <main className="flex-1 bg-red-40 container mx-auto">
              <Outlet />
            </main>
          </div>
        </div>
      ) : (
        <Navigate to={"/"} />
      )}
    </>
  );
};

export default RutaProtegida;
