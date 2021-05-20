// Express imports / parameters
var app = require("express")();
var http = require("http").createServer(app);
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var cors = require('cors');
app.use(cors());
const port = 3001;

// MongoBD imports / parameters
const mongoose = require("./database");

// Socket.io imports / parameters
const initListeners = require("./listeners");
var io = require("socket.io")(http);
initListeners(io);

app.get("/", function(req, res) {
  res.send("<h1>Welcome to Not So Auto Chess back-end services ! <3</h1>");
});

require('./routes/add_user')(app);
require('./routes/get_user')(app);
require('./routes/update_user')(app);
require('./routes/authentify_user')(app);

http.listen(port, function() {
  console.log("Server listening on *:"+port);
});