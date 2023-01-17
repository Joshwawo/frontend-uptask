import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Alerta from "../../components/Alerta";
import clienteAxios from "../../config/clienteAxios";

const NuevoPassword = () => {
  const [tokenValido, setTokenValido] = useState(false);
  const [alerta, setAlerta] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordConfirmado, setPasswordConfirmado] = useState(false);

  const { token } = useParams();

  useEffect(() => {
    const comprobarToken = async () => {
      try {
        //TODO:Mover hacia un cliente axios
        // const { data } = await axios.get(
        //   `${url}/api/usuarios/olvide-password/${token}`
        // );
        const {data} = await clienteAxios.get(`/api/usuarios/olvide-password/${token}`)
        // console.log(data);
        setTokenValido(true);
        // setPasswordConfirmado(true);
      } catch (error) {
        setAlerta({
          message: error.response.data.message,
          error: true,
        });
        // console.log(error.response.data.message)
      }
    };
    comprobarToken();
  }, []);

  const handleSubmi = async (e) => {
    e.preventDefault();

    if (password < 5 && password === "") {
      setAlerta({
        message: "Introduce un password de al menos 5 caracteres",
        error: true,
      });
      return;
    }

    try {
      // const { data } = await axios.post(
      //   `${url}/api/usuarios/olvide-password/${token}`,
      //   { password }
      // );
      const {data} = await clienteAxios.post(`/api/usuarios/olvide-password/${token}`,{password})
      // console.log(data);
      setAlerta({
        message: data.message,
        error: false,
      });
      setPasswordConfirmado(true)
      setPassword('')
    } catch (error) {
      setAlerta({
        message: error.response.data.message,
        error: true,
      });
    }
  };

  const { message } = alerta;

  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl capitalize">
        Reestablece tu password y administra tus{" "}
        <span className="text-slate-700">proyectos</span>
      </h1>
      {message && <Alerta alerta={alerta} />}
      {tokenValido && (
        <form
          onSubmit={handleSubmi}
          className="mt-10 bg-white shadow rounded-lg p-10"
        >
          <div className="my-5">
            <label
              htmlFor="password"
              className=" uppercase text-gray-600 block text-xl font-bold"
            >
              Nuevo Password
            </label>
            <input
              type="password"
              placeholder="Introducce tu nuevo password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            />
          </div>

          <input
            type="submit"
            value="Cambiar Contraseña"
            className=" uppercase bg-sky-700 w-full mb-5 py-3 text-white font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors"
          />
          {passwordConfirmado && (
            <Link
              to={"/"}
              className="block text-center  text-slate-500 uppercase text-base"
            >
              Inicia sesión
            </Link>
          )}
        </form>
      )}

      <nav className="lg:flex lg:justify-between">
        <Link
          to={"/"}
          className="block text-center mt-5 text-slate-500 uppercase text-sm"
        >
          ¿Ya tienes una cuenta? inicia sesión
        </Link>
        <Link
          to={"/registrar"}
          className="block text-center mt-5 text-slate-500 uppercase text-sm"
        >
          ¿Aun no tienes una cuenta? Regístrate
        </Link>
      </nav>
    </>
  );
};

export default NuevoPassword;
