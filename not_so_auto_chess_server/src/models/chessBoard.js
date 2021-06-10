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

                x = this.abs_distance_x > 0 ? (this.distance_x > 0 ? x + 1 : x - 1) : x;
                y = this.abs_distance_y > 0 ? (this.ditance_y > 0 ? y + 1 : y - 1) : y;
                squares.push([x, y])

            }

        }

        if (this.isDiagonal()) {

            for (var i = 0; i < distance; i++) {

                x = this.distance_x > 0 ? x + 1 : x - 1;
                y = this.ditance_y > 0 ? y + 1 : y - 1;
                squares.push([x, y])

            }

        }

        return squares;

    }

}

class ChessBoard {

    constructor(board) {

        this.board = [];
        this.playerTurn = 0;

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

    pieceBelongsToPlayer(piece, player) {
        return this.isPlayerWhite(player) === this.isPieceWhite(piece);
    }

    piecesAreSameColour(piece1, piece2) {
        return this.isPieceWhite(piece1) === this.isPieceWhite(piece2);
    }

    isPlayerWhite(player) {
        return player === this.players[0];
    }

    isPieceWhite(piece) {
        return piece < Pieces.BPAWN;
    }

    requestMove(player, move) {

        if (player !== this.players[this.playerTurn]) {
            throw ("It's not this player's turn.");
        }

        var move = new Move(move);

        if (!this.checkMoveAcces(move)) {
            throw ("Out of bounds move.");
        }

        let piece_from = this.board[move.x_from][move.y_from];
        let piece_to = this.board[move.x_to][move.y_to];

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

            if (piece_from === Pieces.WPAWN && move.distance_y <= 0) {
                throw ("Pawns can't move that way.");
            }

            if (piece_from === Pieces.BPAWN && move.distance_y >= 0) {
                throw ("Pawns can't move that way.");
            }

            if (piece_to === Pieces.EMPTY && move.abs_distance_x !== 0) {
                throw ("Pawns can't move that way.");
            }

            if (piece_to !== Pieces.EMPTY && move.abs_distance_x !== 1) {
                throw ("Pawns can't move that way.");
            }

            if (move.abs_distance_y === 2 && (move.abs_distance_x !== 0 || (move.x_from !== 1 && move.x_from !== 6))) {
                throw ("Pawns can't move that way.");
            }

            if (move.abs_distance_y > 2 || move.abs_distance_x > 1) {
                throw ("Pawns can't move that way.");
            }

        }

        // KNIGHTS LOGIC
        if (piece_from === Pieces.BKNIGHT || piece_from === Pieces.WKNIGHT) {

            if (move.abs_distance_x !== 1 || move.abs_distance_y !== 2) {
                throw ("Knights can't move this way");
            }

        }

        // BISHOP LOGIC
        if (piece_from === Pieces.WBISHOP || piece_from === Pieces.BBISHOP) {

            if (!move.isDiagonal()) {
                throw ("Bishops can't move that way.");
            }

            let squares = move.getBetween();

            for (var i = 0; squares.length; i++) {

                if (this.board[squares[i][0]][squares[i][1]] !== Pieces.EMPTY) {
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

            for (var i = 0; squares.length; i++) {

                if (this.board[squares[i][0]][squares[i][1]] !== Pieces.EMPTY) {
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

            for (var i = 0; squares.length; i++) {

                if (this.board[squares[i][0]][squares[i][1]] !== Pieces.EMPTY) {
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

        this.board[move.x_from][move.y_from] = Pieces.EMPTY;
        this.board[move.x_to][move.y_to] = piece_from;

    }

    checkMoveAccess(move) {

        return (this.board[move.x_from] && this.board[move.x_from][move.y_from] && this.board[move.x_to] && this.board[move.x_to][move.y_to]);

    }

}

module.exports = ChessBoard;