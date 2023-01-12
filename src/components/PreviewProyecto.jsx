import React from "react";
import { Link } from "react-router-dom";
import useAuth from "../context/AuthProvider";

const PreviewProyecto = ({ proyecto }) => {
  const { auth } = useAuth();
  const { nombre, _id, cliente, creador } = proyecto;
  return (
    <div className="border-b-2 border-b-gray-200 last-of-type:border-none hover:bg-gray-200/50 shadow-gray-300 p-5 flex flex-col md:flex-row justify-between">
      <div className="flex items-center gap-2">
      <p className="flex-1 font-semibold">
        {nombre}{" "}
        <span className="text-sm text-gray-500 uppercase font-normal">
          {""} {cliente}
        </span>
      </p>
      {auth._id !== creador && <p className="p-1 text-xs rounded-lg text-cyan-500 bg-cyan-100 font-bold uppercase">Colaborador</p>}
      </div>
      <Link
        to={`${_id}`}
        className="text-gray-600 hover:text-gray-800 uppercase text-sm font-bold "
      >
        Ver Proyecto
      </Link>
    </div>
  );
};

export default PreviewProyecto;
