const Users = require('../controllers/users');
    
module.exports = function(socket) {

    socket.on('signOut', function(data){

        let _id = Users.authentifyAuthKey(data.auth_key);

        if (_id){

            const user = Users.getUserById(_id);

            if (user){
                
                user.socket = null;
    
                let online_friends = Users.getOnlineFriends(_id);
                for (var i = 0; i < online_friends.length; i++){
                  let online_friend = online_friends[i];
                  online_friend.updateFriendList();
                }
                user.lobby.removePlayer(user);

            }

        }
  
    });

}