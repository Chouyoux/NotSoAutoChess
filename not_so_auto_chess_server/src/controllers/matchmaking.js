const Game = require('../models/game');

class MatchMaking {

    constructor() {
        if (!MatchMaking.instance) {
            this.games = [];
            this.lobbies = [];
            this.inQueue = 0;

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

                if (lobby_players_in.length === Game.MaxPlayers) {
                    this.createGame(lobby_players_in);
                    lobby_players_in = [];
                }

            }

            for (var y = 0; y < lobby_players_in.length; y++) {

                var player = lobby_players_in[y];
                players_in.push(player);

                if (players_in.length === Game.MaxPlayers) {
                    this.createGame(players_in);
                    players_in = [];
                }

            }

        }

        this.inQueue = players_in.length;

    }

    requestAddLobbyToQueue(player, lobby) {

        if (!lobby.isLeader(player)) {
            throw("Requesting player is not the leader of its lobby");
        }

        this.addLobbyToQueue(lobby);

    }

    addLobbyToQueue(lobby) {

        this.lobbies.push(lobby);
        this.inQueue += lobby.players.length;
        this.searchGame();

    }

}

const instance = new MatchMaking();
Object.freeze(instance);

module.exports = instance;