const ChessBoard = require('./chessBoard');

class Game {

    static MaxPlayers = 2;

    constructor(players, board){

        this.players = players;
        this.chess_board = new ChessBoard(board);

        for (var i = 0; i < this.players.length; i++){
            this.players[i].game = this;
        }

    }

    endGame(){

        for (var i = 0; i < this.players.length; i++){
            this.players[i].game = null;
        }

    }


    

}

module.exports = Game;