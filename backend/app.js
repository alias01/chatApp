const io = require("socket.io")(8000);

const users = {};

io.on("connection", (socket) => {
  socket.on("new-user-joined", (userName) => {
    console.log("new user", userName);
    users[socket.id] = userName;
    socket.broadcast.emit("user-joined", userName);
  });

  socket.on("send-msg", (message) => {
    socket.broadcast.emit("recieve-msg", {
      userName: users[socket.id],
      message: message,
    });
  });
  socket.on("disconnect", () => {
    socket.broadcast.emit("left", users[socket.id]);
    delete users[socket.id];
  });
});
