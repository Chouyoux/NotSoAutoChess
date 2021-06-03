const MaxPlayers = 8;

class Lobby {

    constructor(leader) {

        this.leader = leader;
        this.players = [leader];
        this.invitations = [];

    }

    hasPlayer(player) {

        this.players.includes(player);

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
            throw ("This player isn't invited in this lobby.");
        }

        this.removeInvitation(player);
        this.addPlayer(player);

    }

    addPlayer(player) {

        this.players.push(player);
        player.lobby = this;

    }

    requestPlayerRemoval(requester, player) {

        if (!this.isLeader(requester)) {
            throw ("Only the lobby's leader can remove players from it.")
        }

        this.removePlayer(player);

    }

    removePlayer(player) {

        var filtered = this.players.filter(function (value, index, arr) {
            return player != value;
        });

        this.players = filtered;
        player.lobby = new Lobby(player);

    }

    removeInvitation(player) {

        var filtered = this.invitations.filter(function (value, index, arr) {
            return player != value;
        });

        this.invitations = filtered;

    }

}

module.exports = Lobby;