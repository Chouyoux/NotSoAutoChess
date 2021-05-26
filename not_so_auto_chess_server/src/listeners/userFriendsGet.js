const Users = require('../controllers/users');
module.exports = function(socket) {

    socket.on('userFriendsGet', function(data, callback){ // {auth_key}

        if (!data.auth_key){
            callback({success:false, message:"Authenfitication failed."});
            return;
        }

        const _id = Users.authentifyAuthKey(data.auth_key);
        if (!_id){
            callback({success:false, message:"Authenfitication failed."});
            return;
        }

        let user = Users.getUserById(_id);

        let friends = [];
        for (let i = 0; i < user.friends.length; i++){

            let friend = Users.getUserById(user.friends[i]);
            let online = friend.isConnected();

            friends.push({pseudonym: friend.pseudonym, online: online});

        }

        callback({success:true, "friends" : friends});
  
    });

}