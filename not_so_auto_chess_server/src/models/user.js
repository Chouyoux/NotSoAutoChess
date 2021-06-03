const Lobby = require('./lobby');

class User {

    constructor(_id, pseudonym, email, password, auth_key, friends, invitations_pending, invitations_received, avatar, set){
        this._id = _id || null;
        this.pseudonym = pseudonym;
        this.email = email;
        this.password = password;
        this.auth_key = auth_key || null;
        this.friends = friends ? [...friends] : [];
        this.invitations_pending = invitations_pending ? [...invitations_pending] : [];
        this.invitations_received = invitations_received ? [...invitations_received] : [];
        this.avatar = avatar ? avatar : 0;
        this.set = set ? set : 0;
        this.socket = null;
        this.lobby = new Lobby(this);
    }

    isConnected(){
        return this.socket && this.socket.connected;
    }

    hasFriend(friend){
        for (var i = 0; i < this.friends.length; i++){
            let afriend = this.friends[i];

            if (afriend.toString() === friend.toString()){
                return true;
            }
        }

        return false;
    }

    addFriend(friend){
        this.friends.push(friend);
    }

    removeFriend(friend){
        var filtered = this.friends.filter(function(value, index, arr){ 
            return friend.toString() !== value.toString();
        });

        this.friends = filtered;
    }

    hasPendingInvite(pendingInvite){
        for (var i = 0; i < this.invitations_pending.length; i++){
            let ainvitations_pending = this.invitations_pending[i];

            if (ainvitations_pending.toString() === pendingInvite.toString()){
                return true;
            }
        }

        return false;
    }

    addPendingInvite(pendingInvite){
        this.invitations_pending.push(pendingInvite);
    }

    removePendingInvite(pendingInvite){
        var filtered = this.invitations_pending.filter(function(value, index, arr){ 
            return pendingInvite.toString() !== value.toString();
        });

        this.invitations_pending = filtered;
    }

    hasReceivedInvite(receivedInvite){
        for (var i = 0; i < this.invitations_received.length; i++){
            let ainvitations_received = this.invitations_received[i];

            if (ainvitations_received.toString() === receivedInvite.toString()){
                return true;
            }
        }

        return false;
    }

    addReceivedInvite(receivedInvite){
        this.invitations_received.push(receivedInvite);
    }

    removeReceivedInvite(receivedInvite){
        var filtered = this.invitations_received.filter(function(value, index, arr){ 
            return receivedInvite.toString() !== value.toString();
        });

        this.invitations_received = filtered;
    }

    updateFriendList(){
        if (this.isConnected()){
            this.socket.emit("updateFriendsList");
        }
    }

    updateLobby(){
        if (this.isConnected()){
            this.socket.emit("updateLobby");
        }
    }

    sendLobbyInvite(pseudonym){
        if (this.isConnected()){
            this.socket.emit("lobbyInvite", pseudonym);
        }
    }
    

}

module.exports = User;