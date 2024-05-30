import React, {useState} from 'react'; //Permite usar componeentes de react, El useState es un estado para que la pagina sea reactiva
import axios from 'axios'; //Permite hacer peticiones 
import { useNavigate } from 'react-router-dom'; //Implementa el manejador de rutas de react

const inputClasses = 'w-full px-3 py-2 border rounded-lg'//Clases de tailwind para dar diseño
const buttonClasses = 'w-full bg-blue-900 text-white py-2 rounded-lg' //Clasess de tailwind para dar diseño


const Login= () => { //Funcion anonima que permite renderizar el componenete sque esta escrito en jsx

  const [usuario, setUsuario]=useState('');//Una constante para guardar usuario e ivocamos el matodo setUsuario que hace parte de useState para que la pagina sea reactiva
  const [clave, setClave]=useState('');//Una constante para guardar usuario e ivocamos el matodo setUsuario que hace parte de useState para que la pagina sea reactiva
  const navigate = useNavigate();//Llamamos a la funcion de react encargada de redirigir a una ruta de nevagacion

  const usuarioIngresado= (e)=>{ //Funcion landa o anonima para capturar el valor del input cada que escriban o cambie su valor
    setUsuario(e.target.value)//Cargamos el valor a la constante definida anteriormente por medio del metodo definido setUsuario propio de los estados en react
  }

  const claveIngresada= (e)=>{//Funcion landa o anonima para capturar el valor del input cada que escriban o cambie su valor
    setClave(e.target.value)//Cargamos el valor a la constante definida anteriormente por medio del metodo definido setClave propio de los estados en react
  }

  const traer_datos = async (e) => { //Funcion landa, anonima o flecha asincrona para hacer la peticiopn a la url del api en express
    e.preventDefault(); // Previene la recarga de la página
    console.log("clave->", clave, "usuario->", usuario);

    try { //Try para encampsular los posibles errores 
      const response = await axios.post('http://localhost:3500/login', { //Peticion hecha por medio de axios a la url del api
          usuario:usuario,//Paremetros que enviaremos a la direccion url
          clave:clave
        // Puedes agregar params y headers aquí si es necesario
      });
      console.log("si sirvio");
      console.log(response.data);
      navigate('/principal');
    } catch (error) { //Encapsulado del error 
      console.log("no sirvio");
      console.error(error);
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-900">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex items-center justify-center mb-8">
          <img src="https://placehold.co/100" alt="Logo" className="w-16 h-16" />
        </div>
        <form>
          <div className="mb-4">
            <label htmlFor="username" className="block text-zinc-700">
              Username
            </label>
            <input onChange={usuarioIngresado} type="text" id="username" name="username" className={inputClasses} />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-zinc-700">
              Password
            </label>
            <input onChange={claveIngresada} type="password" id="password" name="password" className={inputClasses} />
          </div>
          <button onClick={traer_datos} type="submit" className={buttonClasses}>
            Login
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login