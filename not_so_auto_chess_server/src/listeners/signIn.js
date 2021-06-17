const Users = require('../controllers/users');
const Lobby = require('../models/lobby');

module.exports = function (socket) {

  socket.on('signIn', function (data, callback) { // {pseudonym,password} || {auth_key}

    if ((!data.pseudonym || !data.password) && !data.auth_key) {
      callback({ success: false, message: "Request body wrongly formatted." });
    }

    if (data.pseudonym && data.password) {

      const user = Users.authenfityPseudonymePassword(data.pseudonym, data.password);
      if (user) {
        user.socket = this;

        let online_friends = Users.getOnlineFriends(user._id);
        for (var i = 0; i < online_friends.length; i++) {
          let online_friend = online_friends[i];
          online_friend.socket.emit("updateFriendsList");
        }

        if (!user.lobby) {
          user.lobby = new Lobby(user);
        }

        callback({ success: true, token: Users.getUserById(user._id).auth_key });
        return;
      }

    }

    if (data.auth_key) {

      const _id = Users.authentifyAuthKey(data.auth_key);
      if (_id) {
        const user = Users.getUserById(_id);
        user.socket = this;

        let online_friends = Users.getOnlineFriends(_id);
        for (var i = 0; i < online_friends.length; i++) {
          let online_friend = online_friends[i];
          online_friend.updateFriendList();
        }

        if (!user.lobby) {
          user.lobby = new Lobby(user);
        }

        callback({ success: true, token: user.auth_key });
        return;
      }

    }

    callback({ success: false, message: "Something went wrong with the request." });

  });

}