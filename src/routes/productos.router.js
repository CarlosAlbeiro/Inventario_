//Definimos uns constante, para poder usar todo del frame work express
import express from "express";
//Importamos la conexion
import {conexion} from "../conexion.js";
//Llamamos el metodo propio de express Router para poder declarar rutas y usarlas en el archivo principal
const productos = express.Router();

//Declaracion de rutina tipo get ('nombrede la ruta',async *respuesta asincrona*, (req,res *parametros de entreda y salida*) *Funcion flecha*)
//productos CRUD

// Listar productos
productos.get("/listarProductos", async (req, res) => {
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

// Crear productos
productos.post("/crearProductos", async (req, res) => {
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

// Actualizar productos
productos.post("/actualizarProductos", async (req, res) => {
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

// Deshabilitar productos
productos.post("/deshabilitarProductos", async (req, res) => {
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

// Eliminar productos
productos.post("/eliminarProductos", async (req, res) => {
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

export{productos}