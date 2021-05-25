import {React, useState, useEffect} from 'react';
import "./friends_list.css";

import Friend from './Friend';
import ReceivedInvite from './ReceivedInvite'

import getCookie from '../../utils/get_cookie.js';

import fold from '../../images/friend_list/fold.png';

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

    const updateContent = function () {

        socket.emit("userFriendsGet", { auth_key: getCookie("auth_key") }, (response) => {
            console.log(response);
            if (response.success){
                setFriends([]);
                for (let i = 0; i < response.friends.length; i++ ){
                    let friend = response.friends[i];
                    if (!friends.includes(friend)){
                        setFriends(friends => [...friends, friend]);
                    }
                }
            }
        });

        socket.emit("userInvitationsPendingGet", { auth_key: getCookie("auth_key") }, (response) => {
            console.log(response);
            if (response.success){
                setInvitationsPending([]);
                for (let i = 0; i < response.invitations.length; i++ ){
                    let invitation = response.invitations[i];
                    if (!invitationsPending.includes(invitation)){
                        setInvitationsPending(invitationsPending => [...invitationsPending, invitation]);
                    }
                }
            }
        });

        socket.emit("userInvitationsReceivedGet", { auth_key: getCookie("auth_key") }, (response) => {
            console.log(response);
            if (response.success){
                setInvitationsReceived([]);
                for (let i = 0; i < response.invitations.length; i++ ){
                    let invitation = response.invitations[i];
                    if (!invitationsReceived.includes(invitation)){
                        setInvitationsReceived(invitationsReceived => [...invitationsReceived, invitation]);
                    }
                }
            }
        });

    }

    useEffect(() => {
        updateContent();

        socket.on("updateFriendsList", function() {updateContent()});

        /*return function cleanup() {
            socket.removeEventListener("updateFriendsList", updateContent());
        };*/

    }, []);

    const friends_elements = [];

    for (const [index, value] of friends.entries()) {
        friends_elements.push(
            <Friend name={value} key={index} />
        );
    }
    const invitations_received_elements = [];

    for (const [index, value] of invitationsReceived.entries()) {
        invitations_received_elements.push(
            <ReceivedInvite name={value} key={index} />
        );
    }

    const invitations_pending_elements = [];

    for (const [index, value] of invitationsPending.entries()) {
        invitations_pending_elements.push(
            <div><div className="contact" key={index}>
                <p>{value}</p>
            </div>  <br /></div>
        );
    }


    return (
        <div className="friendsListDiv">
            <div className="friendsList">

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
                    <p>{addFormState}</p>
                </form>

                <img className="FLFold" alt="Fold" src={fold} />
                <h2>Friends</h2> <br />
                {friends_elements}

                <br /> <br /> <img className="FLFold" alt="Fold" src={fold} />
                <h2>Received Invites</h2> <br />
                {invitations_received_elements}

                <br /> <br /> <img className="FLFold" alt="Fold" src={fold} />
                <h2>Pending Invites</h2> <br />
                {invitations_pending_elements}
            </div>
        </div>
    )
}

export default FriendsList
