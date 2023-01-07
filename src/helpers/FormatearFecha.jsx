export const formatearFecha = (fecha) => {
//   const nuevaFecha = new Date(fecha); 
  const nuevaFecha = new Date(fecha.split('T')[0].split('-'))
  const opciones = {
    weekday: "long",
    year: "numeric",
    month: "long",
    dat: "numeric",
  };
  return nuevaFecha.toLocaleDateString("es-Es", opciones);
};
