const Users = require('../controllers/users');
module.exports = function (socket) {

    socket.on('userLobbyAccept', function (data, callback) { // {auth_key, inviter_pseudonym}

        if (!data.auth_key) {
            callback({ success: false, message: "Authentification failed." });
            return;
        }

        const _id = Users.authentifyAuthKey(data.auth_key);
        if (!_id) {
            callback({ success: false, message: "Authentification failed." });
            return;
        }

        if (!data.inviter_pseudonym) {
            callback({ success: false, message: "Request body wrongly formatted." });
            return;
        }

        let user = Users.getUserById(_id);

        let inviter = Users.getUserByPseudonym(data.inviter_pseudonym);
        if (!inviter) {
            callback({ success: false, message: "Inviter id is invalid." });
            return;
        }

        try {
            inviter.lobby.accept(user);
        }
        catch (e) {
            callback({ success: false, message: e });
            return;
        }

        callback({ success: true, message: "Invitation accepted." });

    });

}