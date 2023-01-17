import { useEffect } from 'react';
import {Routes, Route, useLocation} from 'react-router-dom'
import AuthLayout from './layouts/AuthLayout';
import ConfirmarCuenta from './paginas/forms/ConfirmarCuenta';
import Login from './paginas/forms/Login';
import NuevoPassword from './paginas/usuario/NuevoPassword';
import OlvidePassword from './paginas/forms/OlvidePassword';
import Registrar from './paginas/forms/Registrar';
import {AuthProvider} from './context/AuthProvider'
import {ProyectosProvider} from './context/ProyectosProvider'
import RutaProtegida from './layouts/RutaProtegida';
import Proyectos from './paginas/usuario/Proyectos';
import NuevoProyecto from './paginas/usuario/NuevoProyecto';
import Proyecto from './paginas/usuario/Proyecto';
import EditarProyecto from './paginas/usuario/EditarProyecto';
import NuevoColaborador from './paginas/usuario/NuevoColaborador';
import TareaXId from './paginas/usuario/TareaXId';
import Error404 from './paginas/Error/Error404';
import {ToastContainer} from 'react-toastify'
import Perfil from './paginas/usuario/Perfil';
const App = () => {
  const location = useLocation()
  useEffect(()=>{
    window.scrollTo(0,0)
  },[location])
  return (
   
     <AuthProvider>
      <ProyectosProvider >
      <Routes>
       <Route path='/' element={<AuthLayout/>}>
         <Route index element={<Login/>}/>
         <Route path='registrar' element={<Registrar/>}/>
         <Route path='olvide-password' element={<OlvidePassword/>}/>
         <Route path='olvide-password/:token' element={<NuevoPassword/>}/>
         <Route path='confirmar/:id' element={<ConfirmarCuenta/>}/>
       </Route>
       {/* Rutas Protegidas */}
       <Route path='/proyectos' element={<RutaProtegida/>}>
        <Route index element={<Proyectos/>}/>
        <Route path='perfil' element={<Perfil/>}/>
        <Route path='tarea/:id' element={<TareaXId/>} />
        <Route path='crear' element={<NuevoProyecto/>} />
        <Route path='nuevo-colaborador/:id' element={<NuevoColaborador/>} />
        <Route path='editar/:id' element={<EditarProyecto/>} />
        <Route path=':id' element={<Proyecto/>} />
       </Route>
       <Route path='*' element={<Error404/>} />
      </Routes>
      <ToastContainer/>
      
      </ProyectosProvider>
     </AuthProvider>
   
  );
};

export default App;
