//Definimos uns constante, para poder usar todo del frame work express
import express from "express";
//Importamos la conexion
import {conexion} from "../conexion.js";
//Llamamos el metodo propio de express Router para poder declarar rutas y usarlas en el archivo principal
const proveedor = express.Router();

//Proveedores CRUD

// Crear proveedor
proveedor.post("/crearProveedor", async (req, res) => {
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
proveedor.post("/actualizarProveedor", async (req, res) => {
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
proveedor.post("/deshabilitarProveedor", async (req, res) => {
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
proveedor.post("/eliminarProveedor", async (req, res) => {
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

export{proveedor}