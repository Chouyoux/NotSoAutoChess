const Users = require('../controllers/users');
    
module.exports = function(socket) {

    socket.on('userGet', function(data, callback){ // {auth_key}

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

        callback({success:true, "pseudonym" : user.pseudonym, "email" : user.email, "avatar" : user.avatar, "set" : user.set});
  
    });

}