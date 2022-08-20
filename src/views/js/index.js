

const socket = io();



//se recibe el evento
socket.on("welcome", data => {
    console.log("info recibida: ", data)
    const text = document.querySelector("#text")
    text.textContent = data;
})

const boton = document.querySelector("#to-server")
boton.addEventListener("click", () => socket.emit("server", "Mensaje hacia el servidor, presionando el boton"))

socket.on("everyone", message => {
    console.log(socket.id + "se ha conectado usando io.emit, 'mensaje o todos: ---> " + message)
})


const botonLast = document.querySelector("#send-last")
botonLast.addEventListener("click", () => {
    socket.emit("last", "Hola has sido el ultimo en conectarte")
})


socket.on("salute", message => console.log(message))


//on

socket.on("on", () => console.log("ON se emite varias veces"))

//once
socket.once("once", () => console.log("ONCE se emita una vez"))

//off

const listenerOff = () => console.log("evento que se apaga despues de 2 segundos")

socket.on("off", listenerOff)

setTimeout(() => {
    socket.off("off", listenerOff)
}, 2000)