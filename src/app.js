//Exportamos las librerias necesarias para el funcionamiento
import express from "express";
import {config} from "dotenv";
import mysql from "mysql";

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

// Configuración de la conexión a la base de datos
const conexion = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "123456",
  database: process.env.DB_DATABASE || "sis_inventario",
  port: process.env.DB_PORT || 3306,
});

// Conectar a la base de datos
conexion.connect((err) => {
  if (err) {
    console.error("Error de conexión a la base de datos:", err);
    return;
  }
  console.log("Conexión a la base de datos exitosa");
});

//Declaracion de rutina tipo get ('nombrede la ruta',async *respuesta asincrona*, (req,res *parametros de entreda y salida*) *Funcion flecha*)

//Grupo de usuarios CRUD
app.get("/listarGrupoUsuarios", async (req, res) => {
  try {
    // Realizar la consulta a la base de datos
    conexion.query("SELECT * FROM grupo_Usuarios", (err, results) => {
      if (err) {
        // En caso de error, mostrar un mensaje de error
        console.error("Error al ejecutar la consulta:", err);
        res.status(500).json({error: "Error al ejecutar la consulta"});
        return;
      }

      // Si la consulta se realizó correctamente, mostrar los resultados
      if (results.length > 0) {
        console.log("Resultados de la consulta:", results);
        res.json(results);
      } else {
        console.log("No se encontraron resultados");
        res.status(404).json({message: "No se encontraron resultados"});
      }
    });
  } catch (error) {
    // En caso de error interno, mostrar un mensaje de error
    console.error("Error interno del servidor:", error);
    res.status(500).json({error: "Error interno del servidor"});
  }
});

app.post("/crearGrupoUsuarios", async (req, res) => {
  const {nombre_Grupo} = req.body;
  // Inserción de un nuevo registro
  try {
    // Realiza la inserción en la base de datos
    conexion.query(
      "INSERT INTO grupo_Usuarios (nombre_Grupo, fecha_Creacion, estado) VALUES (?, NOW(), ?)",
      [nombre_Grupo, true],
      (err, result) => {
        if (err) {
          console.error("Error al insertar el nuevo grupo:", err);
          res.status(500).json({error: "Error al insertar el nuevo grupo"});
          return;
        }

        console.log("ID del nuevo grupo insertado:", result.insertId);
        res.json({message: "Inserción exitosa", insertId: result.insertId});
      }
    );
  } catch (error) {
    console.error("Error interno del servidor:", error);
    res.status(500).json({error: "Error interno del servidor"});
  }
});

app.post("/actualizarGrupoUsuarios", async (req, res) => {
  const {id_Grupo, nombre_Grupo} = req.body;
  // Actualización de un registro existente
  try {
    // Realiza la actualización en la base de datos
    conexion.query(
      "UPDATE grupo_Usuarios SET nombre_Grupo = ? WHERE ID_grupo = ?",
      [nombre_Grupo, id_Grupo],
      (err, result) => {
        if (err) {
          console.error("Error al actualizar el grupo:", err);
          res.status(500).json({error: "Error al actualizar el grupo"});
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

app.post("/dehabilitarGrupoUsuarios", async (req, res) => {
  const {id_Grupo} = req.body;
  // Actualización de un registro existente
  try {
    // Realiza la actualización en la base de datos
    conexion.query(
      "UPDATE grupo_Usuarios SET estado = ? WHERE ID_grupo = ?",
      [false, id_Grupo],
      (err, result) => {
        if (err) {
          console.error("Error al actualizar el grupo:", err);
          res.status(500).json({error: "Error al actualizar el grupo"});
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

app.post("/eliminarGrupoUsuarios", async (req, res) => {
  const {id_Grupo} = req.body;
  // Eliminación de un registro
  try {
    // Realiza la eliminación en la base de datos
    conexion.query(
      "DELETE FROM grupo_Usuarios WHERE ID_grupo = ?",
      [id_Grupo],
      (err, result) => {
        if (err) {
          console.error("Error al eliminar el grupo:", err);
          res.status(500).json({error: "Error al eliminar el grupo"});
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

//Usuarios CRUD
app.get("/listarUsuarios", async (req, res) => {
  try {
    //Respuesta tipo JSON para facilitar el traspaso de datos
    res.status(200).json({respuesta: "crear Usuarios"});
  } catch (error) {
    res.status(500).json({error: "Error del servidor"});
  }
});

app.get("/crearUsuarios", async (req, res) => {
  try {
    //Respuesta tipo JSON para facilitar el traspaso de datos
    res.status(200).json({respuesta: "crear Usuarios"});
  } catch (error) {
    res.status(500).json({error: "Error del servidor"});
  }
});

app.get("/actualizarUsuarios", async (req, res) => {
  try {
    //Respuesta tipo JSON para facilitar el traspaso de datos
    res.status(200).json({respuesta: "crear Usuarios"});
  } catch (error) {
    res.status(500).json({error: "Error del servidor"});
  }
});

app.get("/eliminarUsuarios", async (req, res) => {
  try {
    //Respuesta tipo JSON para facilitar el traspaso de datos
    res.status(200).json({respuesta: "crear Usuarios"});
  } catch (error) {
    res.status(500).json({error: "Error del servidor"});
  }
});

//Prodcutos CRUD
app.get("/listarProductos", async (req, res) => {
  try {
    //Respuesta tipo JSON para facilitar el traspaso de datos
    res.status(200).json({respuesta: "crear Productos"});
  } catch (error) {
    res.status(500).json({error: "Error del servidor"});
  }
});

app.get("/crearProductos", async (req, res) => {
  try {
    //Respuesta tipo JSON para facilitar el traspaso de datos
    res.status(200).json({respuesta: "crear Productos"});
  } catch (error) {
    res.status(500).json({error: "Error del servidor"});
  }
});

app.get("/actualizarProductos", async (req, res) => {
  try {
    //Respuesta tipo JSON para facilitar el traspaso de datos
    res.status(200).json({respuesta: "crear Productos"});
  } catch (error) {
    res.status(500).json({error: "Error del servidor"});
  }
});

app.get("/eliminarProductos", async (req, res) => {
  try {
    //Respuesta tipo JSON para facilitar el traspaso de datos
    res.status(200).json({respuesta: "crear Productos"});
  } catch (error) {
    res.status(500).json({error: "Error del servidor"});
  }
});

//Categorias CRUD

// Listar categorias
app.get("/listarCategorias", async (req, res) => {
  try {
    conexion.query("SELECT * FROM categorias", (err, results) => {
      if (err) {
        console.error("Error al ejecutar la consulta:", err);
        res.status(500).json({error: "Error al ejecutar la consulta"});
        return;
      }

      if (results.length > 0) {
        console.log("Resultados de la consulta:", results);
        res.json(results);
      } else {
        console.log("No se encontraron resultados");
        res.status(404).json({message: "No se encontraron resultados"});
      }
    });
  } catch (error) {
    console.error("Error interno del servidor:", error);
    res.status(500).json({error: "Error interno del servidor"});
  }
});

// Crear categoría
app.post("/crearCategoria", async (req, res) => {
  const {nombre_Categoria} = req.body;
  try {
    conexion.query(
      "INSERT INTO categorias (nombre_Categoria, fecha_Creacion, estado) VALUES (?, NOW(), ?)",
      [nombre_Categoria, true],
      (err, result) => {
        if (err) {
          console.error("Error al insertar la nueva categoría:", err);
          res.status(500).json({error: "Error al insertar la nueva categoría"});
          return;
        }

        console.log("ID de la nueva categoría insertada:", result.insertId);
        res.json({message: "Inserción exitosa", insertId: result.insertId});
      }
    );
  } catch (error) {
    console.error("Error interno del servidor:", error);
    res.status(500).json({error: "Error interno del servidor"});
  }
});

// Actualizar categoría
app.post("/actualizarCategoria", async (req, res) => {
  const {id_Categoria, nombre_Categoria} = req.body;
  try {
    conexion.query(
      "UPDATE categorias SET nombre_Categoria = ? WHERE ID_categoria = ?",
      [nombre_Categoria, id_Categoria],
      (err, result) => {
        if (err) {
          console.error("Error al actualizar la categoría:", err);
          res.status(500).json({error: "Error al actualizar la categoría"});
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

// Deshabilitar categoría
app.post("/deshabilitarCategoria", async (req, res) => {
  const {id_Categoria} = req.body;
  try {
    conexion.query(
      "UPDATE categorias SET estado = ? WHERE ID_categoria = ?",
      [false, id_Categoria],
      (err, result) => {
        if (err) {
          console.error("Error al deshabilitar la categoría:", err);
          res.status(500).json({error: "Error al deshabilitar la categoría"});
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

// Eliminar categoría
app.post("/eliminarCategoria", async (req, res) => {
  const {id_Categoria} = req.body;
  try {
    conexion.query(
      "DELETE FROM categorias WHERE ID_categoria = ?",
      [id_Categoria],
      (err, result) => {
        if (err) {
          console.error("Error al eliminar la categoría:", err);
          res.status(500).json({error: "Error al eliminar la categoría"});
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