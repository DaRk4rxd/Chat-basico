// client/client.js
const response = await fetch('/api/messages');
const historial = await response.json();

// 1. Conexión con el servidor de Sockets
const socket = io();


// Mostrar historial en la UI antes de usar Socket.IO

// 2. Referencias a los elementos del DOM
const form = document.getElementById('form');
const input = document.getElementById('input');
const messages = document.getElementById('messages');

// Simulación de un nombre de usuario. Más adelante, esto vendrá de un login.
const username = prompt("¿Cuál es tu nombre de usuario?");

historial.forEach(msg => renderMensaje(msg));

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
    renderMensaje(msg)
});


function renderMensaje(msg) {
  const li = document.createElement('li');
  li.textContent = `${msg.user}: ${msg.text}`;
  document.getElementById('messages').appendChild(li);
  window.scrollTo(0, document.body.scrollHeight);
}