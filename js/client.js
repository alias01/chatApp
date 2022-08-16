const socket = io("http://localhost:8000");

const form = document.getElementById("send-container");
const messageInput = document.getElementById("messageInp");
const messageContainer = document.querySelector(".chatContainer");

const append = (message, position) => {
  const messageElement = document.createElement("div");
  messageElement.innerText = message;
  messageElement.classList.add("chat");
  messageElement.classList.add(position);
  messageContainer.append(messageElement);
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = messageInput.value;
  append(`You:${message}`, "chat-right");
  socket.emit("send-msg", message);
});

const userName = prompt("Enter your name?");
socket.emit("new-user-joined", userName);

socket.on("user-joined", (userName) => {
  console.log("in client ", userName);
  append(`${userName} has joined the chat`, "chat-right");
});

socket.on("recieve-msg", (data) => {
  append(`${data.userName}:${data.message}`, "chat-left");
});

socket.on("left", (userName) => {
  append(`${userName} has left the chat`, "chat-right");
});
