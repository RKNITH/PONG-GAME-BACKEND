let readyPlayerCount = 0;

function socketListen(io) {
    io.on("connection", (socket) => {
      let room
    console.log("A user is connected", socket.id);

    // Listener for starting the game & assigning the referee
    socket.on("ready", () => {
       room = "room" + Math.floor(readyPlayerCount / 2);
      socket.join(room);

      console.log("Player ready", socket.id, room);

      readyPlayerCount++;

      if (readyPlayerCount % 2 === 0) {
        io.in(room).emit("startGame", socket.id);
      }
    });

    // Listener for paddle movement
    socket.on("paddleMove", (paddleData) => {
      socket.to(room).emit("paddleMove", paddleData);
    });

    // Listener for ball move event
    socket.on("ballMove", (ballData) => {
      socket.to(room).emit("ballMove", ballData);
    });

    // Disconnect Event
    socket.on("disconnect", (reason) => {
        console.log(`Client ${socket.id} disconnected : ${reason}`);
        socket.leave(room)
    });
  });
}

export default socketListen;
