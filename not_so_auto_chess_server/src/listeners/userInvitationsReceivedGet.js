const Users = require('../controllers/users');
module.exports = function(socket) {

    socket.on('userInvitationsReceivedGet', function(data, callback){ // {auth_key}

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

        let invitations = [];
        for (let i = 0; i < user.invitations_received.length; i++){

            let invitation = Users.getUserById(user.invitations_received[i]);
            invitations.push(invitation.pseudonym);

        }

        callback({success:true, "invitations" : invitations});
  
    });

}