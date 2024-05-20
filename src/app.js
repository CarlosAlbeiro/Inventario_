//Exportamos las librerias necesarias para el funcionamiento
import express from "express";
import {config} from "dotenv";
import {usuarios}  from "./routes/usuarios.router.js";
import {grupoUsuarios}  from "./routes/grupoUsuarios.router.js";
import {productos}  from "./routes/productos.router.js";
import {categorias}  from "./routes/categorias.router.js";
import {proveedor}  from "./routes/proveedor.router.js";

//llamamos al objeto config para obtener las variables de entorno
config();

//Instanciamos express para inciar la aplicacion
const app = express();

// Middleware para analizar el cuerpo de la solicitud como JSON
app.use(express.json());

//Declaramos el puerto en el que trabajaremos
const puerto = process.env.PORT || 3000;

// Configuración para permitir cualquier origen (CORS)
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // Permite cualquier origen
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE"); // Métodos permitidos
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  ); // Encabezados permitidos
  next();
});

app.use(usuarios);
app.use(grupoUsuarios);
app.use(productos);
app.use(categorias);
app.use(proveedor);


app.listen(puerto, () => {
  console.log(`Servidor iniciado en: localhost:${puerto}`);
});