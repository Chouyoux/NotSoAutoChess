const Users = require('../controllers/users');
module.exports = function (socket) {

    socket.on('userFriendsRemove', function (data, callback) { // {auth_key, pseudonym}

        if (!data.auth_key) {
            callback({ success: false, message: "Authentification failed." });
            return;
        }

        const _id = Users.authentifyAuthKey(data.auth_key);
        if (!_id) {
            callback({ success: false, message: "Authentification failed." });
            return;
        }

        if (!data.pseudonym) {
            callback({ success: false, message: "Request body wrongly formatted." });
            return;
        }

        const user = Users.getUserById(_id);
        const friend = Users.getUserByPseudonym(data.pseudonym);

        if (!friend) {
            callback({ success: false, message: data.pseudonym + " doesn't exist." });
            return;
        }

        if (friend._id.toString() === user._id.toString()) {
            callback({ success: false, message: "You can't remove yourself from your friends." });
            return;
        }

        if (user.hasPendingInvite(friend._id)) {

            user.removePendingInvite(friend._id);
            friend.removeReceivedInvite(user._id);

            if (friend.socket != null) {
                friend.socket.emit("updateFriendsList");
            }
            callback({ success: true, message: "Pending invitation was removed." });
            return;
        }

        if (user.hasReceivedInvite(friend._id)) {

            user.removeReceivedInvite(friend._id);
            friend.removePendingInvite(user._id);
            friend.updateFriendList();
            callback({ success: true, message: "Received invitation was removed." });
            return;

        }

        if (user.hasFriend(friend._id)) {

            friend.removeFriend(user._id);
            user.removeFriend(friend._id);
            friend.updateFriendList();
            callback({ success: true, message: data.pseudonym + " was removed from your friends." });
            return;

        }

        callback({ success: false, message: data.pseudonym + " is not in any of your lists." });
        return;

    });

}