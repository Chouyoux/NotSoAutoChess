const Users = require('../controllers/users');
    
module.exports = function(socket) {

    socket.on('signIn', function(data, callback){ // {pseudonym,password} || {auth_key}

        if ( (!data.pseudonym || !data.password) && !data.auth_key){
          callback({success:false, message:"Request body wrongly formatted."});
        }
  
        if (data.pseudonym && data.password){
  
          const _id = Users.authenfityPseudonymePassword(data.pseudonym, data.password);
          if (_id){
            callback({success:true, token: Users.getUserById(_id).auth_key});
          }
  
        }
  
        if (data.auth_key){
  
          const _id = Users.authentifyAuthKey(data.auth_key);
          if (_id){
            callback({success:true, token: Users.getUserById(_id).auth_key});
          }
  
        }
  
        callback({success:false, message:"Something went wrong with the request."});
  
    });

}