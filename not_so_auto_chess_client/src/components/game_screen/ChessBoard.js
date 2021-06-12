import React, { useRef, useState } from 'react';

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

const ChessBoard = ({ board, onMove, reverse }) => {

    const chessBoardRef = useRef(null);

    var activePiece = null;
    var whereWasPieceX = 0;
    var whereWasPieceY = 0;

    let fromPos = {x: 0, y: 0};
    let toPos = {x: 0, y: 0};

    const grabPiece = function (e) {
        const element = e.target;
        const chessboard = chessBoardRef.current;
        if (element.classList.contains("chess-piece") && !activePiece && chessboard) {
            
            var rect = element.getBoundingClientRect();
            whereWasPieceX = rect.left;
            whereWasPieceY = rect.top;
            
            fromPos.x = Math.floor((e.clientX - chessboard.offsetLeft - 80) / ((chessboard.clientWidth-160)/8));
            fromPos.y = Math.floor((e.clientY - chessboard.offsetTop - 80) / ((chessboard.clientHeight-160)/8));

            var x = e.clientX - 37;
            var y = e.clientY - 37;
            element.style.position = "absolute";
            element.style.left = `${x}px`;
            element.style.top = `${y}px`;

            activePiece = element;
        }
    }

    const movePiece = function (e) {
        const chessboard = chessBoardRef.current;
        if (activePiece && chessboard) {

            const minX = chessboard.offsetLeft - 37;
            const minY = chessboard.offsetTop - 37;
            const maxX = minX + chessboard.clientWidth;
            const maxY = minY + chessboard.clientHeight;

            var x = e.clientX - 37;
            var y = e.clientY - 37;
            activePiece.style.position = "absolute";
            activePiece.style.left = x < minX ? `${minX}px`: x > maxX ? `${maxX}px` : `${x}px`;
            activePiece.style.top = y < minY ? `${minY}px`: y > maxY ? `${maxY}px` : `${y}px`;
        }

    }

    const dropPiece = function (e) {
        const chessboard = chessBoardRef.current;
        if (activePiece && chessboard) {
            toPos.x = Math.floor((e.clientX - chessboard.offsetLeft - 80) / ((chessboard.clientWidth-160)/8));
            toPos.y = Math.floor((e.clientY - chessboard.offsetTop - 80) / ((chessboard.clientHeight-160)/8));

            console.log(fromPos, toPos);
            if (reverse) { fromPos['y'] = 7 - fromPos['y']; toPos['y'] = 7 - toPos['y']; }

            activePiece.style.left = `${whereWasPieceX}px`;
            activePiece.style.top = `${whereWasPieceY}px`;
            onMove(fromPos, toPos);
            activePiece = null;
            fromPos = {x: 0, y: 0};
            toPos = {x: 0, y: 0};
        }




    }

    const squares = [];
    var color = "white";
    var key = 0;

    for (var x = reverse ? 7 : 0; reverse ? x >= 0 : x < board.length; reverse ? x-- : x++) {

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
                    <div className={color} key={key}  >
                        <div style={{backgroundImage: `url(${sets_imgs[1][piece_key]})`}} className="chess-piece" />
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
                <div
                    onMouseMove={e => movePiece(e)}
                    onMouseDown={e => grabPiece(e)}
                    onMouseUp={e => dropPiece(e)}
                    className="chessboard"
                    ref={chessBoardRef}
                >
                    {squares}
                </div>
            </div>
    
        </div>
    )
}

export default ChessBoard
