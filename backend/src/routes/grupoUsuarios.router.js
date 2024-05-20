//Definimos uns constante, para poder usar todo del frame work express
import express from "express";
//Importamos la conexion
import {conexion} from "../conexion.js";
//Llamamos el metodo propio de express Router para poder declarar rutas y usarlas en el archivo principal
const grupoUsuarios = express.Router();

//Declaracion de rutina tipo get ('nombrede la ruta',async *respuesta asincrona*, (req,res *parametros de entreda y salida*) *Funcion flecha*)

//Grupo de usuarios CRUD
grupoUsuarios.get("/listarGrupoUsuarios", async (req, res) => {
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

grupoUsuarios.post("/crearGrupoUsuarios", async (req, res) => {
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

grupoUsuarios.post("/actualizarGrupoUsuarios", async (req, res) => {
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

grupoUsuarios.post("/dehabilitarGrupoUsuarios", async (req, res) => {
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

grupoUsuarios.post("/eliminarGrupoUsuarios", async (req, res) => {
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

export{grupoUsuarios}