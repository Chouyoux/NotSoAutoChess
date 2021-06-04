import React, { useState } from 'react'

import decline from '../../images/friend_list/decline.png';
import decline_hover from '../../images/friend_list/decline_hover.png';
import decline_click from '../../images/friend_list/decline_click.png';

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

const FriendsListLobbyAvatar = ( { avatar, pseudonym, onRemove, onHover } ) => {

    const [declineIcon, setDeclineIcon] = useState(decline);

    return (
        avatar > -1 ?
        <div className="friendsListLobbyAvatarParent">
            <img
                className="friendsListLobbyAvatar selectDisable"
                onDragStart={(event) => {event.preventDefault();}}
                unselectable="on"
                src={avatars[avatar]}
                onMouseOver={() => {onHover(pseudonym);}}
                onMouseOut={() => {onHover("");}}
            />

            <img
                className="friendsListLobbyAvatarCross selectDisable"
                onDragStart={(event) => {event.preventDefault();}}
                unselectable="on"
                src={declineIcon}
                onMouseOver={() => {setDeclineIcon(decline_hover); onHover("Remove " + pseudonym + " ?");}}
                onMouseOut={() => {setDeclineIcon(decline); onHover("");}}
                onMouseDown={() => {setDeclineIcon(decline_click);}}
                onMouseUp={() => {setDeclineIcon(decline_hover);}}
                onClick={() => {onRemove(pseudonym);}}
            />
        </div>
        :
        <img
            className="friendsListLobbyAvatar selectDisable"
            onDragStart={(event) => {event.preventDefault();}}
            unselectable="on"
            src={avatarempty}
        />
    )
}

export default FriendsListLobbyAvatar
