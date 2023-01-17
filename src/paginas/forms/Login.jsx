import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Alerta from "../../components/Alerta";
import clienteAxios from "../../config/clienteAxios";
import useAuth from "../../context/AuthProvider";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alerta, setAlerta] = useState({});

  const {setAuth} = useAuth()
  const navigate = useNavigate()
  // console.log(auth)
  // console.log(cargando)
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ([email, password].includes("")) {
      setAlerta({
        message: "Todos los campos son obligatorios",
        error: true,
      });
      return;
    }

    try {
      const { data } = await clienteAxios.post("/api/usuarios/login", {
        email,
        password,
      });
      // console.log(data);
      setAlerta({})
      localStorage.setItem('token',data.token)
      setAuth(data)
      navigate('/proyectos')
    } catch (error) {
      setAlerta({
        message:error.response.data.message,
        error:true
      })
    }
  };

  const { message } = alerta;

  return (
    <>
      <h1 className="text-sky-400 font-black text-6xl capitalize text-center">
        TaskSync{" "} </h1>
      {message && <Alerta alerta={alerta} />}

      <form
        onSubmit={handleSubmit}
        className="mt-10   rounded-lg p-10"
      >
        <div className="my-5">
          <label
            htmlFor="email"
            className=" uppercase text-gray-600 block text-xl font-bold"
          >
            Email
          </label>
          <input
            type="email"
            placeholder="Email de registro"
            name=""
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
          />
        </div>
        <div className="my-5">
          <label
            htmlFor="password"
            className=" uppercase text-gray-600 block text-xl font-bold"
          >
            Password
          </label>
          <input
            type="password"
            placeholder="Introducce tu contraseña"
            name=""
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
          />
        </div>
        <input
          type="submit"
          value="Iniciar sesión"
          className="bg-sky-400 text-white uppercase w-full mb-5 py-3  font-bold rounded hover:cursor-pointer hover:bg-sky-500 hover:text-white transition-colors"
        />
      </form>
      <nav className="lg:flex lg:justify-between">
        <Link
          to={"/registrar"}
          className="block text-center mt-5 text-slate-500 uppercase text-sm"
        >
          ¿No tienes una cuenta? Regístrate
        </Link>
        <Link
          to={"/olvide-password"}
          className="block text-center mt-5 text-slate-500 uppercase text-sm"
        >
          Olvide mi password
        </Link>
      </nav>
    </>
  );
};

export default Login;
