const express  = require('express');
const path = require('path');
const {createServer} = require('http');
const {Server} = require('socket.io');

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

app.use(express.static(path.join(__dirname, "views")))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html')
})


io.on('connection', socket => {
    /* console.log("clientes conectados: " + io.engine.clientsCount)
    console.log(socket.id)

    socket.on('disconnect', () => console.log("el Socket ", socket.id, " se ha desconectado")) */
    socket.conn.once("upgrade", () => {
        console.log("Hemos pasado de HTTP-Long-Polling a " + socket.conn.transport.name)
    })
})

httpServer.listen(3000, () => {
    console.log('Running on port 3000')
})