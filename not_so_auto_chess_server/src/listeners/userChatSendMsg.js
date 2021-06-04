const Users = require('../controllers/users');
module.exports = function(socket) {

    socket.on('userChatSendMsg', function(data, callback){ // {auth_key, msg}

        if (!data.auth_key){
            callback({success:false, message:"Authentification failed."});
            return;
        }

        const _id = Users.authentifyAuthKey(data.auth_key);
        if (!_id){
            callback({success:false, message:"Authentification failed."});
            return;
        }

        if (!data.msg){
            callback({success:false, message:"Request body wrongly formatted."});
            return;
        }

        const user = Users.getUserById(_id);

        console.log("User sending \"" + data.msg + "\".");

        var date = new Date();
        var minutes = date.getMinutes();
        var hour = date.getHours();
        user.lobby.sendMsg("["+hour+"h"+minutes+"] "+user.pseudonym+" : "+data.msg);
        
        console.log("Msg sent.");
        callback({success:true, message:"Message sent."});

    });

}