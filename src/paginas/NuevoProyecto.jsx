import FormularioProyecto from "../components/FormularioProyecto";

const NuevoProyecto = () => {
  return (
    <div className="mx-4 md:mx-0">
      <h1 className="font-black text-4xl text-center my-10 text-gray-800/90">Crear Proyecto</h1>
      <FormularioProyecto />
    </div>
  );
};

export default NuevoProyecto;
