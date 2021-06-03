const Users = require('../controllers/users');
const validateEmail = require("../utils/validateEmail");
    
module.exports = function(socket) {

    socket.on('userUpdate', function(data, callback){ // {auth_key, ?pseudonym, ?email, ?password, ?avatar, ?set}

        if (!data.auth_key){
            callback({success:false, message:"Authentification failed."});
            return;
        }

        const _id = Users.authentifyAuthKey(data.auth_key);
        if (!_id){
            callback({success:false, message:"Authentification failed."});
            return;
        }

        if (!data.pseudonym && !data.email && !data.password && !data.avatar && !data.set){
            callback({success:false, message:"Request body wrongly formatted."});
            return;
        }

        const user = Users.getUserById(_id);
        let new_pseudonym = user.pseudonym;
        let new_email = user.email;
        let new_password = user.password;
        let new_avatar = data.avatar != null ? data.avatar : user.avatar;
        let new_set = data.set != null ? data.set : user.set;

        if (data.pseudonym){
            if (Users.pseudonymIsUsed(data.pseudonym)){
                callback({success:false, "message" : "Sorry, the pseudonym \"" + data.pseudonym + "\" is already taken."});
                return;
            }
            if (data.pseudonym.length < 3 || data.pseudonym.length > 16){
                callback({success:false, "message" : "Pseudonym's length should be between 3 and 16 characters."});
                return;
            }
            new_pseudonym = data.pseudonym;
        }

        if (data.email){
            if (Users.emailIsUsed(data.email)){
                callback({success:false, "message" : "Sorry, the email \"" + data.email + "\" is already taken."});
                return;
            }
            if (!validateEmail(data.email)){
                callback({success:false, "message" : "Incorrectly formatted email."});
                return;
            }
            new_email = data.email;
        }

        if (data.password){
            if (data.password.length < 3 || data.password.length > 64){
                callback({success:false, "message" : "Password's length should be between 3 and 64 characters."});
                return;
            }
            new_password = data.password;
        }

        user.pseudonym = new_pseudonym;
        user.email = new_email;
        user.password = new_password;
        user.avatar = new_avatar;
        user.set = new_set;

        let online_friends = Users.getOnlineFriends(_id);
        for (var i = 0; i < online_friends.length; i++){
            let online_friend = online_friends[i];
            online_friend.socket.emit("updateFriendsList");
        }

        callback({success:true, "message" : "Profile updated."});
  
    });

}