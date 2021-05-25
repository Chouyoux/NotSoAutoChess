import React, { useState } from 'react'

import remove_friend from '../../images/friend_list/remove_friend.png';
import remove_friend_hover from '../../images/friend_list/remove_friend_hover.png';

import add_friend_to_group from '../../images/friend_list/add_friend_to_group.png';
import add_friend_to_group_hover from '../../images/friend_list/add_friend_to_group_hover.png';

const Friend = ( {name} ) => {

    const [removeFriendIcon, setRemoveFriendIcon] = useState(remove_friend);
    const [addFriendToGroupIcon, setAddFriendToGroupIcon] = useState(add_friend_to_group);

    return (
        <div className="contact">
        <p>{name}</p>
        <img
            className="FLFirstIcon selectDisable"
            onDragStart={(event) => {event.preventDefault();}}
            unselectable="on"
            alt="add_group"
            src={addFriendToGroupIcon}
            onClick={() => {setAddFriendToGroupIcon(add_friend_to_group);}}
            onMouseOver={() => {setAddFriendToGroupIcon(add_friend_to_group_hover)}}
            onMouseOut={() => {setAddFriendToGroupIcon(add_friend_to_group)}}
        />
        <img
            className="FLSecondIcon selectDisable"
            onDragStart={(event) => {event.preventDefault();}}
            unselectable="on"
            alt="remove"
            src={removeFriendIcon}
            onClick={() => {setRemoveFriendIcon(remove_friend);}}
            onMouseOver={() => {setRemoveFriendIcon(remove_friend_hover)}}
            onMouseOut={() => {setRemoveFriendIcon(remove_friend)}}
        />
    </div>
    )
}

export default Friend
