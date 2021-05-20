const User = require("../database/user");

module.exports = function(app){

    app.post("/block-user", async (req, res) => {

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

        if (!req.body.pseudonym) {
            res.status(400);
            res.send({"code" : 400, "message" : "No pseudonym provided."});
            return;
        }

        const filter_origin = {auth_key: req.body.auth_key};
        let user_origin = await User.findOne(filter_origin);

        const filter_to_block = {pseudonym: req.body.pseudonym};
        let user_to_block = await User.findOne(filter_to_block);
        
        if (user_to_block._id in user_origin.blocked){
            res.status(400);
            res.send({"code" : 400, "message" : "This user is already blocked."});
            return;
        }

        const update = {"blocked": [...user_origin.blocked, user_to_block._id] }
        await User.findOneAndUpdate(filter_origin, update);
        
        res.status(200);
        res.send({"code" : 200, "message" : "This user has been blocked."});
    });
}