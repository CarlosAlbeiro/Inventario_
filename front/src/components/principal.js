import React, {useState} from 'react'
import axios from 'axios'; //Permite hacer peticiones 

const buttonClasses = 'bg-blue-500 text-white p-2 rounded-lg m-2'
const containerClasses = 'container mx-auto p-4'
const flexClasses = 'flex flex-wrap justify-center items-center'
const tableClasses = 'w-full'
const cellClasses = 'border px-4 py-2'

const Button = ({ color, children, nombre}) => {
  const peticion=()=>{
    
  }
  return <button className={`${color} ${buttonClasses}`} id={nombre}  onClick={peticion()}>{children}</button>
}

const TableCell = ({ children }) => {
  return <td className={cellClasses}>{children}</td>
}

const TableRow = ({ id, name, quantity }) => {
  return (
    <tr>
      <TableCell>{id}</TableCell>
      <TableCell>{name}</TableCell>
      <TableCell>{quantity}</TableCell>
    </tr>
  )
}

const Table = () => {
  return (
    <table className={tableClasses}>
      <thead>
        <tr>
          <th className={cellClasses}>ID</th>
          <th className={cellClasses}>Nombre</th>
          <th className={cellClasses}>Cantidad</th>
        </tr>
      </thead>
      <tbody>
        <TableRow id="1" name="Producto A" quantity="10" />
        <TableRow id="2" name="Producto B" quantity="20" />
        <TableRow id="3" name="Producto C" quantity="15" />
      </tbody>
    </table>
  )
}


const ReactComponent = () => {
  const [tablas_bd, setTablas_bd] = useState([]);

  const tablas = async () => { //Funcion landa, anonima o flecha asincrona para hacer la peticiopn a la url del api en express
    // e.preventDefault(); // Previene la recarga de la página
    let botones=[];
    try { //Try para encampsular los posibles errores 
      const response = await axios.get('http://localhost:3500/tablas', { //Peticion hecha por medio de axios a la url del api
        // Puedes agregar params y headers aquí si es necesario
      });
      console.log("si sirvio");
      
      for (let i = 0; i < response.data.length; i++) {
        botones.push(response.data[i].Tables_in_sis_inventario);
      }
     
    } catch (error) { //Encapsulado del error 
      console.log("no sirvio");
      console.error(error);
      botones.push("Sin tablas");
    }

    setTablas_bd(botones);
  };
  
  tablas();


  console.log(tablas_bd);
 
  return (
    <div className={containerClasses}>
      <div className={flexClasses}>
        {tablas_bd.map((item, index) => (
          <Button key={index} color="bg-blue-500" nombre={item} >{item}</Button>
        ))}
      </div>
      <div className="max-w-md mx-auto mt-4 bg-white shadow-md rounded-lg overflow-hidden">
        <div className="px-4 py-2 bg-zinc-200">
          <h2 className="text-lg font-semibold">Tabla de Datos</h2>
        </div>
        <Table />
      </div>
    </div>
  )
}

export default ReactComponent
