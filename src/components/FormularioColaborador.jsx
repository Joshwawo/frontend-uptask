import { useState } from "react";
import useProyectos from "../hooks/useProyectos";
import Alerta from "../components/Alerta";

const FormularioColaborador = () => {
  const [email, setEmail] = useState("");
  const { mostrarAlerta, alerta, submitColaborador } = useProyectos();
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email === "") {
      mostrarAlerta({
        message: "Email es obligatorio",
        error: true,
      });
      return;
    }
    await submitColaborador(email);
  };
  const { message } = alerta;

  // Uint8Array
  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="bg-white py-10 px-5 w-full md:w-1/2 rounded-lg shadow mx-5"
      >
        {message && <Alerta alerta={alerta} />}
        <div className="mb-5">
          <label
            htmlFor="email"
            className="text-gray-700 uppercase font-bold text-sm"
          >
            Email Colaborador
          </label>
          <input
            id="email"
            type="email"
            placeholder="email de la tarea"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md outline-blue-200"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <input
          type="submit"
          value={`Buscar colaborador`}
          className="bg-sky-600 hover:bg-sky-700 w-full p-3 text-white uppercase font-bold cursor-pointer transition-colors rounded text-sm"
        />
      </form>
    </>
  );
};

export default FormularioColaborador;
