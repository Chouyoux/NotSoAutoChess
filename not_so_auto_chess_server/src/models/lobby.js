const MaxPlayers = 8;
const MatchMaking = require('../controllers/matchmaking');

class Lobby {

    constructor(leader) {

        this.leader = leader;
        this.players = [leader];
        this.invitations = [];

    }

    updateLobby() {

        for (var i = 0; i < this.players.length; i++) {

            let lobby_player = this.players[i];
            lobby_player.updateLobby();

        }

    }

    hasPlayer(player) {

        for (var i = 0; i < this.players.length; i++) {
            if (this.players[i]._id.toString() == player._id.toString()) {
                return true;
            }
        }
        return false;

    }

    isLeader(player) {

        return this.leader == player;

    }

    isInvited(player) {

        return this.invitations.includes(player);

    }

    invite(player) {

        if (this.hasPlayer(player)) {
            throw ("This player already is in this lobby");
        }

        if (this.players.length >= MaxPlayers) {
            throw ("This lobby already contains " + MaxPlayers + " players.");
        }

        this.invitations.push(player);

    }

    accept(player) {

        if (!this.isInvited(player)) {
            throw ("You were not invited.");
        }

        this.removeInvitation(player);
        this.addPlayer(player);

    }

    refuse(player) {

        if (!this.isInvited(player)) {
            throw ("You were not invited.");
        }

        this.removeInvitation(player);

    }

    addPlayer(player) {

        MatchMaking.removeLobby(this);

        player.lobby.removePlayer(player);
        this.players.push(player);
        player.lobby = this;
        this.updateLobby();
        this.sendMsg(player.pseudonym + " joined the lobby.");

    }

    requestPlayerRemoval(requester, player) {

        if (!this.isLeader(requester) && requester != player) {
            throw ("Only the Leader can kick.")
        }
        if (this.players.length < 2) {
            throw ("Can't remove the last player.")
        }

        this.removePlayer(player);

    }

    removePlayer(player) {

        MatchMaking.removeLobby(this);

        if (this.players.length > 1) {

            if (this.isLeader(player)) {
                this.leader = this.players[1];
            }

            this.updateLobby();
            player.lobby = new Lobby(player);
            player.updateLobby();

        }

        var filtered = this.players.filter(function (value, index, arr) {
            return player != value;
        });

        this.players = filtered;
        
        this.sendMsg(player.pseudonym + " left the lobby.");

    }

    removeInvitation(player) {

        var filtered = this.invitations.filter(function (value, index, arr) {
            return player != value;
        });

        this.invitations = filtered;

    }

    notifyMatchMakingEntered() {
        for (var i = 0; i < this.players.length; i++) {
            let player = this.players[i];
            player.notifyMatchMakingEntered();
            player.sendMsg("Your lobby entered the MatchMaking.");
        }
    }

    notifyMatchMakingCanceled() {
        for (var i = 0; i < this.players.length; i++) {
            let player = this.players[i];
            player.notifyMatchMakingCanceled();
            player.sendMsg("Your lobby left the MatchMaking.");
        }
    }

    sendMsg(msg) {

        for (var i = 0; i < this.players.length; i++) {
            let player = this.players[i];
            player.sendMsg(msg);
        }

    }

}

module.exports = Lobby;