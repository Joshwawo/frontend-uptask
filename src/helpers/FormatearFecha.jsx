export const formatearFecha = (fecha) => {
  const nuevaFecha = new Date(fecha); 
  // const nuevaFecha = new Date(fecha.split('T')[0].split('-'))
  // const opciones = {
  //   weekday: "long",
  //   year: "numeric",
  //   month: "long",
  //   dat: "numeric",
  // };
  const opciones = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,

    

  }
  return nuevaFecha.toLocaleDateString("es-Es", opciones);
};
