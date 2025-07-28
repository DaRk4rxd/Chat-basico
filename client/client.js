// client/client.js

// 1. Conexión con el servidor de Sockets
const socket = io();

// 2. Referencias a los elementos del DOM
const form = document.getElementById('form');
const input = document.getElementById('input');
const messages = document.getElementById('messages');

// Simulación de un nombre de usuario. Más adelante, esto vendrá de un login.
const username = prompt("¿Cuál es tu nombre de usuario?");

// 3. Lógica para enviar mensajes
form.addEventListener('submit', (e) => {
    e.preventDefault(); // Evita que la página se recargue
    if (input.value) {
        // Creamos el objeto del mensaje
        const msg = {
            user: username,
            text: input.value
        };
        // Enviamos el mensaje al servidor a través del evento 'chat message'
        socket.emit('chat message', msg);
        input.value = ''; // Limpiamos el input
    }
});

// 4. Lógica para recibir mensajes
socket.on('chat message', (msg) => {
    const item = document.createElement('li');
    item.textContent = `${msg.user}: ${msg.text}`;
    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight); // Auto-scroll hacia abajo
});