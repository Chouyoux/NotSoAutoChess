const Users = require('../controllers/users');
module.exports = function (socket) {

    socket.on('userLobbyInvite', function (data, callback) { // {auth_key, invited_pseudonym}

        if (!data.auth_key) {
            callback({ success: false, message: "Authentification failed." });
            return;
        }

        const _id = Users.authentifyAuthKey(data.auth_key);
        if (!_id) {
            callback({ success: false, message: "Authentification failed." });
            return;
        }

        if (!data.invited_pseudonym) {
            callback({ success: false, message: "Request body wrongly formatted." });
            return;
        }

        let user = Users.getUserById(_id);

        let invited = Users.getUserByPseudonym(data.invited_pseudonym);
        if (!invited) {
            callback({ success: false, message: "Invited pseudonym is invalid." });
            return;
        }

        if (!user.hasFriend(invited._id)) {
            callback({ success: false, message: "Invited player is not in your friendlist." });
            return;
        }

        try {
            user.lobby.invite(invited);
        }
        catch (e) {
            callback({ success: false, message: e });
            return;
        }

        invited.sendLobbyInvite(user.pseudonym);
        callback({ success: true, message: "Invitation sent." });

    });

}