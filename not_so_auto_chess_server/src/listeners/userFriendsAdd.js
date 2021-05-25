const Users = require('../controllers/users');
module.exports = function(socket) {

    socket.on('userFriendsAdd', function(data, callback){ // {auth_key, pseudonym}

        if (!data.auth_key){
            callback({success:false, message:"Authenfitication failed."});
            return;
        }

        const _id = Users.authentifyAuthKey(data.auth_key);
        if (!_id){
            callback({success:false, message:"Authenfitication failed."});
            return;
        }

        if (!data.pseudonym){
            callback({success:false, message:"Request body wrongly formatted."});
            return;
        }

        const user = Users.getUserById(_id);
        const friend = Users.getUserByPseudonym(data.pseudonym);

        if (!friend){
            callback({success:false, message:data.pseudonym+" doesn't exist."});
            return;
        }

        if (friend._id.toString() === user._id.toString()){
            callback({success:false, message:"You can't add yourself as a friend."});
            return;
        }

        if (user.hasPendingInvite(friend._id)){
            callback({success:false, message:"An invitation has already been sent to this user."});
            return;
        }

        if (user.hasReceivedInvite(friend._id)){
                
            user.removeReceivedInvite(friend._id);
            friend.removePendingInvite(user._id);
            friend.addFriend(user._id);
            user.addFriend(friend._id);
            if (friend.socket != null){
                friend.socket.emit("updateFriendsList");
            }
            callback({success:true, message:data.pseudonym+" has been added as friend."});
            return;

        }

        else {

            friend.addReceivedInvite(user._id);
            user.addPendingInvite(friend._id);
            if (friend.socket != null){
                friend.socket.emit("updateFriendsList");
            }
            callback({success:true, message:data.pseudonym+" has been sent an invitation."});
            return;

        }
  
    });

}