const http = require('http');
const app = require('./src/app');

// Configuración de variables de entorno
require('dotenv').config();

// Config DB
require('./src/config/db');

const server = http.createServer(app);

// Puerto del servidor
const PORT = process.env.PORT || 3000;

server.listen(PORT);

// Listeners
server.on('listening', () => {
    console.log(`Servidor escuchando en puerto ${PORT}`);
});

server.on('error', (error) => {
    console.log(error);
});