import PreviewProyecto from "../../components/PreviewProyecto";
import useProyectos from "../../hooks/useProyectos";
import Alerta from '../../components/Alerta'

// let socket;

const Proyectos = () => {
  const { proyectos , alerta} = useProyectos();

  // //El useEffect usando socket.io usualmente se usara sin dependencias para que este corriendo todo el tiempo
  // useEffect(()=>{
  //   socket = io(import.meta.env.VITE_BACKEND_URL)
  //   ///Este nombre lo defino yo es el nombre del evento
  //   socket.emit('prueba',proyectos)
  //   //Respuesta del backend
  //   socket.on('respuesta', (persona)=>{
  //     console.log('Desde el frontend',persona)
  //   })
  // })

  
  
  const {message} = alerta
  // console.log('Desde Proyectos',proyectos)
  return (
    <div className="mt-10">
     <div className=' md:flex justify-between items-center'>
       <h1 className="text-center xl:text-start font-bold text-4xl uppercase mx-9">Proyectos</h1>
       <p className='mt-5 mx-4 md:mt-0 bg-yellow-100/90 text-yellow-500 font-bold py-2 px-2 rounded-lg'>💡Tip puedes navegador por los proyectos con <span className='text-yellow-900'>ctrl + i</span></p>
     </div>
        {message && <Alerta alerta={alerta}/>}
      <div className=" mt-10 rounded-lg mx-4 2xl::mx-0">
        {proyectos.length ? (
          proyectos.map((proyecto)=>(
            <PreviewProyecto key={proyecto._id} proyecto={proyecto}/>
          ))
        ) : (
          <p className="text-center text-gray-600 uppercase p-5">No hay proyectos aun</p>
        )}
      </div>
    </div>
  );
};

export default Proyectos;
