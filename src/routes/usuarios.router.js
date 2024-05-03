//Definimos uns constante, para poder usar todo del frame work express
import express from "express";
//Importamos la conexion  
import {conexion} from "../conexion.js";
//Llamamos el metodo propio de express Router para poder declarar rutas y usarlas en el archivo principal
const usuarios = express.Router();

//Usuarios CRUD
usuarios.get("/listarUsuarios", async (req, res) => {
  try {
    //Respuesta tipo JSON para facilitar el traspaso de datos
    res.status(200).json({respuesta: "crear Usuarios"});
  } catch (error) {
    res.status(500).json({error: "Error del servidor"});
  }
});

usuarios.get("/crearUsuarios", async (req, res) => {
  try {
    //Respuesta tipo JSON para facilitar el traspaso de datos
    res.status(200).json({respuesta: "crear Usuarios"});
  } catch (error) {
    res.status(500).json({error: "Error del servidor"});
  }
});

usuarios.get("/actualizarUsuarios", async (req, res) => {
  try {
    //Respuesta tipo JSON para facilitar el traspaso de datos
    res.status(200).json({respuesta: "crear Usuarios"});
  } catch (error) {
    res.status(500).json({error: "Error del servidor"});
  }
});

usuarios.get("/eliminarUsuarios", async (req, res) => {
  try {
    //Respuesta tipo JSON para facilitar el traspaso de datos
    res.status(200).json({respuesta: "crear Usuarios"});
  } catch (error) {
    res.status(500).json({error: "Error del servidor"});
  }
});

export{usuarios}