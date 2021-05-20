const User = require("../database/user");

module.exports = function(app){

    app.post("/friend-user", async (req, res) => {

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

        if (!req.body.pseudonym && !req.body._id) {
            res.status(400);
            res.send({"code" : 400, "message" : "No pseudonym provided."});
            return;
        }

        const filter_origin = {auth_key: req.body.auth_key};
        let user_origin = await User.findOne(filter_origin);

        const filter_to_friend = {pseudonym: req.body.pseudonym};
        let user_to_friend = await User.findOne(filter_to_friend);
        
        if (user_to_friend._id in user_origin.friends){
            res.status(400);
            res.send({"code" : 400, "message" : "This user is already in your friend list."});
            return;
        }

        if (user_to_friend._id in user_origin.invitations_pending){
            res.status(400);
            res.send({"code" : 400, "message" : "An invitation is pending for this user."});
            return;
        }

        if (user_origin._id in user_to_friend.blocked){
            res.status(400);
            res.send({"code" : 400, "message" : "You can't add this user."});
            return;
        }

        const update = {"friends": [...user_origin.friends, user_to_block._id] }
        await User.findOneAndUpdate(filter_origin, update);
        
        res.status(200);
        res.send({"code" : 200, "message" : "An invitation has been sent to the user."});
    });
}