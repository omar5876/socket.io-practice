const express = require("express");
const path = require("path");
const { createServer } = require("http");
const { Server } = require("socket.io");
const { Socket } = require("dgram");

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

app.use(express.static(path.join(__dirname, "views")));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

const socketsOnline = [];

io.on("connection", (socket) => {
  //emision basica
  socket.emit("welcome", "Ahora estas conectado :)");

  socket.on("server", (data) => {
    console.log(data);
  });
  //emision a todos
  io.emit("everyone", socket.id + " se ha conectado");

  //emision a uno solo
  socketsOnline.push(socket.id);

  socket.on("last", (message) => {
    const lastSocket = socketsOnline[socketsOnline.length-1]
    io.to(lastSocket).emit("salute", message)
  });

  //on
  socket.emit("on", "se emite varias veces")
  socket.emit("on", "se emite varias veces")
  socket.emit("on", "se emite varias veces")

  //once
  socket.emit("once", "se emite una vez")
  socket.emit("once", "se emite una vez")
  socket.emit("once", "se emite una vez")

  //off
  socket.emit("off", "deja de emitirse")
  setTimeout(() => {
      
      socket.emit("off", "deja de emitirse")
  }, 4000)
});

httpServer.listen(3000, () => {
  console.log("Running on port 3000");
});



