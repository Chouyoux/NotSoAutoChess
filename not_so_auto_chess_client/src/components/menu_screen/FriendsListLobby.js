import React, { useEffect, useState } from 'react';

import FriendsListLobbyAvatar from './FriendsListLobbyAvatar';

import getCookie from '../../utils/get_cookie.js';

const FriendsListLobby = ( { socket } ) => {

    const [lobbyPlayers, setLobbyPlayers] = useState([]);
    const [inviterPseudonym, setInviterPseudonym] = useState("");
    const [hoverPseudonym, setHoverPseudonym] = useState("");
    const [feedBackMsg, setFeedBackMsg] = useState("");
    const [feedBackMsgTimeOut, setFeedBackMsgTimeOut] = useState(null);

    const onAccept = function () {

        let _data = {
            auth_key : getCookie("auth_key"),
            inviter_pseudonym: inviterPseudonym
        }

        socket.emit("userLobbyAccept", _data, (response) => {
            console.log(response);
            if (response.success){
                //
            }
            setFeedBackMsgTimer(response.message);
        });

        setInviterPseudonym("");

    }

    const onRefuse = function () {

        let _data = {
            auth_key : getCookie("auth_key"),
            inviter_pseudonym: inviterPseudonym
        }

        socket.emit("userLobbyRefuse", _data, (response) => {
            console.log(response);
            if (response.success){
                //
            }
            setFeedBackMsgTimer(response.message);
        });

        setInviterPseudonym("");

    }

    const onRemove = function (pseudonym) {

        let _data = {
            auth_key : getCookie("auth_key"),
            removed_pseudonym: pseudonym
        }

        socket.emit("userLobbyRemove", _data, (response) => {
            console.log(response);
            if (response.success){
                setHoverPseudonym("");
            }
            setFeedBackMsgTimer(response.message);
        });

    }

    const updateContent = function () {

        socket.emit("userLobbyGet", { auth_key: getCookie("auth_key") }, (response) => {
            console.log(response);
            if (response.success){
                setLobbyPlayers(response.lobby);
            }
        });

    }

    const setFeedBackMsgTimer = function(msg){
        setFeedBackMsg(msg);
        if (feedBackMsgTimeOut){
            clearTimeout(feedBackMsgTimeOut);
            setFeedBackMsgTimeOut(null);
        }
        setFeedBackMsgTimeOut(setTimeout(function(){ setFeedBackMsg(""); }, 5000))
    }

    const inviteCallback = function(data) {
        setInviterPseudonym(data);
    }

    useEffect(() => {
        updateContent();

        socket.on("updateLobby", function() {updateContent()});
        socket.on("lobbyInvite", function(data) {inviteCallback(data)});

        return () => {
            socket.removeEventListener("updateLobby", function() {updateContent()});
            socket.removeEventListener("lobbyInvite", function(data) {inviteCallback(data)});
        };

    }, []);

    const lobby_players_elements = [];
    var i = 0;
    for (const [index, value] of lobbyPlayers.entries()) {
        lobby_players_elements.push(
            <FriendsListLobbyAvatar avatar={value.avatar} pseudonym={value.pseudonym} onRemove={onRemove} onHover={setHoverPseudonym} />
        );
        i++;
    }
    while (i < 8){
        lobby_players_elements.push(
            <FriendsListLobbyAvatar avatar={-1} />
        );
        i++;
    }

    const lobbyInvite = inviterPseudonym == "" ? null : (
        <div>
        <label>{inviterPseudonym} is inviting you :</label>
        <button
            className="buttonAcceptRefuseLobby"
            onClick={() => onAccept()}
        >
            Accept
        </button>
        <button
            className="buttonAcceptRefuseLobby"
            onClick={() => onRefuse()}
        >
            Refuse
        </button>
        </div>
    );

    return (
        <div className="friendsListLobby" >
            <h1 className="">LOBBY</h1>
            {feedBackMsg != "" ? feedBackMsg : null} <br />
            {hoverPseudonym != "" ? hoverPseudonym : <br />}
            <div className="friendsListLobbyAvatars">
                {lobby_players_elements}
            </div>
            {lobbyInvite}
        </div>
    )
}

export default FriendsListLobby
