import React, { useState, useEffect } from 'react'

import getCookie from '../../utils/get_cookie.js';

import ChessBoard from './ChessBoard'

const GameScreen = ({ socket }) => {

    const [gameState, setGameState] = useState({});

    const updateGameState = function () {

        socket.emit("userGameGet", { auth_key: getCookie("auth_key") }, (response) => {
            console.log(response);
            if (response.success){
                setGameState({...response["game"]});
            }
        });

    }

    useEffect(() => {
        updateGameState();

        socket.on("updateGame", function() {updateGameState()});

        return () => {
            socket.removeEventListener("updateGame", function() {updateGameState()});
        };

    }, []);

    return (
        gameState === {} || gameState["board"] === undefined ? null : <ChessBoard board={gameState["board"]} />
    )
}

export default GameScreen
