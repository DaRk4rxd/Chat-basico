// server/server.js

// 1. Importación de módulos
const express = require('express');
const http = require('http');
const { Server } = require("socket.io");
const mongoose = require('mongoose');

// 2. Inicialización
const app = express();
const server = http.createServer(app);
const io = new Server(server);
app.use(express.static('../client'));

// --- Conexión a la Base de Datos (MongoDB) ---
mongoose.connect('mongodb+srv://Darkar:34AHTUSMvGyXIwfE@miservidorweb.fp8d2.mongodb.net/chat-basico?retryWrites=true&w=majority&appName=MiServidorWeb";', {
}).then(() => console.log('✅ Conectado a MongoDB'))
  .catch(err => console.error('❌ Error al conectar a MongoDB', err));

// --- Modelo de Datos para los Mensajes ---
const messageSchema = new mongoose.Schema({
    user: String,
    text: String,
    timestamp: { type: Date, default: Date.now }
});
const Message = mongoose.model('Message', messageSchema);

// 3. Lógica de Sockets para el Chat en Tiempo Real
io.on('connection', (socket) => {
    console.log('🔌 Un usuario se ha conectado');

    // Escucha el evento 'chat message' que viene del cliente
    socket.on('chat message', async (msg) => {
        console.log('Mensaje recibido:', msg);

        // Guardar el mensaje en la base de datos
        const message = new Message({
            user: msg.user,
            text: msg.text
        });
        try {
            await message.save();
            console.log('💾 Mensaje guardado en la DB');

            // Envía el mensaje a TODOS los clientes conectados
            io.emit('chat message', msg);
        } catch (error) {
            console.error('❌ Error al guardar el mensaje:', error);
        }
    });

    socket.on('disconnect', () => {
        console.log('👋 Un usuario se ha desconectado');
    });
});

// 4. Iniciar el servidor
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`🚀 Servidor escuchando en el puerto ${PORT}`);
});