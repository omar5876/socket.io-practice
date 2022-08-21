const user = prompt("Escribe tu usuario");

const profes = ["RetaxMaster", "juandc", "GNDX"];

let socketNamepace, group;

const chat = document.querySelector("#chat");
const namespace = document.querySelector("#namespace");

if(profes.includes(user)){
    socketNamepace = io("/teachers");
    group = "teachers";
}
else {
    socketNamepace = io("/students");
    group = "students";

}

socketNamepace.on("connect", () => {
    namespace.textContent = group;
})


//programando la logica de mensajes

const sendMessage = document.querySelector("#sendMessage");

sendMessage.addEventListener("click", () => {
    const message = prompt("Escribe tu mensaje");

    socketNamepace.emit("send message", {
        user,
        message
    })
})


socketNamepace.on("message", messageData => {
    const {user, message} = messageData;

    const li = document.createElement("li");
    li.textContent = `${user} : ${message}`;

    chat.append(li);
})