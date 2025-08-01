import mongoose from 'mongoose';
import 'dotenv/config';    

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Conectado a MongoDB');
  } catch (err) {
    console.error('❌ Error al conectar a MongoDB', err);
    process.exit(1);
  } 
};
