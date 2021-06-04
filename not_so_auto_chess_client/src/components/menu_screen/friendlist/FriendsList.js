import {React, useState, useEffect} from 'react';
import "./friends_list.css";

import FriendsListLobby from './FriendsListLobby';
import FriendsListFolder from './FriendsListFolder';
import Friend from './Friend';
import ReceivedInvite from './ReceivedInvite'
import PendingInvite from './PendingInvite'

import getCookie from '../../../utils/get_cookie.js';

const FriendsList = ( { socket } ) => {

    const [friends, setFriends] = useState([]);
    const [invitationsPending, setInvitationsPending] = useState([]);
    const [invitationsReceived, setInvitationsReceived] = useState([]);

    const [addPseudonym, setAddPseudonym] = useState("");
    const [addFormState, setAddFormState] = useState("");

    const onSubmit = function (event) {

        // prevent redirect
        event.preventDefault();

        if (addPseudonym === "") return;

        let _data = {
            auth_key : getCookie("auth_key"),
            pseudonym: addPseudonym
        }

        socket.emit("userFriendsAdd", _data, (response) => {
            console.log(response);
            if (response.success){
                updateContent();
            }
            setAddPseudonym("");
            setAddFormState(response.message);
        });

    }

    const onValidate = function (name) {

        if (!name || name === "") return;

        let _data = {
            auth_key : getCookie("auth_key"),
            pseudonym: name
        }

        socket.emit("userFriendsAdd", _data, (response) => {
            console.log(response);
            if (response.success){
                updateContent();
            }
        });

    }

    const onDecline = function (name) {

        if (!name || name === "") return;

        let _data = {
            auth_key : getCookie("auth_key"),
            pseudonym: name
        }

        socket.emit("userFriendsRemove", _data, (response) => {
            console.log(response);
            if (response.success){
                updateContent();
            }
        });

    }

    const onInvite = function (name) {

        if (!name || name === "") return;

        let _data = {
            auth_key : getCookie("auth_key"),
            invited_pseudonym: name
        }

        socket.emit("userLobbyInvite", _data, (response) => {
            console.log(response);
            if (response.success){
                //
            }
        });
    }

    const updateContent = function () {

        socket.emit("userFriendsGet", { auth_key: getCookie("auth_key") }, (response) => {
            console.log(response);
            if (response.success){
                setFriends(response.friends);
            }
        });

        socket.emit("userInvitationsPendingGet", { auth_key: getCookie("auth_key") }, (response) => {
            console.log(response);
            if (response.success){
                setInvitationsPending(response.invitations);
            }
        });

        socket.emit("userInvitationsReceivedGet", { auth_key: getCookie("auth_key") }, (response) => {
            console.log(response);
            if (response.success){
                setInvitationsReceived(response.invitations);
            }
        });

    }

    useEffect(() => {
        updateContent();

        socket.on("updateFriendsList", function() {updateContent()});

        return () => {
            socket.removeEventListener("updateFriendsList", function() {updateContent()});
        };

    }, []);

    const friends_elements = [];
    const offline_friends = [];
    for (const [index, value] of friends.entries()) {
        if (!value.online) {
            offline_friends.push(value);
        }
        else {
            friends_elements.push(
                <Friend online={value.online} name={value.pseudonym} key={index} onRemove={onDecline} onInvite={onInvite} />
            );
        }
    }
    for (const [index, value] of offline_friends.entries()) {
        friends_elements.push(
            <Friend online={value.online} name={value.pseudonym} key={index} onRemove={onDecline} />
        );
    }

    const invitations_received_elements = [];
    for (const [index, value] of invitationsReceived.entries()) {
        invitations_received_elements.push(
            <ReceivedInvite name={value} key={index+friends.length} onValidate={onValidate} onDecline={onDecline} />
        );
    }

    const invitations_pending_elements = [];
    for (const [index, value] of invitationsPending.entries()) {
        invitations_pending_elements.push(
            <PendingInvite name={value} key={index+friends.length+invitations_received_elements.length} onDecline={onDecline} />
        );
    }


    return (
        <div className="friendsListDiv">
            <div className="friendsList">

                <FriendsListLobby socket={socket} /> <br /><br />

                <form className="friendsListAddForm" onSubmit={onSubmit}>
                    <input
                        className="friendsListAddInput"
                        type="text"
                        id="pseudonym"
                        name="pseudonym"
                        placeholder="Type in a friend to add"
                        onChange={(event) => setAddPseudonym(event.target.value)}
                        value={addPseudonym}
                    />
                    <p className="friendsListAddState">{addFormState !== "" ? addFormState : null}</p>
                </form>

                

                <FriendsListFolder title="Friends" elements={friends_elements} defaultOpen={true} />
                
                <FriendsListFolder title="Received Invites" elements={invitations_received_elements} defaultOpen={true} />
                
                <FriendsListFolder title="Pending Invites" elements={invitations_pending_elements} defaultOpen={false} />
            </div>
        </div>
    )
}

export default FriendsList
