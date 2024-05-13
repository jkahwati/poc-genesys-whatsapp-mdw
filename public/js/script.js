// Simulando mensajes
const messages = [
    { sender: "Lía", text: "Hola, ¿En que te puedo ayudar?" },
    // Más mensajes aquí...
];

const eventSource = new EventSource('/poc-genesys-whatsapp-mdw/dev/v1/webhook/whatsapp/sse');
eventSource.onmessage = function(event) {
    const messageInput = document.getElementById("message-input");
    const webhookData = JSON.parse(event.data);
    const messageText = webhookData.message
    if (messageText !== "") {
        messages.push({ sender: "Lia", text: messageText });
        displayMessages();
        messageInput.value = "";
    }
};


// Función para mostrar los mensajes en el chat
function displayMessages() {
    const chatMessages = document.getElementById("chat-messages");
    chatMessages.innerHTML = "";
    messages.forEach(message => {
        const messageElement = document.createElement("div");
        messageElement.textContent = `${message.sender}: ${message.text}`;
        chatMessages.appendChild(messageElement);
    });
}

// Función para enviar un mensaje
function sendMessage() {
    const messageInput = document.getElementById("message-input");
    const messageText = messageInput.value.trim();
    var mensaje = document.getElementById('message-input').value;

    // Realizar la llamada REST a la API POST
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:3000/poc-genesys-whatsapp-mdw/dev/v1/openmessaging/genesys', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    var data = {
        "type": "event_callback",
        "event": {
            "type": "message",
            "text": mensaje,
            "client_msg_id": "123",
            "user": "jeka"
        }
    };
    xhr.send(JSON.stringify(data));
    xhr.onload = function() {
        if (xhr.status === 200) {
            console.log('Mensaje enviado con éxito');
            // Aquí puedes realizar alguna acción adicional si es necesario
        } else {
            console.error('Error al enviar mensaje:', xhr.statusText);
            // Aquí puedes manejar el error de alguna manera
        }
    };
    xhr.onerror = function() {
        console.error('Error de red al enviar mensaje');
        // Aquí puedes manejar el error de red de alguna manera
    };
    if (messageText !== "") {
        messages.push({ sender: "Yo", text: messageText });
        displayMessages();
        messageInput.value = "";
    }
}

// Asignar eventos a los elementos
document.getElementById("send-button").addEventListener("click", sendMessage);

document.addEventListener("DOMContentLoaded", function() {
    const messageInput = document.getElementById("message-input");

    messageInput.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            // Verificar si el campo de entrada tiene algún valor
            if (messageInput.value.trim() !== "") {
                // Enviar el mensaje
                sendMessage();
            }
        }
    });
});


// Mostrar mensajes al cargar la página
displayMessages();
