const User = require("../database/user");
const validateEmail = require("../utils/validateEmail");

module.exports = function(app){

    app.post("/add-user", async (req, res) =>{

        if (!req.body) {
          res.status(400);
          res.send({"code" : 400, "message" : "No body provided."});
          return;
        }
      
        if (!req.body.pseudonym) {
          res.status(400);
          res.send({"code" : 400, "message" : "No pseudonym provided."});
          return;
        }
      
        if (!req.body.email) {
          res.status(400);
          res.send({"code" : 400, "message" : "No email provided."});
          return;
        }
      
        if (!req.body.password1) {
          res.status(400);
          res.send({"code" : 400, "message" : "No password1 provided."});
          return;
        }
      
        if (!req.body.password2) {
          res.status(400);
          res.send({"code" : 400, "message" : "No password2 provided."});
          return;
        }
      
        if (req.body.pseudonym.length < 3 || req.body.pseudonym.length > 16){
          res.status(403);
          res.send({"code" : 403, "message" : "Pseudonym's length should be between 3 and 16 characters."});
          return;
        }
      
        if (req.body.password1.length < 3 || req.body.password1.length > 64){
          res.status(403);
          res.send({"code" : 403, "message" : "Password's length should be between 3 and 64 characters."});
          return;
        }
      
        if (req.body.password1 !== req.body.password2){
          res.status(403);
          res.send({"code" : 403, "message" : "Passwords don't match."});
          return;
        }

        if (!validateEmail(req.body.email)) {
          res.status(403);
          res.send({"code" : 403, "message" : "Incorrectly formatted email."});
          return;

        }
      
        let users = await User.find({pseudonym: req.body.pseudonym});
      
        if (users.length > 0){
          res.status(403);
          res.send({"code" : 403, "message" : "Sorry, the pseudonym \"" + req.body.pseudonym + "\" is already taken."});
          return;
        }
      
        users = await User.find({email: req.body.email});
      
        if (users.length > 0){
          res.status(403);
          res.send({"code" : 403, "message" : "Sorry, the email \"" + req.body.email + "\" is already taken."});
          return;
        }
      
        const user = new User({
          pseudonym: req.body.pseudonym,
          email: req.body.email,
          password: req.body.password1
        });
        
        user.save()
          .then((result) => {
            res.status(201);
            res.send({"code" : 201, "message" : req.body.pseudonym + " has been registered !"});
            console.log(req.body.pseudonym + " (" + req.body.email + ") just created an account.")
          })
          .catch((err) => console.log(err));

    });
}