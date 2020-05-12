const path = require ('path');
const express = require ('express');
const app = express();

// settings
app.set('port', process.env.PORT || 3000); 
//STATIC FILES

console.log(path.join(__dirname , 'public'));
app.use(express.static(path.join(__dirname , 'public')));

//Start Server

const server = app.listen(app.get('port'),()=>{

    console.log('Servidor en puerto', app.get('port'));

});



//WEB sockets
const SocketIO = require ('socket.io');
const io = SocketIO(server);

io.on('connection', (socket) => {
    console.log('nuevo cliente conectado' , socket.id);

    socket.on('chat:message',(data)=>{//recive datos de cliente
        //console.log(data);
        io.sockets.emit('chat:message', data);//enviar datos a todos los clienteas
    });
    socket.on('chat:typing',(data)=>{//recive datos de cliente
        //console.log(data);
        socket.broadcast.emit('chat:typing', data);//enviar datos a todos los clienteas menos a el que lo envio
    });
} );//cuando se conecta un nuevo cleinte






//app.get('/',(req, res)=>res.send('Hello all'));


