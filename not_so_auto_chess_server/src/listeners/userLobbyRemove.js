const Users = require('../controllers/users');
module.exports = function (socket) {

    socket.on('userLobbyRemove', function (data, callback) { // {auth_key, removed_pseudonym}

        if (!data.auth_key) {
            callback({ success: false, message: "Authentification failed." });
            return;
        }

        const _id = Users.authentifyAuthKey(data.auth_key);
        if (!_id) {
            callback({ success: false, message: "Authentification failed." });
            return;
        }

        if (!data.removed_pseudonym) {
            callback({ success: false, message: "Request body wrongly formatted." });
            return;
        }

        let user = Users.getUserById(_id);

        let removed = Users.getUserByPseudonym(data.removed_pseudonym);
        if (!removed) {
            callback({ success: false, message: "Removed pseudonym is invalid." });
            return;
        }

        try {
            user.lobby.requestPlayerRemoval(user, removed);
        }
        catch (e) {
            callback({ success: false, message: e });
            return;
        }

        callback({ success: true, message: "Player removed." });

    });

}