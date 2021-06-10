import React from 'react';

import './chess_board.css';

import classic_wking from '../../images/game_screen/chess_board/pieces/classic/wking.png';
import classic_wqueen from '../../images/game_screen/chess_board/pieces/classic/wqueen.png';
import classic_wrook from '../../images/game_screen/chess_board/pieces/classic/wrook.png';
import classic_wbishop from '../../images/game_screen/chess_board/pieces/classic/wbishop.png';
import classic_wknight from '../../images/game_screen/chess_board/pieces/classic/wknight.png';
import classic_wpawn from '../../images/game_screen/chess_board/pieces/classic/wpawn.png';
import classic_bking from '../../images/game_screen/chess_board/pieces/classic/bking.png';
import classic_bqueen from '../../images/game_screen/chess_board/pieces/classic/bqueen.png';
import classic_brook from '../../images/game_screen/chess_board/pieces/classic/brook.png';
import classic_bbishop from '../../images/game_screen/chess_board/pieces/classic/bbishop.png';
import classic_bknight from '../../images/game_screen/chess_board/pieces/classic/bknight.png';
import classic_bpawn from '../../images/game_screen/chess_board/pieces/classic/bpawn.png';

import bones_wking from '../../images/game_screen/chess_board/pieces/bones/wking.png';
import bones_wqueen from '../../images/game_screen/chess_board/pieces/bones/wqueen.png';
import bones_wrook from '../../images/game_screen/chess_board/pieces/bones/wrook.png';
import bones_wbishop from '../../images/game_screen/chess_board/pieces/bones/wbishop.png';
import bones_wknight from '../../images/game_screen/chess_board/pieces/bones/wknight.png';
import bones_wpawn from '../../images/game_screen/chess_board/pieces/bones/wpawn.png';
import bones_bking from '../../images/game_screen/chess_board/pieces/bones/bking.png';
import bones_bqueen from '../../images/game_screen/chess_board/pieces/bones/bqueen.png';
import bones_brook from '../../images/game_screen/chess_board/pieces/bones/brook.png';
import bones_bbishop from '../../images/game_screen/chess_board/pieces/bones/bbishop.png';
import bones_bknight from '../../images/game_screen/chess_board/pieces/bones/bknight.png';
import bones_bpawn from '../../images/game_screen/chess_board/pieces/bones/bpawn.png';

const sets_imgs = [];
sets_imgs.push([]);
sets_imgs[0].push(classic_wpawn);
sets_imgs[0].push(classic_wknight);
sets_imgs[0].push(classic_wbishop);
sets_imgs[0].push(classic_wrook);
sets_imgs[0].push(classic_wqueen);
sets_imgs[0].push(classic_wking);
sets_imgs[0].push(classic_bpawn);
sets_imgs[0].push(classic_bknight);
sets_imgs[0].push(classic_bbishop);
sets_imgs[0].push(classic_brook);
sets_imgs[0].push(classic_bqueen);
sets_imgs[0].push(classic_bking);
sets_imgs.push([]);
sets_imgs[1].push(bones_wpawn);
sets_imgs[1].push(bones_wknight);
sets_imgs[1].push(bones_wbishop);
sets_imgs[1].push(bones_wrook);
sets_imgs[1].push(bones_wqueen);
sets_imgs[1].push(bones_wking);
sets_imgs[1].push(bones_bpawn);
sets_imgs[1].push(bones_bknight);
sets_imgs[1].push(bones_bbishop);
sets_imgs[1].push(bones_brook);
sets_imgs[1].push(bones_bqueen);
sets_imgs[1].push(bones_bking);

const ChessBoard = ({ board }) => {

    const squares = [];
    var color = "white";
    var key = 0;

    for (var x = 0; x < board.length; x++) {

        var row = board[x];

        for (var y = 0; y < row.length; y++) {

            const piece_key = board[x][y];

            if (piece_key === 12) {
                squares.push(
                    <div className={color} key={key} />
                );
            }
            else {
                squares.push(
                    <div className={color} key={key} >
                        <img className="piece" src={sets_imgs[1][piece_key]} />
                    </div>
                );
            }

            color = color === "white" ? "black" : "white";
            key++;

        }

        color = color === "white" ? "black" : "white";

    }


    return (
        <div>
            <div className="background">
                <div className="chessboard">
                    {squares}
                </div>
            </div>
    
        </div>
    )
}

export default ChessBoard
