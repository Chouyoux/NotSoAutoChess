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
        state["player1Pseudonym"] = this.players[0].pseudonym;
        state["player2Pseudonym"] = this.players[1].pseudonym;
        state["player1Avatar"] = this.players[0].avatar;
        state["player2Avatar"] = this.players[1].avatar;
        state["player1Set"] = this.players[0].set;
        state["player2Set"] = this.players[1].set;
        state["player1Time"] = this.chess_board.playerTimes[this.chess_board.players[0]._id.toString()];
        state["player2Time"] = this.chess_board.playerTimes[this.chess_board.players[1]._id.toString()];
        state["lastMove"] = [[this.chess_board.lastMove.x_from, this.chess_board.lastMove.y_from], [this.chess_board.lastMove.x_to, this.chess_board.lastMove.y_to]];

        return state;

    }

    endGame() {

        for (var i = 0; i < this.players.length; i++) {
            this.players[i].game = null;
        }

    }




}

module.exports = Game;