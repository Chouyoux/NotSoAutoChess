import React, { useEffect, useState } from 'react'

import getCookie from '../../utils/get_cookie.js';

// Can't use FS in react ? manual filling for now
import avatarempty from '../../images/profile_screen/avatars/avatar_empty.png';
import avatar0 from '../../images/profile_screen/avatars/avatar0.png';
import avatar1 from '../../images/profile_screen/avatars/avatar1.png';
import avatar2 from '../../images/profile_screen/avatars/avatar2.png';
import avatar3 from '../../images/profile_screen/avatars/avatar3.png';
import avatar4 from '../../images/profile_screen/avatars/avatar4.png';
import avatar5 from '../../images/profile_screen/avatars/avatar5.png';

const avatars = [];
avatars.push(avatar0);
avatars.push(avatar1);
avatars.push(avatar2);
avatars.push(avatar3);
avatars.push(avatar4);
avatars.push(avatar5);

const FriendsListLobby = ( { socket } ) => {

    const [lobbyPlayers, setLobbyPlayers] = useState([]);
    const [inviterPseudonym, setInviterPseudonym] = useState("");

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
        });

    }

    const onRefuse = function () {

        let _data = {
            auth_key : getCookie("auth_key"),
            inviter_pseudonym: inviterPseudonym
        }

        socket.emit("userLobbyRefuse", _data, (response) => {
            console.log(response);
            if (response.success){
                setInviterPseudonym("");
            }
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

    const inviteCallback = function(data) {
        setInviterPseudonym(data.pseudonym);
    }

    useEffect(() => {
        updateContent();

        socket.on("updateLobby", function() {updateContent()});
        socket.on("lobbyInvite", function() {inviteCallback()});

        return () => {
            socket.removeEventListener("updateLobby", function() {updateContent()});
            socket.removeEventListener("lobbyInvite", function() {inviteCallback()});
        };

    }, []);

    const lobby_players_elements = [];
    var i = 0;
    for (const [index, value] of lobbyPlayers.entries()) {
        lobby_players_elements.push(
            <img
                className="friendsListLobbyAvatar selectDisable"
                onDragStart={(event) => {event.preventDefault();}}
                unselectable="on"
                src={avatars[value.avatar]}
            />
        );
        i++;
    }
    while (i < 8){
        lobby_players_elements.push(
            <img
                className="friendsListLobbyAvatar selectDisable"
                onDragStart={(event) => {event.preventDefault();}}
                unselectable="on"
                src={avatarempty}
            />
        );
        i++;
    }

    const lobbyInvite = null;

    if (inviterPseudonym != ""){
        lobbyInvite = (
            <div>
            <label>{inviterPseudonym} is inviting you :</label>
            <button onClick={() => onAccept()}>
                ACCEPT
            </button>
            <button onClick={() => onRefuse()}>
                REFUSE
            </button>
            </div>
        );
    }

    return (
        <div className="friendsListLobby" >
            <h1 className="">LOBBY</h1>

            <div className="friendsListLobbyAvatars">
                {lobby_players_elements}
            </div>

        </div>
    )
}

export default FriendsListLobby
