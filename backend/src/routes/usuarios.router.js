//Definimos uns constante, para poder usar todo del frame work express
import express from "express";
//Importamos la conexion
import {conexion} from "../conexion.js";
import bcrypt from "bcryptjs";
//Llamamos el metodo propio de express Router para poder declarar rutas y usarlas en el archivo principal
const usuarios = express.Router();

usuarios.get("/tablas", async (req, res) => {
  try {
    conexion.query("SHOW TABLES FROM sis_inventario", (err, results) => {
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

//Usuarios CRUD
usuarios.get("/listarUsuarios", async (req, res) => {
  try {
    conexion.query("SELECT * FROM usuarios", (err, results) => {
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

usuarios.post("/login", async (req, res) => {
  const {usuario, clave} = req.body;
  console.log("Usuario ->",usuario);
  console.log("Clave ->",clave);

  try {
    conexion.query(
      "SELECT clave,nombre FROM usuarios where usuario=?",
      [usuario],
      (err, results) => {
        if (err) {
          console.error("Error al ejecutar la consulta:", err);
          res.status(500).json({error: "Error al ejecutar la consulta"});
          return;
        }

        if (results.length > 0) {
          if(bcrypt.compare(clave, results[0].clave)){
            console.log("Resultados de la consulta: clave-> ", results[0].clave);
            res.json(results[0].nombre);
          }else{
            console.log("La claves no son iguales");
            res.status(404).json({message: "Las claves no coinciden"});
          }
          
        } else {
          console.log("No se encontraron resultados");
          res.status(404).json({message: "No se encontraron resultados"});
        }
      }
    );
  } catch (error) {
    console.error("Error interno del servidor:", error);
    res.status(500).json({error: "Error interno del servidor"});
  }
});

usuarios.post("/crearUsuario", async (req, res) => {
  const {nombre, usuario, clave, ID_grupo} = req.body;
  const clave_encriptada = await bcrypt.hash(clave, 10);

  try {
    conexion.query(
      "INSERT INTO usuarios (nombre, usuario, clave, ID_grupo, fecha_Creacion, estado) VALUES (?,?,?,?, NOW(), ?) ",
      [nombre, usuario, clave_encriptada, ID_grupo, true],
      (err, result) => {
        if (err) {
          console.error("Error al insertar crear el nuevo usuario:", err);
          res.status(500).json({error: "Error al insertar el nuevo usuario"});
          return;
        }

        console.log("ID del usuario creado:", result.insertId);
        res.json({message: "Inserción exitosa", insertId: result.insertId});
      }
    );
  } catch (error) {
    console.error("Error interno del servidor:", error);
    res.status(500).json({error: "Error interno del servidor"});
  }
});

usuarios.post("/actualizarUsuarios", async (req, res) => {
  const {nombre, usuario, clave, ID_grupo} = req.body;
  try {
    conexion.query(
      "UPDATE productos SET nombre = ? , usuario = ?,clave = ? , ID_grupo = ? WHERE ID_usuario = ?",
      [nombre, usuario, clave, ID_grupo],
      (err, result) => {
        if (err) {
          console.error("Error al actualizar el producto:", err);
          res.status(500).json({error: "Error al actualizar el producto"});
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

usuarios.post("/deshabilitarUsuaio", async () => {
  const {ID_usuario} = req.body;
  try {
    conexion.query(
      "UPDATE usuarios SET estado = ? WHERE ID_usuario = ?",
      [false, ID_usuario],
      (err, result) => {
        if (err) {
          console.error("Error al deshabilitar el usuario:", err);
          res.status(500).json({error: "Error al deshabilitar el usuario:"});
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

usuarios.post("/eliminarUsuarios", async (req, res) => {
  const {ID_usuario} = req.body;
  try {
    conexion.query(
      "DELETE FROM usuario WHERE ID_usuario = ?",
      [ID_usuario],
      (err, result) => {
        if (err) {
          console.error("Error al eliminar el usuario:", err);
          res.status(500).json({error: "Error al eliminar el usuario"});
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

export {usuarios};
