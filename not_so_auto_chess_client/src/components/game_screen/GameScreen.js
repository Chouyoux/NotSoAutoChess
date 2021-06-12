import React, { useState, useEffect } from 'react'

import getCookie from '../../utils/get_cookie.js';

import ChessBoard from './ChessBoard'

const GameScreen = ({ socket }) => {

    const [gameState, setGameState] = useState({})

    const updateGameState = function () {

        socket.emit("userGameGet", { auth_key: getCookie("auth_key") }, (response) => {
            console.log(response);



            if (response.success) {
                
                setGameState({ ...response["game"] });

            }
        });

    }

    const sendChessBoardMove = function (fromPos, toPos) {

        let _data = {
            auth_key: getCookie("auth_key"),
            move: [[fromPos.x, fromPos.y], [toPos.x, toPos.y]]
        }

        socket.emit("userGameMove", _data, (response) => {
            console.log(response);
            if (response.success) {
                //
            }
        });

    }

    useEffect(() => {
        updateGameState();

        socket.on("updateGame", function () { updateGameState() });

        return () => {
            socket.removeEventListener("updateGame", function () { updateGameState() });
        };

    }, []);

    return (
        gameState === {} || gameState["board"] === undefined ? null : <ChessBoard onMove={sendChessBoardMove} board={gameState["board"]} reverse={gameState["player2"] && gameState["player2"] === getCookie("auth_key")} />
    )
}

export default GameScreen
