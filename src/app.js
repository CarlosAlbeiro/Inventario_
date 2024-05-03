//Exportamos las librerias necesarias para el funcionamiento
import express from "express";
import {config} from "dotenv";
import {conexion} from "./conexion.js";
import {usuarios}  from "./routes/usuarios.router.js";
import {grupoUsuarios}  from "./routes/grupoUsuarios.router.js";

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
app.use(productos);

//Proveedores CRUD

// Crear proveedor
app.post("/crearProveedor", async (req, res) => {
  const {nombre_Proveedor, telefono, empresa} = req.body;
  try {
    conexion.query(
      "INSERT INTO proveedores (nombre_Proveedor, telefono, empresa, fecha_Creacion, estado) VALUES (?, ?, ?, NOW(), ?)",
      [nombre_Proveedor, telefono, empresa, true],
      (err, result) => {
        if (err) {
          console.error("Error al insertar el nuevo proveedor:", err);
          res.status(500).json({error: "Error al insertar el nuevo proveedor"});
          return;
        }

        console.log("ID del nuevo proveedor insertado:", result.insertId);
        res.json({message: "Inserción exitosa", insertId: result.insertId});
      }
    );
  } catch (error) {
    console.error("Error interno del servidor:", error);
    res.status(500).json({error: "Error interno del servidor"});
  }
});

// Actualizar proveedor
app.post("/actualizarProveedor", async (req, res) => {
  const {id_Proveedor, nombre_Proveedor, telefono, empresa} = req.body;
  try {
    conexion.query(
      "UPDATE proveedores SET nombre_Proveedor = ?, telefono = ?, empresa = ? WHERE ID_proveedor = ?",
      [nombre_Proveedor, telefono, empresa, id_Proveedor],
      (err, result) => {
        if (err) {
          console.error("Error al actualizar el proveedor:", err);
          res.status(500).json({error: "Error al actualizar el proveedor"});
          return;
        }

        console.log("Número de filas actualizadas:", result.affectedRows);
        res.json({
          message: "Actualización exitosa",
          affectedRows: result.affectedRows,
        });
      }
    );
  } catch (error) {
    console.error("Error interno del servidor:", error);
    res.status(500).json({error: "Error interno del servidor"});
  }
});

// Deshabilitar proveedor
app.post("/deshabilitarProveedor", async (req, res) => {
  const {id_Proveedor} = req.body;
  try {
    conexion.query(
      "UPDATE proveedores SET estado = ? WHERE ID_proveedor = ?",
      [false, id_Proveedor],
      (err, result) => {
        if (err) {
          console.error("Error al deshabilitar el proveedor:", err);
          res.status(500).json({error: "Error al deshabilitar el proveedor"});
          return;
        }

        console.log("Número de filas actualizadas:", result.affectedRows);
        res.json({
          message: "Deshabilitación exitosa",
          affectedRows: result.affectedRows,
        });
      }
    );
  } catch (error) {
    console.error("Error interno del servidor:", error);
    res.status(500).json({error: "Error interno del servidor"});
  }
});

// Eliminar proveedor
app.post("/eliminarProveedor", async (req, res) => {
  const {id_Proveedor} = req.body;
  try {
    conexion.query(
      "DELETE FROM proveedores WHERE ID_proveedor = ?",
      [id_Proveedor],
      (err, result) => {
        if (err) {
          console.error("Error al eliminar el proveedor:", err);
          res.status(500).json({error: "Error al eliminar el proveedor"});
          return;
        }

        console.log("Número de filas eliminadas:", result.affectedRows);
        res.json({
          message: "Eliminación exitosa",
          affectedRows: result.affectedRows,
        });
      }
    );
  } catch (error) {
    console.error("Error interno del servidor:", error);
    res.status(500).json({error: "Error interno del servidor"});
  }
});

app.listen(puerto, () => {
  console.log(`Servidor iniciado en: localhost:${puerto}`);
});