const User = require("../database/user");
const validateEmail = require("../utils/check_email");

module.exports = function(app){

    app.post("/update-user", async (req, res) =>{

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
      
        const filter = {auth_key: req.body.auth_key};
        let users = await User.find(filter);
      
        if (users.length > 0){

            const update = {};
            if (req.body.pseudonym !== "") {

                let pseudoUsers = await User.find({pseudonym: req.body.pseudonym});
      
                if (pseudoUsers.length > 0){
                    res.status(403);
                    res.send({"code" : 403, "message" : "Sorry, the pseudonym \"" + req.body.pseudonym + "\" is already taken."});
                    return;
                }

                update["pseudonym"] = req.body.pseudonym;

            } 
            if (req.body.email !== ""){
                
                emailUsers = await User.find({email: req.body.email});
            
                if (emailUsers.length > 0){
                    res.status(403);
                    res.send({"code" : 403, "message" : "Sorry, the email \"" + req.body.email + "\" is already taken."});
                    return;
                }
                if (!validateEmail(req.body.email)) {
                    res.status(403);
                    res.send({"code" : 403, "message" : "Incorrectly formatted email."});
                    return;
                }

                update["email"] = req.body.email;
            }
            if (req.body.password !== "") update["password"] = req.body.password;

            
        

            await User.findOneAndUpdate(filter, update);
        
            res.status(200);
            res.send({"code" : 200, "message" : "Profile updated."});
            return;
        }
      
        else {
            res.status(403);
            res.send({"code" : 403, "message" : "Authentification failed."});
            return;
        }

    });
}