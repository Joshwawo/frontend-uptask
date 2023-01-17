import { useState } from "react";
import { Link } from "react-router-dom";
import Alerta from "../../components/Alerta";
import clienteAxios from "../../config/clienteAxios";

const Registrar = () => {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repetirPassword, setRepetirPassword] = useState("");
  const [alerta, setAlerta] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ([nombre, email, password, repetirPassword].includes("")) {
      setAlerta({
        message: "Todos los campos son obligatorios",
        error: true,
      });
      return;
    }

    if (password !== repetirPassword) {
      setAlerta({
        message: "Los password no son iguales",
        error: true,
      });
      return;
    }

    if (password.length < 5) {
      setAlerta({
        message: "El password es muy corto agrega por lo menos 6 caracteres",
        error: true,
      });
      return;
    }

    //Crear usuario en la api
    // console.log("Creando...");

    setAlerta({});

    try {
      // const url = `${import.meta.env.VITE_BACKEND_URL}/api/usuarios`
      const { data } = await clienteAxios.post("/api/usuarios", {
        nombre,
        email,
        password,
      });
      // console.log(data)
      setAlerta({
        message: data.message,
        error: false,
      });
      setNombre("");
      setEmail("");
      setPassword("");
      setRepetirPassword("");
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
      <h1 className="text-sky-400 font-black text-6xl capitalize text-center">
        Registrarse
        
      </h1>
      {message && <Alerta alerta={alerta} />}
      <form
        onSubmit={handleSubmit}
        className="mt-10 rounded-lg p-10"
      >
        <div className="my-5">
          <label
            htmlFor="nombre"
            className=" uppercase text-gray-600 block text-xl font-bold"
          >
            Nombre
          </label>
          <input
            type="text"
            placeholder="Tu Nombre"
            id="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
          />
        </div>
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
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
          />
        </div>
        <div className="my-5">
          <label
            htmlFor="password2"
            className=" uppercase text-gray-600 block text-xl font-bold"
          >
            Repetir Password
          </label>
          <input
            type="password"
            placeholder="Introducce tu contraseña nuevamente"
            value={repetirPassword}
            onChange={(e) => setRepetirPassword(e.target.value)}
            id="password2"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
          />
        </div>
        <input
          type="submit"
          value="Crear Cuenta"
          className=" uppercase bg-sky-400 w-full mb-5 py-3 text-white font-bold rounded hover:cursor-pointer hover:bg-sky-500 transition-colors"
        />
      </form>
      <nav className="lg:flex lg:justify-between">
        <Link
          to={"/"}
          className="block text-center mt-5 text-slate-500 uppercase text-sm"
        >
          ¿Ya tienes una cuenta? inicia sesión
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

export default Registrar;
