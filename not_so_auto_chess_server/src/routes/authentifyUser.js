const User = require("../database/user");

function makeid(length) {
    var result = [];
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result.push(characters.charAt(Math.floor(Math.random() * charactersLength)));
    }
    return result.join('');
}

module.exports = function(app){

    app.post("/authentify-user", async (req, res) => {

        if (!req.body) {
            res.status(400);
            res.send({"code" : 400, "message" : "No body provided."});
            return;
        }

        if (!req.body.auth_key) {

            if (!req.body.pseudonym) {
                res.status(400);
                res.send({"code" : 400, "message" : "No pseudonym provided."});
                return;
            }

            if (!req.body.password) {
                res.status(400);
                res.send({"code" : 400, "message" : "No password provided."});
                return;
            }

            const filter = { pseudonym: req.body.pseudonym, password: req.body.password };
            let users = await User.find(filter);
        
            if (users.length > 0){
                let auth_key = users[0]._id + makeid(32);
                const update = { auth_key: auth_key };

                await User.findOneAndUpdate(filter, update);
                res.status(200);
                res.send({"code" : 200, "auth_key": auth_key, "message" : "Hello " + req.body.pseudonym + ", come in."});
            }
            else {
                res.status(403);
                res.send({"code" : 403, "message" : "Username or password is incorrect."});
            }

        }

        else {

            const filter = { auth_key: req.body.auth_key };
            let users = await User.find(filter);
        
            if (users.length > 0){
                res.status(200);
                res.send({"code" : 200});
            }
            else {
                res.status(403);
                res.send({"code" : 403, "message" : "Authentification key is incorrect."});
            }

        }

    });
}