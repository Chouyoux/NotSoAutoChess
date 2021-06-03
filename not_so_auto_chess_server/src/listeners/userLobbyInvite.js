const Users = require('../controllers/users');
module.exports = function (socket) {

    socket.on('userLobbyInvite', function (data, callback) { // {auth_key, invited_id}

        if (!data.auth_key) {
            callback({ success: false, message: "Authentification failed." });
            return;
        }

        const _id = Users.authentifyAuthKey(data.auth_key);
        if (!_id) {
            callback({ success: false, message: "Authentification failed." });
            return;
        }

        if (!data.invited_id) {
            callback({ success: false, message: "Request body wrongly formatted." });
            return;
        }

        let user = Users.getUserById(_id);

        let invited = Users.getUserById(data.invited_id);
        if (!invited) {
            callback({ success: false, message: "Invited id is invalid." });
            return;
        }

        try {
            user.lobby.invite(invited);
        }
        catch (e) {
            callback({ success: false, message: e });
            return;
        }

        callback({ success: true, message: "Invitation sent." });

    });

}