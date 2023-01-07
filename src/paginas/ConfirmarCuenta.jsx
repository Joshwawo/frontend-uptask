import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/clienteAxios";

const ConfirmarCuenta = () => {
  const [alerta, setAlerta] = useState({});
  const [cuentaConfirmada, setCuentaConfirmada] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    const ConfirmarCuenta = async () => {
      try {
        const url = `/api/usuarios/confirmar/${id}`;
        // console.log(url);
        // const { data } = await axios.get(url);
      const {data} =  await clienteAxios.get(url)
        setAlerta({
          message: data.message,
          error: false,
        });
        setCuentaConfirmada(true);
      } catch (error) {
        setAlerta({
          message: error.response.data.message,
          error: true,
        });
      }
    };

    return () => ConfirmarCuenta();
  }, []);

  const { message } = alerta;

  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl capitalize">
        Confirma tu cuenta y comienza a administra tus{" "}
        <span className="text-slate-700">proyectos</span>
      </h1>
      <div className="mt-20 md:mt-10 shadow-lg px-5 py-5 bg-white">
        {message && <Alerta alerta={alerta} />}
        {cuentaConfirmada && (
          <Link
            to={"/"}
            className="block text-center mt-5 text-slate-500 uppercase text-sm"
          >
            inicia sesión
          </Link>
        )}
      </div>
    </>
  );
};

export default ConfirmarCuenta;
