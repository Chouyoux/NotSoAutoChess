import React from 'react'

import avatarempty from '../../images/profile_screen/avatars/avatar_empty.png';

const FriendsListLobby = ({ friends }) => {
    return (
        <div className="friendsListLobby" >
            <h1 className="">LOBBY</h1>

            <div className="friendsListLobbyAvatars">
                <img
                    className="friendsListLobbyAvatar selectDisable"
                    onDragStart={(event) => {event.preventDefault();}}
                    unselectable="on"
                    src={avatarempty}
                />
                <img
                    className="friendsListLobbyAvatar selectDisable"
                    onDragStart={(event) => {event.preventDefault();}}
                    unselectable="on"
                    src={avatarempty}
                />
                <img
                    className="friendsListLobbyAvatar selectDisable"
                    onDragStart={(event) => {event.preventDefault();}}
                    unselectable="on"
                    src={avatarempty}
                />
                <img
                    className="friendsListLobbyAvatar selectDisable"
                    onDragStart={(event) => {event.preventDefault();}}
                    unselectable="on"
                    src={avatarempty}
                />
                <img
                    className="friendsListLobbyAvatar selectDisable"
                    onDragStart={(event) => {event.preventDefault();}}
                    unselectable="on"
                    src={avatarempty}
                />
                <img
                    className="friendsListLobbyAvatar selectDisable"
                    onDragStart={(event) => {event.preventDefault();}}
                    unselectable="on"
                    src={avatarempty}
                />
                <img
                    className="friendsListLobbyAvatar selectDisable"
                    onDragStart={(event) => {event.preventDefault();}}
                    unselectable="on"
                    src={avatarempty}
                />
                <img
                    className="friendsListLobbyAvatar selectDisable"
                    onDragStart={(event) => {event.preventDefault();}}
                    unselectable="on"
                    src={avatarempty}
                />
            </div>

        </div>
    )
}

export default FriendsListLobby
