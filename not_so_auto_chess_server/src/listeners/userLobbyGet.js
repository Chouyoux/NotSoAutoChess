const Users = require('../controllers/users');
module.exports = function (socket) {

    socket.on('userLobbyGet', function (data, callback) { // {auth_key}

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

        let lobby = user.lobby;

        let lobby_players = [];
        for (let i = 0; i < lobby.players.length; i++) {

            let loop_player = lobby.players[i];
            let lobby_player = {};

            lobby_player["pseudonym"] = loop_player.pseudonym;
            lobby_player["avatar"] = loop_player.avatar;

            lobby_players.push({ pseudonym: loop_player.pseudonym, avatar: loop_player.avatar });

        }

        callback({ success: true, "lobby": lobby_players });

    });

}