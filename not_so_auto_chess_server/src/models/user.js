class User {

    constructor(_id, pseudonym, email, password, auth_key, friends, invitations_pending, invitations_received){
        this._id = _id || null;
        this.pseudonym = pseudonym;
        this.email = email;
        this.password = password;
        this.auth_key = auth_key || null;
        this.friends = friends ? [...friends] : [];
        this.invitations_pending = invitations_pending ? [...invitations_pending] : [];
        this.invitations_received = invitations_received ? [...invitations_received] : [];
        this.socket = null;
    }

    addFriend(friend){
        this.friends.push(friend);
    }

    removeFriend(friend){
        this.friends.remove(friend);
    }

    addPendingInvite(pendingInvite){
        this.invitations_pending.push(pendingInvite);
    }

    removePendingInvite(pendingInvite){
        this.invitations_pending.remove(pendingInvite);
    }

    addReceivedInvite(receivedInvite){
        this.invitations_received.push(receivedInvite);
    }

    removeReceivedInvite(receivedInvite){
        this.invitations_received.remove(receivedInvite);
    }

    

}

module.exports = User;