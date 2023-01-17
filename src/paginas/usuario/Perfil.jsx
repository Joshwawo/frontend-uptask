import useAuth from "../../context/AuthProvider";

const Perfil = () => {
  const {auth} = useAuth()
  console.log(auth)
  const {nombre, email, _id} = auth
  return (
    <div className=" grid place-items-center">
      <div>
        <h2>Hola, {nombre}</h2>
        <p>Email {email}</p>
      </div>
    </div>
  );
};

export default Perfil;
