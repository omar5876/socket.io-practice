const express = require("express");
const path = require("path");
const { createServer } = require("http");
const { Server } = require("socket.io");


const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

app.use(express.static(path.join(__dirname, "views")));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});
//middleware de autenticacion, para saber si puede pasar o no
io.use((socket, next) => {
  const token  = socket.handshake.auth.token;
  if(token === "MR.SATAN"){   //si el token es igual, puede continuar
    next()
  }
  else{
    const error = new Error("No esta autorizado")
    error.data = {
      details: 'No pudiste ser autenticado'
    }

    next(error);
  }
})

io.on("connection", (socket) => {
  console.log(socket.id)
});

httpServer.listen(3000, () => {
  console.log("Running on port 3000");
});



