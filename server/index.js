import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import { connectDB } from './config/db.js';
import { chatHandler } from './sockets/chat.js';
import messageRoutes from './routes/messages.js';
import 'dotenv/config'; 

// Inicialización
const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Conectar a MongoDB
await connectDB();

// Servir frontend estático
app.use(express.static('../client'));

app.use('/api/messages', messageRoutes);

// Lógica de sockets
chatHandler(io);

// Iniciar servidor
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`🚀 Servidor escuchando en el puerto ${PORT}`);
});
