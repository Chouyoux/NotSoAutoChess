const Pieces = Object.freeze({ "WPAWN": 0, "WKNIGHT": 1, "WBISHOP": 2, "WROOK": 3, "WQUEEN": 4, "WKING": 5, "BPAWN": 6, "BKNIGHT": 7, "BBISHOP": 8, "BROOK": 9, "BQUEEN": 10, "BKING": 11, "EMPTY": 12 });

class Move {

    constructor(move) { // [[x,y], [x,y]]

        this.x_from = move[0][0];
        this.y_from = move[0][1];
        this.x_to = move[1][0];
        this.y_to = move[1][1];

        this.distance_x = this.x_to - this.x_from;
        this.distance_y = this.y_to - this.y_from;

        this.abs_distance_x = Math.abs(this.distance_x);
        this.abs_distance_y = Math.abs(this.distance_y);

    }

    isLine() {

        return ((this.abs_distance_x === 0 && this.abs_distance_y !== 0) || (this.abs_distance_x !== 0 && this.abs_distance_y === 0));

    }

    isDiagonal() {

        return this.abs_distance_x === this.abs_distance_y;

    }

    getBetween() {

        var squares = [];

        if (!this.isDiagonal() && !this.isLine()) {
            return square;
        }

        let distance = this.abs_distance_x > 0 ? this.abs_distance_x - 1 : this.abs_distance_y - 1;
        let x = this.x_from;
        let y = this.y_from;

        if (this.isLine()) {

            for (var i = 0; i < distance; i++) {

                if (this.abs_distance_x > 0) {
                    if (this.distance_x > 0) {
                        x++;
                    }
                    else {
                        x--;
                    }
                }
                if (this.abs_distance_y > 0) {
                    if (this.distance_y > 0) {
                        y++;
                    }
                    else {
                        y--;
                    }
                }

                squares.push([x, y]);

            }

        }

        if (this.isDiagonal()) {

            for (var i = 0; i < distance; i++) {

                if (this.distance_x > 0) {
                    x++;
                }
                else {
                    x--;
                }
                if (this.distance_y > 0) {
                    y++;
                }
                else {
                    y--;
                }

                squares.push([x, y]);

            }

        }

        return squares;

    }

}

class ChessBoard {

    constructor(board, players, time) {

        this.board = [];
        this.players = players;
        this.playerTurn = 0;
        this.lastMove = "None";
        this.perPlayerTime = time || 120;

        this.playerTimes = {};
        for (var i = 0; i < this.players.length; i++) {
            this.playerTimes[this.players[i]._id.toString()] = this.perPlayerTime;
        }

        this.clock = setInterval((chessboard) => {
            chessboard.playerTimes[chessboard.players[chessboard.playerTurn]._id.toString()]--;
            if (this.checkWin()) this.gameEnd();
            for (var i = 0; i < this.players.length; i++) {
                this.players[i].updateGame();
            }
            if (chessboard.playerTimes[chessboard.players[chessboard.playerTurn]._id.toString()] < 0) {
                clearInterval(chessboard.clock);
            }
        }, 1000, this);

        if (board) {

            this.board.push([...board[0]]);
            this.board.push([...board[1]]);
            this.board.push([...board[2]]);
            this.board.push([...board[3]]);
            this.board.push([...board[4]]);
            this.board.push([...board[5]]);
            this.board.push([...board[6]]);
            this.board.push([...board[7]]);

        }

        else {

            this.board.push([Pieces.BROOK, Pieces.BKNIGHT, Pieces.BBISHOP, Pieces.BQUEEN, Pieces.BKING, Pieces.BBISHOP, Pieces.BKNIGHT, Pieces.BROOK]);
            this.board.push([Pieces.BPAWN, Pieces.BPAWN, Pieces.BPAWN, Pieces.BPAWN, Pieces.BPAWN, Pieces.BPAWN, Pieces.BPAWN, Pieces.BPAWN]);
            this.board.push([Pieces.EMPTY, Pieces.EMPTY, Pieces.EMPTY, Pieces.EMPTY, Pieces.EMPTY, Pieces.EMPTY, Pieces.EMPTY, Pieces.EMPTY]);
            this.board.push([Pieces.EMPTY, Pieces.EMPTY, Pieces.EMPTY, Pieces.EMPTY, Pieces.EMPTY, Pieces.EMPTY, Pieces.EMPTY, Pieces.EMPTY]);
            this.board.push([Pieces.EMPTY, Pieces.EMPTY, Pieces.EMPTY, Pieces.EMPTY, Pieces.EMPTY, Pieces.EMPTY, Pieces.EMPTY, Pieces.EMPTY]);
            this.board.push([Pieces.EMPTY, Pieces.EMPTY, Pieces.EMPTY, Pieces.EMPTY, Pieces.EMPTY, Pieces.EMPTY, Pieces.EMPTY, Pieces.EMPTY]);
            this.board.push([Pieces.WPAWN, Pieces.WPAWN, Pieces.WPAWN, Pieces.WPAWN, Pieces.WPAWN, Pieces.WPAWN, Pieces.WPAWN, Pieces.WPAWN]);
            this.board.push([Pieces.WROOK, Pieces.WKNIGHT, Pieces.WBISHOP, Pieces.WQUEEN, Pieces.WKING, Pieces.WBISHOP, Pieces.WKNIGHT, Pieces.WROOK]);

        }

    }

    gameEnd() {
        console.log("Game of " + this.players[0].pseudonym + " and " + this.players[1].pseudonym  + " just finished.");
        for (var i = 0; i < this.players.length; i++) {
            this.players[i].updateGame();
            this.players[i].game = null;
        }
    }

    checkWin() {

        var color = "white";

        for (const [key, value] of Object.entries(this.playerTimes)) {
            if (value < 0) {
                return true;
            }
        }

        for (var x = 0; x < this.board.length; x++){
            for (var y = 0; y < this.board[x].length; y++){
                var piece = this.board[x][y];

                if (this.isPieceWhite(piece) && color !== "white") {
                    return false;
                }
                else if (!this.isPieceWhite(piece) && Pieces.EMPTY !== piece &&  color !== "black") {
                    return false;
                }

                if (this.isPieceWhite(piece)) {
                    color = "white";
                }
                else if (!this.isPieceWhite(piece) && Pieces.EMPTY !== piece) {
                    color = "black";
                }
                
            }
        }

        return true;

    }

    pieceBelongsToPlayer(piece, player) {
        return this.isPlayerWhite(player) === this.isPieceWhite(piece);
    }

    piecesAreSameColour(piece1, piece2) {
        return this.isPieceWhite(piece1) === this.isPieceWhite(piece2) && piece1 !== Pieces.EMPTY && piece2 !== Pieces.EMPTY;
    }

    isPlayerWhite(player) {
        return player == this.players[0];
    }

    isPieceWhite(piece) {
        return piece < Pieces.BPAWN;
    }

    requestMove(player, move) {

        if (player !== this.players[this.playerTurn]) {
            throw ("It's not this player's turn.");
        }

        if (this.playerTimes[player._id.toString()] < 0) {
            throw ("You don't have time.");
        }

        var move = new Move(move);

        if (!this.checkMoveAccess(move)) {
            throw ("Out of bounds move.");
        }

        let piece_from = this.board[move.y_from][move.x_from];
        let piece_to = this.board[move.y_to][move.x_to];

        if (piece_from === Pieces.EMPTY || !this.pieceBelongsToPlayer(piece_from, player)) {
            throw ("Invalid piece choice.");
        }

        try {
            this.movePiece(move, piece_from, piece_to);
        }
        catch (e) {
            throw (e);
        }

        for (var i = 0; i < this.players.length; i++) {
            this.players[i].updateGame();
        }
        this.playerTurn = (this.playerTurn + 1) % this.players.length;

    }

    movePiece(move, piece_from, piece_to) {

        if (move.abs_distance_x === 0 && move.abs_distance_y === 0) {
            throw ("Can't move without a distance.");
        }

        if (this.piecesAreSameColour(piece_from, piece_to)) {
            throw ("Can't move on a piece of the same colour");
        }

        // PAWN LOGIC
        if (piece_from === Pieces.BPAWN || piece_from === Pieces.WPAWN) {

            if (piece_from === Pieces.WPAWN && move.distance_y >= 0) {
                throw ("Pawns can't move that way.");
            }

            if (piece_from === Pieces.BPAWN && move.distance_y <= 0) {
                throw ("Pawns can't move that way.");
            }

            if (piece_to === Pieces.EMPTY && move.abs_distance_x !== 0) {
                throw ("Pawns can't move that way.");
            }

            if (piece_to !== Pieces.EMPTY && move.abs_distance_x !== 1) {
                throw ("Pawns can't move that way.");
            }

            if (move.abs_distance_y === 2 && (move.abs_distance_x !== 0 || (move.y_from !== 1 && move.y_from !== 6))) {
                throw ("Pawns can't move that way.");
            }

            if (move.abs_distance_y > 2 || move.abs_distance_x > 1) {
                throw ("Pawns can't move that way.");
            }

        }

        // KNIGHTS LOGIC
        if (piece_from === Pieces.BKNIGHT || piece_from === Pieces.WKNIGHT) {

            if ( (move.abs_distance_x !== 1 || move.abs_distance_y !== 2) && (move.abs_distance_x !== 2 || move.abs_distance_y !== 1)) {
                throw ("Knights can't move this way");
            }

        }

        // BISHOP LOGIC
        if (piece_from === Pieces.WBISHOP || piece_from === Pieces.BBISHOP) {

            if (!move.isDiagonal()) {
                throw ("Bishops can't move that way.");
            }

            let squares = move.getBetween();

            for (var i = 0; i < squares.length; i++) {

                if (this.board[squares[i][1]][squares[i][0]] !== Pieces.EMPTY) {
                    throw ("Bishops can't move that way.");
                }

            }
        }

        // ROOK LOGIC
        if (piece_from === Pieces.WROOK || piece_from === Pieces.BROOK) {

            if (!move.isLine()) {
                throw ("Rooks can't move that way.");
            }

            let squares = move.getBetween();

            for (var i = 0; i < squares.length; i++) {

                if (this.board[squares[i][1]][squares[i][0]] !== Pieces.EMPTY) {
                    throw ("Rooks can't move that way.");
                }

            }

        }

        // QUEEN LOGIC
        if (piece_from === Pieces.WQUEEN || piece_from === Pieces.BQUEEN) {

            if (!move.isLine() && !move.isDiagonal()) {
                throw ("Queens can't move that way.");
            }

            let squares = move.getBetween();

            for (var i = 0; i < squares.length; i++) {

                if (this.board[squares[i][1]][squares[i][0]] !== Pieces.EMPTY) {
                    throw ("Queens can't move that way.");
                }

            }

        }

        // KING LOGIC
        if (piece_from === Pieces.WKING || piece_from === Pieces.BKING) {

            if (move.abs_distance_x > 1 || move.abs_distance_y > 1) {
                throw ("Kings can't move this way");
            }

        }

        this.board[move.y_from][move.x_from] = Pieces.EMPTY;
        this.board[move.y_to][move.x_to] = piece_from;
        this.lastMove = move;
        if (this.checkWin()) this.gameEnd();

    }

    checkMoveAccess(move) {

        return move.x_from >= 0 && move.x_from < 8 && move.y_from >= 0 && move.y_from < 8 && move.x_to >= 0 && move.x_to < 8 && move.y_to >= 0 && move.y_to < 8;

    }

}

module.exports = ChessBoard;