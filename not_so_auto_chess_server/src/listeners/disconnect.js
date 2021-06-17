const Users = require('../controllers/users');

module.exports = function (socket) {

    socket.on('disconnect', function () {


        const user = Users.getUserBySocket(socket);

        if (user) {

            user.socket = null;

            let online_friends = Users.getOnlineFriends(_id);
            for (var i = 0; i < online_friends.length; i++) {
                let online_friend = online_friends[i];
                online_friend.updateFriendList();
            }
            user.lobby.removePlayer(user);

        }


    });

}