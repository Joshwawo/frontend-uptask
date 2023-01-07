import { useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import Header from "../components/Header";
import SideBar from "../components/SideBar";
import useAuth from "../context/AuthProvider";

const RutaProtegida = () => {
  const { auth, cargando } = useAuth();

  if (cargando) return "Cargando...";

  //TODO: Ponerle un spinner y no un cargando...

  return (
    <>
      {auth?._id ? (
        <div className="bg-gray-100">
          <Header />
          <div className="md:flex md:min-h-screen">
            <SideBar />
            <main className="flex-1 bg-red-40">
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
