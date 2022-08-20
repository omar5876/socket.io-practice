const socket = io();

const statusConnection = () => {
    console.log("Estado de conection: " + socket.connected)
}
socket.on('connect', () => {
    console.log("El socket " + socket.id + " se ha conectado uwu")
    statusConnection()
})

socket.on("connect_error", () => {
    console.log("No pude conectarme GOD :(" );
})

socket.on('disconnect', () => {
    console.log("El socket se ha desconectado ")
    statusConnection()
})

socket.io.on("reconnect_attempt", () => {
    console.log("Intentando reconectarme :|");
})


socket.io.on("reonnect", () => {
    console.log("Me logre reconectar :)");
})