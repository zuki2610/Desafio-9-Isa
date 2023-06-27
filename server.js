const express = require('express');
require('dotenv').config();
const cors = require('cors');
const routes = require('./src/routes/routes');
const reportMiddleware  = require('./src/middlewares/report');
const databaseMiddleware = require('./src/middlewares/databasereport');

const app = express();
app.use(cors());
app.use(express.json());

//Middleware que determina determina si hay conexión a la base de datos y entrega un reporte de solicitudes.
app.use(reportMiddleware);
app.use(databaseMiddleware);
// Inicia el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log('Servidor iniciado en http://localhost:' + PORT);
});

app.use('/', routes);

// ruta default
app.get('/', (req, res) => {
    res.send('Web inicial');
});

app.use("*", (req, res) => {
    res.status(404).json({ message: "La ruta que intenta consultar no existe" })
})

module.exports = app;