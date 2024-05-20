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
    conexion.query("SELECT * FROM productos", (err, results) => {
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
  const {referencia,cantidad,precio_Compra,precio_Venta,ID_categoria,ID_proveedor} = req.body;
  try {
    conexion.query(
      "INSERT INTO productos (referencia,cantidad,precio_Compra,precio_Venta,ID_categoria,ID_proveedor) VALUES (?,?,?,?,?,?,NOW(),?)",
      [referencia,cantidad,precio_Compra,precio_Venta,ID_categoria,ID_proveedor,true],
      (err, result) => {
        if (err) {
          console.error("Error al insertar el nuevo producto:", err);
          res.status(500).json({error: "Error al insertar el nuevo producto"});
          return;
        }

        console.log("ID del producto nuevo insertado:", result.insertId);
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
  const {referencia,cantidad,precio_Compra,precio_Venta,ID_categoria,ID_proveedor} = req.body;
  try {
    conexion.query(
      "UPDATE productos SET referencia = ? , cantidad = ?,precio_Compra = ? , precio_Venta = ?,ID_categoria = ? , ID_proveedor = ? WHERE ID_producto = ?",
      [referencia,cantidad,precio_Compra,precio_Venta,ID_categoria,ID_proveedor],
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

// Deshabilitar productos
productos.post("/deshabilitarProductos", async (req, res) => {
  const {id_Categoria} = req.body;
  try {
    conexion.query(
      "UPDATE productos SET estado = ? WHERE ID_producto = ?",
      [false, id_Categoria],
      (err, result) => {
        if (err) {
          console.error("Error al deshabilitar el producto:", err);
          res.status(500).json({error: "Error al deshabilitar el prodcuto"});
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
      "DELETE FROM productos WHERE ID_producto = ?",
      [id_Categoria],
      (err, result) => {
        if (err) {
          console.error("Error al eliminar el producto:", err);
          res.status(500).json({error: "Error al eliminar el producto"});
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