import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://Darkar:34AHTUSMvGyXIwfE@miservidorweb.fp8d2.mongodb.net/chat-basico?retryWrites=true&w=majority&appName=MiServidorWeb');
    console.log('✅ Conectado a MongoDB');
  } catch (err) {
    console.error('❌ Error al conectar a MongoDB', err);
    process.exit(1);
  }
};
