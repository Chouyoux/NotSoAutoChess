const User = require("../database/user");

module.exports = function(app){

    app.post("/get-user", async (req, res) =>{

        if (!req.body) {
          res.status(400);
          res.send({"code" : 400, "message" : "No body provided."});
          return;
        }
      
        if (!req.body.auth_key) {
          res.status(400);
          res.send({"code" : 400, "message" : "No authentification key provided."});
          return;
        }
      
        let users = await User.find({auth_key: req.body.auth_key});
      
        if (users.length > 0){
          res.status(200);
          res.send({"code" : 200, "pseudonym" : users[0].pseudonym, "email" : users[0].email});
          return;
        }
      
        else {
          res.status(403);
          res.send({"code" : 403, "message" : "Authentification failed."});
          return;
        }

    });
}