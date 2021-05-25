module.exports = function(io) {
  io.on("disconnect", function(socket) {
    console.log("A client disconnected");
  });
};
