import { useEffect } from "react";
import FormularioColaborador from "../../components/FormularioColaborador";
import useProyectos from "../../hooks/useProyectos";
import { useParams } from "react-router-dom";
import Spinner from '../../components/Spinner'
import Alerta from "../../components/Alerta";

const NuevoColaborador = () => {
  const { obtenerProyecto, proyecto, cargando, colaborador,agregarColaborador,alerta } = useProyectos();
  const params = useParams();
  useEffect(() => {
    obtenerProyecto(params.id);
  }, []);
  // console.log(colaborador)
  // if(cargando) return 'Cargando...'
  if(!proyecto?._id) return <Alerta alerta={alerta}/>
  return (
    <>
      <h1 className="text-4xl font-black">Añadir Colaborador(a) al Proyecto: {proyecto.nombre}</h1>
      <div className="mt-10 flex justify-center ">
        <FormularioColaborador />
      </div>

      {cargando ? (<Spinner/>) :colaborador?._id && (
        <div className="flex justify-center mt-10">
          <div className="bg-white py-10 px-5 w-full md:w-1/2 rounded-lg shadow mx-5">
              <h2 className="text-center mb-10 text-2xl font-bold">Resultado:</h2>
              <div className="flex justify-between items-center gap-2">
                <p className="text-lg font-bold">{colaborador.nombre}</p>
                <button onClick={()=>agregarColaborador({email:colaborador.email})} type="button" className="bg-slate-100 text-slate-500 hover:bg-green-100 hover:text-green-500
                px-2 py-2 rounded-lg uppercase
                font-bold text-sm">Agregar al Proyecto</button>
              </div>
          </div>
        </div>
      )}

    </>
  );
};

export default NuevoColaborador;
