import React, { useEffect, useRef, useState } from 'react';

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
import classic_board from '../../images/game_screen/chess_board/classic_board.png';

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
import bones_board from '../../images/game_screen/chess_board/bones_board.png';

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
sets_imgs[0].push(classic_board);
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
sets_imgs[1].push(bones_board);

const sets_board_colors = [];
sets_board_colors.push([]);
sets_board_colors[0].push("#c26d46");
sets_board_colors[0].push("#76211b");
sets_board_colors.push([]);
sets_board_colors[1].push("#a7b5db");
sets_board_colors[1].push("#6c81bb");

let ChessBoard = ({ lastMove, board, onMove, reverse, skin1, skin2, skinBoard }) => {

    const chessBoardRef = useRef(null);

    const [activePiece, setActivePiece] = useState(null);
    const [whereWasPieceX, setWhereWasPieceX] = useState(0);
    const [whereWasPieceY, setWhereWasPieceY] = useState(0);

    
    const [fromPos, setFromPos] = useState({x: 0, y: 0});
    const [toPos, setToPos] = useState({x: 0, y: 0});

    //var activePiece = null;
    //var whereWasPieceX = 0;
    //var whereWasPieceY = 0;

    //let fromPos = {x: 0, y: 0};
    //let toPos = {x: 0, y: 0};

    function pieceToSkin(piece_key) {
        if (piece_key < 6) {
            return skin1;
        }
        else {
            return skin2;
        }
    }

    function touchHandler(event) {

        var touches = event.changedTouches,
            first = touches[0],
            type = "";
        switch(event.type)
        {
            case "touchstart": type = "mousedown"; break;
            case "touchmove":  type = "mousemove"; break;        
            case "touchend":   type = "mouseup";   break;
            default:           return;
        }

        // initMouseEvent(type, canBubble, cancelable, view, clickCount, 
        //                screenX, screenY, clientX, clientY, ctrlKey, 
        //                altKey, shiftKey, metaKey, button, relatedTarget);

        var simulatedEvent = document.createEvent("MouseEvent");
        simulatedEvent.initMouseEvent(type, true, true, window, 1, 
                                    first.screenX, first.screenY, 
                                    first.clientX, first.clientY, false, 
                                    false, false, false, 0/*left*/, null);

        first.target.dispatchEvent(simulatedEvent);
        event.preventDefault();
    }
      

    const grabPiece = function (e) {

        var isRightMB;
        e = e || window.event;

        if ("which" in e)  // Gecko (Firefox), WebKit (Safari/Chrome) & Opera
            isRightMB = e.which == 3; 
        else if ("button" in e)  // IE, Opera 
            isRightMB = e.button == 2; 

        if (isRightMB && activePiece) {
            console.log("right click")
            activePiece.style.left = `${whereWasPieceX}px`;
            activePiece.style.top = `${whereWasPieceY}px`;
            setActivePiece(null);
            setFromPos({x: 0, y: 0});
            setToPos({x: 0, y: 0});
            return;
        }

        const element = e.target;
        const chessboard = chessBoardRef.current;
        if (element.classList.contains("chess-piece") && !activePiece && chessboard) {
            
            var rect = element.getBoundingClientRect();
            var chess_rect = chessboard.getBoundingClientRect();
            setWhereWasPieceX(rect.left - chess_rect.left);
            setWhereWasPieceY(rect.top - chess_rect.top);

            
            setFromPos({x : Math.floor((e.clientX - chess_rect.left) / ((chessboard.clientWidth)/8)), y : Math.floor((e.clientY - chess_rect.top) / ((chessboard.clientHeight)/8))});

            console.log(fromPos);

            var x = e.clientX - 32 - chess_rect.left;
            var y = e.clientY - 32 - chess_rect.top;
            element.style.position = "absolute";
            element.style.left = `${x}px`;
            element.style.top = `${y}px`;

            setActivePiece(element);
        }
    }

    const movePiece = function (e) {
        const chessboard = chessBoardRef.current;
        if (activePiece && chessboard) {

            var chess_rect = chessboard.getBoundingClientRect();

            const minX = 0 - 32;
            const minY = 0 - 32;
            const maxX = minX + chessboard.clientWidth;
            const maxY = minY + chessboard.clientHeight;

            var chess_rect = chessboard.getBoundingClientRect();

            var x = e.clientX - 32 - chess_rect.left;
            var y = e.clientY - 32 - chess_rect.top;
            activePiece.style.position = "absolute";
            activePiece.style.left = x < minX ? `${minX}px`: x > maxX ? `${maxX}px` : `${x}px`;
            activePiece.style.top = y < minY ? `${minY}px`: y > maxY ? `${maxY}px` : `${y}px`;
        }
    }

    const dropPiece = function (e) {
        const chessboard = chessBoardRef.current;
        if (activePiece && chessboard) {
            var chess_rect = chessboard.getBoundingClientRect();
            toPos.x = Math.floor((e.clientX - chess_rect.left) / ((chessboard.clientWidth)/8));
            toPos.y = Math.floor((e.clientY - chess_rect.top) / ((chessboard.clientHeight)/8));

            if (reverse) { fromPos['y'] = 7 - fromPos['y']; toPos['y'] = 7 - toPos['y']; }

            activePiece.style.left = `${whereWasPieceX}px`;
            activePiece.style.top = `${whereWasPieceY}px`;
            onMove(fromPos, toPos);
            setActivePiece(null);
            setFromPos({x: 0, y: 0});
            setToPos({x: 0, y: 0});
        }
    }

    const squares = [];
    var color =  reverse ? "black" : "white";
    var key = 0;

    for (var x = reverse ? 7 : 0; reverse ? x >= 0 : x < board.length; reverse ? x-- : x++) {

        var row = board[x];

        for (var y = 0; y < row.length; y++) {

            const piece_key = board[x][y];

            if (piece_key === 12) {
                var a = lastMove !== "None" && ( (lastMove[0][0] === y && lastMove[0][1] === x) || (lastMove[1][0] === y && lastMove[1][1] === x) ) ? " lastMove" : "" ;
                squares.push(
                    <div style={{backgroundColor: `${sets_board_colors[skinBoard][color === "white" ? 0 : 1]}`}}  className={color + a} key={key} />
                );
            }
            else {
                var a = lastMove !== "None" && ( (lastMove[0][0] === y && lastMove[0][1] === x) || (lastMove[1][0] === y && lastMove[1][1] === x) ) ? " lastMove" : "" ;
                squares.push(
                    <div style={{backgroundColor: `${sets_board_colors[skinBoard][color === "white" ? 0 : 1]}`}} className={color + a} key={key}  >
                        <div style={{backgroundImage: `url(${sets_imgs[pieceToSkin(piece_key)][piece_key]})`}} className="chess-piece" />
                    </div>
                );
            }

            color = color === "white" ? "black" : "white";
            key++;

        }

        color = color === "white" ? "black" : "white";

    }


    return (
        <div className="back-chessboard" >
            <div
                className="background"
                style={{backgroundImage: `url(${sets_imgs[skinBoard][12]})`}}
            >
                <div
                    className="chessboard"
                    onMouseMove={e => movePiece(e)}
                    onMouseDown={e => grabPiece(e)}
                    onMouseUp={e => dropPiece(e)}
                    onTouchStart={e => touchHandler(e)}
                    onTouchMove={e => touchHandler(e)}
                    onTouchEnd={e => touchHandler(e)}
                    ref={chessBoardRef}
                >
                    {squares}
                </div>
            </div>
    
        </div>
    )
}


ChessBoard = React.memo(ChessBoard);
export default ChessBoard
