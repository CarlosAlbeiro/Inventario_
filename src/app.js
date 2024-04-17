//Exportamos las librerias necesarias para el funcionamiento
import express from "express";
import {config} from "dotenv";

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

//Declaracion de rutina tipo get ('nombrede la ruta',async *respuesta asincrona*, (req,res *parametros de entreda y salida*) *Funcion flecha*)

//Grupo de usuarios CRUD
app.get("/listarGrupoUsuarios", async (req, res) => {
  try {
    //Respuesta tipo JSON para facilitar el traspaso de datos
    res.status(200).json({respuesta: "crear Grupo Usuarios"});
  } catch (error) {
    res.status(500).json({error: "Error del servidor"});
  }
});

app.get("/crearGrupoUsuarios", async (req, res) => {
  try {
    //Respuesta tipo JSON para facilitar el traspaso de datos
    res.status(200).json({respuesta: "crear Grupo Usuarios"});
  } catch (error) {
    res.status(500).json({error: "Error del servidor"});
  }
});

app.get("/actualizarGrupoUsuarios", async (req, res) => {
  try {
    //Respuesta tipo JSON para facilitar el traspaso de datos
    res.status(200).json({respuesta: "crear Grupo Usuarios"});
  } catch (error) {
    res.status(500).json({error: "Error del servidor"});
  }
});

app.get("/eliminarGrupoUsuarios", async (req, res) => {
  try {
    //Respuesta tipo JSON para facilitar el traspaso de datos
    res.status(200).json({respuesta: "crear Grupo Usuarios"});
  } catch (error) {
    res.status(500).json({error: "Error del servidor"});
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
app.get("/listarCategorias", async (req, res) => {
  try {
    //Respuesta tipo JSON para facilitar el traspaso de datos
    res.status(200).json({respuesta: "crear Categorias"});
  } catch (error) {
    res.status(500).json({error: "Error del servidor"});
  }
});

app.get("/crearCategorias", async (req, res) => {
  try {
    //Respuesta tipo JSON para facilitar el traspaso de datos
    res.status(200).json({respuesta: "crear Categorias"});
  } catch (error) {
    res.status(500).json({error: "Error del servidor"});
  }
});

app.get("/actualizarCategorias", async (req, res) => {
  try {
    //Respuesta tipo JSON para facilitar el traspaso de datos
    res.status(200).json({respuesta: "crear Categorias"});
  } catch (error) {
    res.status(500).json({error: "Error del servidor"});
  }
});

app.get("/eliminarCategorias", async (req, res) => {
  try {
    //Respuesta tipo JSON para facilitar el traspaso de datos
    res.status(200).json({respuesta: "crear Categorias"});
  } catch (error) {
    res.status(500).json({error: "Error del servidor"});
  }
});

//Proveedores CRUD
app.get("/listarProveedores", async (req, res) => {
  try {
    //Respuesta tipo JSON para facilitar el traspaso de datos
    res.status(200).json({respuesta: "crear Proveedores"});
  } catch (error) {
    res.status(500).json({error: "Error del servidor"});
  }
});

app.get("/crearProveedores", async (req, res) => {
  try {
    //Respuesta tipo JSON para facilitar el traspaso de datos
    res.status(200).json({respuesta: "crear Proveedores"});
  } catch (error) {
    res.status(500).json({error: "Error del servidor"});
  }
});

app.get("/actualizarProveedores", async (req, res) => {
  try {
    //Respuesta tipo JSON para facilitar el traspaso de datos
    res.status(200).json({respuesta: "crear Proveedores"});
  } catch (error) {
    res.status(500).json({error: "Error del servidor"});
  }
});

app.get("/eliminarProveedores", async (req, res) => {
  try {
    //Respuesta tipo JSON para facilitar el traspaso de datos
    res.status(200).json({respuesta: "crear Proveedores"});
  } catch (error) {
    res.status(500).json({error: "Error del servidor"});
  }
});





app.get("/lista_regalos", async (req, res) => {
  try {
    // Realiza la inserción en la base de datos
    const [result] = await pool.query("SELECT * FROM regalos");

    if (result.length > 0) {
      res.json(result);
    } else {
      res.status(500).json({error: "Sin regalos"});
    }
  } catch (error) {
    res.status(500).json({error: "Error interno del servidor"});
  }
});

app.post("/eliminar_regalo", async (req, res) => {
  const {id} = req.body;
  try {
    // Obtén los parámetros de la URL
    console.log("Id->", id);

    // Verifica que todos los parámetros necesarios estén presentes
    if (!id) {
      return res.status(400).json({error: "Faltan parámetros requeridos"});
    }

    // Realiza la inserción en la base de datos
    const [result] = await pool.query("DELETE FROM regalos WHERE id=?", [id]);

    if (result) {
      res.json(result);
    } else {
      res.status(500).json({error: "Error al validar"});
    }
    // Devuelve el resultado de la inserción
  } catch (error) {
    res.status(500).json({error: "Error interno del servidor-> " + error});
  }
});

app.post("/crear_regalo", async (req, res) => {
  const {usuario, producto, descripcion, link, imagen} = req.body;
  try {
    // Obtén los parámetros de la URL
    console.log("Usuario->", usuario);
    console.log("producto->", producto);
    console.log("descripcion->", descripcion);
    console.log("link->", link);
    console.log("imagen->", imagen);
    // Verifica que todos los parámetros necesarios estén presentes
    if (!usuario || !producto) {
      return res.status(400).json({error: "Faltan parámetros requeridos"});
    }

    // Realiza la inserción en la base de datos
    const [result] = await pool.query(
      "INSERT INTO regalos(usuarios, producto, descripcion, link, imagen) VALUES (?,?,?,?,?)",
      [usuario, producto, descripcion, link, imagen]
    );

    if (result) {
      res.json(result);
    } else {
      res.status(500).json({error: "Error al validar"});
    }
    // Devuelve el resultado de la inserción
  } catch (error) {
    res.status(500).json({error: "Error interno del servidor" + error});
  }
});

app.listen(puerto, () => {
  console.log(`Servidor iniciado en: ${puerto}`);
});
