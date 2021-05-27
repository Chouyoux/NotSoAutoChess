// Express imports / parameters

var does_https = true;

var app = require("express")();
var http = require('http');
var fs = require('fs');
var https = require('https');

if (does_https){
  var privateKey  = fs.readFileSync('/etc/letsencrypt/live/notsoautochess.com/privkey.pem', 'utf8');
  var certificate = fs.readFileSync('/etc/letsencrypt/live/notsoautochess.com/cert.pem', 'utf8');
  var credentials = {key: privateKey, cert: certificate};
  var httpsServer = https.createServer(credentials, app);
}

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var cors = require('cors');
app.use(cors());
var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);
const port = 3001;

// MongoBD imports / parameters
require("./database")
.then((result) => {
  console.log("Connected to Database !");

  // Socket.io imports / parameters
  var io = require("socket.io")(does_https ? httpsServer : httpServer, {
    cors: {
      origin: '*',
    }
  });
  require("./listeners")(io);
  
  app.get("/", function(req, res) {
    res.send("<h1>Welcome to Not So Auto Chess back-end services ! <3</h1>");
  });
  
  httpServer.listen(port, function() {
    console.log("Server listening http on *:"+port);
  });
  if (does_https){
    httpsServer.listen(port+1, function() {
      console.log("Server listening https on *:"+(port+1));
    });
  }
})
.catch((err) => console.log(err));
