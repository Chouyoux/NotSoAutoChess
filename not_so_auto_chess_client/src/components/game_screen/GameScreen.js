import React, { useState, useEffect } from 'react'

import getCookie from '../../utils/get_cookie.js';

import './game_screen.css';

import ChessBoard from './ChessBoard';
import PlayerInfo from './PlayerInfo';

const GameScreen = ({ socket }) => {

    const [gameState, setGameState] = useState({})

    const updateGameState = function () {

        socket.emit("userGameGet", { auth_key: getCookie("auth_key") }, (response) => {

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
            else {
                if (response.message === "It's not this player's turn.") {
                    //
                }
            }
        });

    }

    useEffect(() => {
        updateGameState();

        socket.on("updateGame", function () { updateGameState(); });

        return () => {
            socket.removeEventListener("updateGame", function () { updateGameState(); });
        };

    }, []);

    return (
        <div className="gameScreen">
            { gameState === {} || gameState["board"] === undefined ? null :
                <div>
                <ChessBoard
                    lastMove={gameState["lastMove"]}
                    onMove={sendChessBoardMove}
                    board={gameState["board"]}
                    reverse={gameState["player2"] && gameState["player2"] === getCookie("auth_key")}
                    skin1={gameState["player1Set"]}
                    skin2={gameState["player2Set"]}
                    skinBoard={gameState["player1Set"] ? gameState["player2Set"] : gameState["player1Set"]}
                />
                <PlayerInfo
                    reverse={gameState["player2"] && gameState["player2"] === getCookie("auth_key")}
                    time={gameState["player1Time"]}
                    pseudonym={gameState["player1Pseudonym"]}
                    avatar={gameState["player1Avatar"]}
                />
                <PlayerInfo
                    reverse={gameState["player1"] && gameState["player1"] === getCookie("auth_key")}
                    time={gameState["player2Time"]}
                    pseudonym={gameState["player2Pseudonym"]}
                    avatar={gameState["player2Avatar"]}
                />
                </div>
            }
        </div>
    )
}

export default GameScreen
