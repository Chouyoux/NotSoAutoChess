class User {

    constructor(_id, pseudonym, email, password, auth_key, friends, pending_invites, received_invites){
        this._id = _id || null;
        this.pseudonym = pseudonym;
        this.email = email;
        this.password = password;
        this.auth_key = auth_key || null;
        this.friends = friends ? [...friends] : [];
        this.pending_invites = pending_invites ? [...pending_invites] : [];
        this.received_invites = received_invites ? [...received_invites] : [];
        this.socket = null;
    }

    addFriend(friend){
        this.friends.push(friend);
    }

    removeFriend(friend){
        this.friends.remove(friend);
    }

    addPendingInvite(pendingInvite){
        this.pending_invites.push(pendingInvite);
    }

    removePendingInvite(pendingInvite){
        this.pending_invites.remove(pendingInvite);
    }

    addReceivedInvite(receivedInvite){
        this.received_invites.push(receivedInvite);
    }

    removeReceivedInvite(receivedInvite){
        this.received_invites.remove(receivedInvite);
    }

    

}

module.exports = User;