const Users = require('../controllers/users');
module.exports = function (socket) {

    socket.on('userInvitationsPendingGet', function (data, callback) { // {auth_key}

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

        let invitations = [];
        for (let i = 0; i < user.invitations_pending.length; i++) {

            let invitation = Users.getUserById(user.invitations_pending[i]);
            invitations.push(invitation.pseudonym);

        }

        callback({ success: true, "invitations": invitations });

    });

}