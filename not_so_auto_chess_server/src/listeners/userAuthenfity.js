const Users = require('../controllers/users');
const Lobby = require('../models/lobby');

module.exports = function (socket) {

    socket.on('userAuthenfity', function (data, callback) { // {auth_key}

        if (!data.auth_key) {
            callback({ success: false, message: "Request body wrongly formatted." });
        }

        const _id = Users.authentifyAuthKey(data.auth_key);
        if (_id) {
            const user = Users.getUserById(_id);
            if (user) {
                callback({ success: true, token: user.auth_key });
                return;
            }
        }

    callback({ success: false, message: "Something went wrong with the request." });

  });

}