const Users = require('../controllers/users');

module.exports = function (socket) {

    socket.on('userGameMove', function (data, callback) { // {auth_key, move}

        if (!data.auth_key) {
            callback({ success: false, message: "Authentification failed." });
            return;
        }

        const _id = Users.authentifyAuthKey(data.auth_key);
        if (!_id) {
            callback({ success: false, message: "Authentification failed." });
            return;
        }

        if (!data.move) {
            callback({ success: false, message: "Request body wrongly formatted." });
            return;
        }

        let user = Users.getUserById(_id);

        let game = user.game;
        if (!game) {
            callback({ success: false, message: "You are not in game right now." });
            return;
        }

        try {
            game.chess_board.requestMove(user, data.move);
        }
        catch (e) {
            callback({ success: false, message: e });
        }
        
        callback({ success: true });

    });

}