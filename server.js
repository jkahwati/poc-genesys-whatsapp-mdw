const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');
const config = require('./config.js');
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Configuración de rutas
const routes = require('./routes/index');

// Middleware para servir archivos estáticos
app.use(express.static(path.join(__dirname, 'views')));

// Configuración del WebSocket
try {
    app.set('io', io);
    io.on('connection', socket => {
        console.log('Un cliente se ha conectado');
        
        // Manejar la desconexión del cliente
        socket.on('disconnect', () => {
            console.log('El cliente se ha desconectado');
        });
    });
} catch (error) {
    console.error("Error al establecer conexión con el cliente:", error);
}


const PREFIX = `/${config.API_NAME}/${config.API_ENV}/${config.API_VERSION}/`;

app.use(PREFIX, routes);

// Iniciamos el servidor
const PORT = process.env.PORT || config.PORT;
server.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
    console.log(`Path: ${PREFIX}`);
    console.log(process.env);
});

