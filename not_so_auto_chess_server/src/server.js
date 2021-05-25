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
require("./database")
.then((result) => {
  console.log("Connected to Database !");

  // Socket.io imports / parameters
  var io = require("socket.io")(http, {
    cors: {
      origin: '*',
    }
  });
  require("./listeners")(io);
  
  app.get("/", function(req, res) {
    res.send("<h1>Welcome to Not So Auto Chess back-end services ! <3</h1>");
  });
  
  require('./routes')(app);
  
  http.listen(port, function() {
    console.log("Server listening on *:"+port);
  });
})
.catch((err) => console.log(err));
