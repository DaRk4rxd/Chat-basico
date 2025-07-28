import { Message } from '../models/Message.js';

export const chatHandler = (io) => {
  io.on('connection', (socket) => {
    console.log('🔌 Un usuario se ha conectado');

    socket.on('chat message', async (msg) => {
      console.log('Mensaje recibido:', msg);

      const message = new Message({
        user: msg.user,
        text: msg.text
      });

      try {
        await message.save();
        console.log('💾 Mensaje guardado en la DB');
        io.emit('chat message', msg);
      } catch (error) {
        console.error('❌ Error al guardar el mensaje:', error);
      }
    });

    socket.on('disconnect', () => {
      console.log('👋 Un usuario se ha desconectado');
    });
  });
};
