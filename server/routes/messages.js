// server/routes/messages.js
import express from 'express';
import { Message } from '../models/Message.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const messages = await Message.find().sort({ timestamp: 1 }); // orden cronológico
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener los mensajes' });
  }
});

export default router;
