const Users = require('../controllers/users');
module.exports = function (socket) {

    socket.on('userChatGetMsgList', function (data, callback) { // {auth_key}

        if (!data.auth_key) {
            callback({ success: false, message: "Authentification failed." });
            return;
        }

        const _id = Users.authentifyAuthKey(data.auth_key);
        if (!_id) {
            callback({ success: false, message: "Authentification failed." });
            return;
        }

        const user = Users.getUserById(_id);

        if (user) {

            callback({ success: true, msg_list: user.msg_list });

        }
        callback({ success: false, message: "Something went wrong with the request." });

    });

}