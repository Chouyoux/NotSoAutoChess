const Game = require('../models/game');

class MatchMaking {

    constructor() {
        if (!MatchMaking.instance) {
            this.games = [];
            this.lobbies = [];

            MatchMaking.instance = this;
        }

        return MatchMaking.instance;
    }

    createGame(players) {

        this.games.push(new Game(players, null));

    }

    searchGame(){
        
        var players_in = [];

        for (var i = 0; i < this.lobbies.length; i++) {

            var lobby = this.lobbies[i];
            var lobby_players_in = [];

            for (var y = 0; y < lobby.players.length; y++) {

                var player = lobby.players[y];
                lobby_players_in.push(player);

                if (lobby_players_in.length === Game.MaxPlayers()) {
                    this.createGame(lobby_players_in);
                    lobby_players_in = [];
                }

            }

            for (var y = 0; y < lobby_players_in.length; y++) {

                var player = lobby_players_in[y];
                players_in.push(player);

                if (players_in.length === Game.MaxPlayers()) {
                    this.createGame(players_in);
                    players_in = [];
                }

            }

        }

        var toRemove = [];

        for (var i = 0; i < this.lobbies.length; i++) {

            var lobby = this.lobbies[i];
            var check = true;

            for (var y = 0; y < lobby.players.length; y++) {

                var player = lobby.players[y];
                if (!player.game) {
                    check = false;
                }

            }

            if (check) {
                toRemove.push(lobby);
            }

        }

        for (var i = 0; i < toRemove.length; i++) {

            var lobby = toRemove[i];
            const index = this.lobbies.indexOf(lobby);
            if (index > -1) {
                this.lobbies.splice(index, 1);
            }

        }

    }



    requestAddLobbyToQueue(player) {

        if (!player.lobby.isLeader(player)) {
            throw("Requesting player is not the leader of its lobby");
        }

        if (this.lobbies.includes(player.lobby)) {
            throw("Requesting lobby is already in MatchMaking");
        }

        this.addLobbyToQueue(player.lobby);

    }

    addLobbyToQueue(lobby) {

        this.lobbies.push(lobby);
        this.searchGame();

    }

}

const instance = new MatchMaking();
Object.freeze(instance);

module.exports = instance;