
console.log("chat codigo");
const socket = io(); //Coneccion cliente - servidor
//DOM elements
let message = document.getElementById('messagge');
let username = document.getElementById('username');
let btn = document.getElementById('send');
let output = document.getElementById('output');
let actions = document.getElementById('actions');

btn.addEventListener('click', function () {
    socket.emit('chat:message', {
        message: message.value,
        username: username.value
        
    });
    document.getElementById("messagge").value = ""; //borrar mensaje en caja de mensaje
});

message.addEventListener('keypress', function () {
    socket.emit('chat:typing', username.value);
});

socket.on('chat:message', function (data) {
    actions.innerHTML=''; //borrar is typing en caja de mensajes
    console.log(data);
    output.innerHTML += `<p> 
    <strong>${data.username}</strong>: ${data.message}
    </p>`
});

socket.on('chat:typing', function (data) {
    actions.innerHTML = `<p> 
    <em>${data} is typing</em>
    </p>`
});

