import { Link } from "react-router-dom";
import { useState } from "react";
import Alerta from "../../components/Alerta";
import clienteAxios from "../../config/clienteAxios";

const OlvidePassword = () => {
  const [email, setEmail] = useState("");
  const [alerta, setAlerta] = useState({})


  const handleSubmit =async (event)=>{
    event.preventDefault()
    const regExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    

    if(!regExp.test(email)){
      setAlerta({
        message: "El email no es válido",
        error: true
      })
      return
    }

    try {

      // const {data} = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/usuarios/olvide-password`,{
      //   email
      // })
      const {data} = await clienteAxios.post(`/api/usuarios/olvide-password`,{email})

      setAlerta({
        message: data.message,
        error:false
        
      })

      // console.log(data)
      
    } catch (error) {
      setAlerta({
        message: error.response.data.message,
        error:true
      })
    }

    
    
  }
  const {message} = alerta


  return (
    <>
      <h1 className="text-sky-400 font-black text-6xl capitalize text-center">
        Recuperar Contraseña
      </h1>
      {message && <Alerta alerta={alerta}/>}

      <form
        onSubmit={handleSubmit}
        className="mt-10  rounded-lg p-10"
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
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
          />
        </div>

        <input
          type="submit"
          value="Enviar Instrucciones"
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
          to={"/registrar"}
          className="block text-center mt-5 text-slate-500 uppercase text-sm"
        >
          ¿No tienes una cuenta? Registrate
        </Link>
      </nav>
    </>
  );
};

export default OlvidePassword;
