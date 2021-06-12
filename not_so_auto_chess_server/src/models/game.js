const ChessBoard = require('./chessBoard');

class Game {

    static MaxPlayers() {return 2;}

    constructor(players, board) {

        this.players = players;
        this.chess_board = new ChessBoard(board, players);

        for (var i = 0; i < this.players.length; i++) {
            this.players[i].game = this;
            this.players[i].updateGame();
        }

    }

    getState() {

        let state = {};
        state["board"] = this.chess_board.board;
        state["turn"] = this.chess_board.playerTurn;
        state["player1"] = this.players[0].auth_key;
        state["player2"] = this.players[1].auth_key;

        return state;

    }

    endGame() {

        for (var i = 0; i < this.players.length; i++) {
            this.players[i].game = null;
        }

    }




}

module.exports = Game;