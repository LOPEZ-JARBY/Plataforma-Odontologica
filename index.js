/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import {App_Odont} from './src/App_Odont';


AppRegistry.registerComponent(appName, () => App_Odont);


//*** 

// index.js
{/*const express = require('express');
const db = require('./db'); // Importa el módulo de conexión a la base de datos

const app = express();
const PORT = process.env.PORT || 8081; // Puerto en el que se ejecutará la API

// Ruta para obtener todos los datos de la tabla de ejemplo
app.get('/datos', (req, res) => {
  db.query('SELECT * FROM tbl_ms_roles', (error, results) => {
    if (error) {
      console.error('Error al ejecutar la consulta: ' + error);
      res.status(500).send('Error al obtener datos de la base de datos');
      return;
    }
    res.json(results); // Envía los resultados como respuesta
  });
});

// Ejecuta el servidor en el puerto especificado
app.listen(PORT, () => {
  console.log(`Servidor API escuchando en el puerto ${PORT}`);
});*/}



