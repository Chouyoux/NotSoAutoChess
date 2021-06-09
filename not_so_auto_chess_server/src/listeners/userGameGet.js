const Users = require('../controllers/users');
    
module.exports = function(socket) {

    socket.on('userGameGet', function(data, callback){ // {auth_key}

        if (!data.auth_key){
          callback({success:false, message:"Authentification failed."});
          return;
        }

        const _id = Users.authentifyAuthKey(data.auth_key);
        if (!_id){
            callback({success:false, message:"Authentification failed."});
            return;
        }

        let user = Users.getUserById(_id);

        let game = user.game;
        if (!game){
            callback({success:false, message:"You are not in game right now."});
            return;
        }

        callback({success:true, ...game.getState()});
  
    });

}