const Users = require('../controllers/users');
const MatchMaking = require('../controllers/matchmaking');

module.exports = function (socket) {

    socket.on('userMatchmakingLeave', function (data, callback) { // {auth_key}

        if (!data.auth_key) {
            callback({ success: false, message: "Authentification failed." });
            return;
        }

        const _id = Users.authentifyAuthKey(data.auth_key);
        if (!_id) {
            callback({ success: false, message: "Authentification failed." });
            return;
        }

        let user = Users.getUserById(_id);

        try {
            MatchMaking.requestRemoveLobbyFromQueue(user);
        }
        catch (e) {
            console.log(e);
            callback({ success: false, message: e });
        }

        callback({ success: true });

    });

}